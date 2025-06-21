import yahooFinance from "yahoo-finance2"
import { clickhouse } from "@/lib/db"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const symbol = "BAJFINANCE.BO"
    const result = await yahooFinance.chart(symbol, { interval: "1d", range: "1mo" })

    const data = result.quotes.map((q: any) => ({
      symbol,
      date: new Date(q.date),
      open: q.open,
      high: q.high,
      low: q.low,
      close: q.close,
      volume: q.volume,
      adjusted_close: q.adjclose,
    }))

    await clickhouse.insert({
      table: "quotes",
      values: data,
      format: "JSONEachRow",
    })
  } catch (error) {
    console.error("Error fetching equity curve data:", error)
    return Response.json({ status: "error", message: "Failed to fetch equity curve data" }, { status: 500 })
  }
}
