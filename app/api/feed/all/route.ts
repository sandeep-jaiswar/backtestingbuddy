// app/api/feed/all/route.ts
import { NextResponse } from "next/server"
import { feedCorporateActions } from "@/etl/feed-corporate-actions"
import { feedOHLCV } from "@/etl/feed-ohlcv"
import { feedStockHistoricalData } from "@/etl/feed-stock-historical-data"
import { feedStockQuote } from "@/etl/feed-stock-quotes"

// Add all symbols you want to run ETL for
const symbols = ["BAJFINANCE.BO"]

export async function GET() {
  const results: { symbol: string; status: string; error?: string }[] = []

  for (const symbol of symbols) {
    try {
      await Promise.all([
        feedStockQuote(symbol),
        feedStockHistoricalData(symbol),
        feedOHLCV(symbol),
        feedCorporateActions(symbol),
      ])
      results.push({ symbol, status: "✅ success" })
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : JSON.stringify(err)
      results.push({ symbol, status: "❌ failed", error: errorMessage })
    }
  }

  return NextResponse.json({ message: "ETL completed", results })
}
