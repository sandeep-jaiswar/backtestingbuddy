import { NextResponse } from "next/server";
import { feedCorporateActions } from "@/etl/feed-corporate-actions";
import { calculateAndFeedIndicators } from "@/etl/calculate-and-feed-indicators";

const SYMBOLS_TO_FEED = ["AAPL", "GOOGL", "MSFT", "AMZN", "TSLA", "BAJFINANCE.BO"];

export async function GET() {
  const overallResults: { symbol: string; status: string; details: string }[] = [];

  for (const symbol of SYMBOLS_TO_FEED) {
    const symbolResults: string[] = [];
    let symbolFailed = false;

    // 1. Feed Stock Quotes (via internal API call)
    try {
      const quotesResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/feed/quotes`);
      const quotesData = await quotesResponse.json();
      if (!quotesResponse.ok) {
        symbolFailed = true;
        symbolResults.push(`Quotes API failed: ${quotesData.message || JSON.stringify(quotesData.failed)}`);
      } else {
        symbolResults.push('Quotes API: Success');
      }
    } catch (error: any) {
      symbolFailed = true;
      symbolResults.push(`Quotes API fetch error: ${error.message}`);
    }

    // 2. Feed Historical Data (via internal API call)
    try {
      const historicalResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/feed/historical`);
      const historicalData = await historicalResponse.json();
      if (!historicalResponse.ok) {
        symbolFailed = true;
        symbolResults.push(`Historical API failed: ${historicalData.message || JSON.stringify(historicalData.failed)}`);
      } else {
        symbolResults.push('Historical API: Success');
      }
    } catch (error: any) {
      symbolFailed = true;
      symbolResults.push(`Historical API fetch error: ${error.message}`);
    }

    // 3. Feed Corporate Actions (direct ETL call)
    try {
      await feedCorporateActions(symbol);
      symbolResults.push('Corporate Actions ETL: Success');
    } catch (error: any) {
      symbolFailed = true;
      symbolResults.push(`Corporate Actions ETL failed: ${error.message}`);
    }

    // 4. Calculate and Feed Indicators (direct ETL call)
    try {
      await calculateAndFeedIndicators(symbol);
      symbolResults.push('Indicators ETL: Success');
    } catch (error: any) {
      symbolFailed = true;
      symbolResults.push(`Indicators ETL failed: ${error.message}`);
    }

    overallResults.push({
      symbol,
      status: symbolFailed ? "❌ FAILED" : "✅ SUCCESS",
      details: symbolResults.join('; '),
    });
  }

  const anyFailures = overallResults.some(res => res.status === "❌ FAILED");

  return NextResponse.json(
    { message: "Full data feed attempt completed", results: overallResults },
    { status: anyFailures ? 500 : 200 }
  );
}
