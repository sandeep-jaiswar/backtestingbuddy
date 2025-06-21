import { NextResponse } from "next/server";
import { calculateAndFeedIndicators } from "@/etl/calculate-and-feed-indicators";
import { feedCorporateActions } from "@/etl/feed-corporate-actions";

const SYMBOLS_TO_FEED = ["AAPL", "GOOGL", "MSFT", "AMZN", "TSLA", "BAJFINANCE.BO"];

export async function GET() {
  const overallResults: { symbol: string; status: string; details: string }[] = [];

  for (const symbol of SYMBOLS_TO_FEED) {
    const symbolResults: string[] = [];
    let symbolFailed = false;

    // 1. Feed Stock Quotes (via internal API call)
    try {
      const quotesResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/feed/quotes`);
      // Type the data from the response
      const quotesData: { message: string; failed?: { symbol: string; error: string }[] } = await quotesResponse.json();
      if (!quotesResponse.ok) {
        symbolFailed = true;
        symbolResults.push(`Quotes API failed: ${quotesData.message || JSON.stringify(quotesData.failed)}`);
      } else {
        symbolResults.push('Quotes API: Success');
      }
    } catch (error: unknown) { // Use unknown instead of any
      symbolFailed = true;
      if (error instanceof Error) {
        symbolResults.push(`Quotes API fetch error: ${error.message}`);
      } else {
        symbolResults.push(`Quotes API fetch error: ${String(error)}`);
      }
    }

    // 2. Feed Historical Data (via internal API call)
    try {
      const historicalResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/feed/historical`);
      // Type the data from the response
      const historicalData: { message: string; failed?: { symbol: string; error: string }[] } = await historicalResponse.json();
      if (!historicalResponse.ok) {
        symbolFailed = true;
        symbolResults.push(`Historical API failed: ${historicalData.message || JSON.stringify(historicalData.failed)}`);
      } else {
        symbolResults.push('Historical API: Success');
      }
    } catch (error: unknown) { // Use unknown instead of any
      symbolFailed = true;
      if (error instanceof Error) {
        symbolResults.push(`Historical API fetch error: ${error.message}`);
      } else {
        symbolResults.push(`Historical API fetch error: ${String(error)}`);
      }
    }

    // 3. Feed Corporate Actions (direct ETL call)
    try {
      await feedCorporateActions(symbol);
      symbolResults.push('Corporate Actions ETL: Success');
    } catch (error: unknown) { // Use unknown instead of any
      symbolFailed = true;
      if (error instanceof Error) {
        symbolResults.push(`Corporate Actions ETL failed: ${error.message}`);
      } else {
        symbolResults.push(`Corporate Actions ETL failed: ${String(error)}`);
      }
    }

    // 4. Calculate and Feed Indicators (direct ETL call)
    try {
      await calculateAndFeedIndicators(symbol);
      symbolResults.push('Indicators ETL: Success');
    } catch (error: unknown) { // Use unknown instead of any
      symbolFailed = true;
      if (error instanceof Error) {
        symbolResults.push(`Indicators ETL failed: ${error.message}`);
      } else {
        symbolResults.push(`Indicators ETL failed: ${String(error)}`);
      }
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
