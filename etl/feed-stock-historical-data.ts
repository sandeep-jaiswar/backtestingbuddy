import { formatDateTime } from "@/lib/date"
import { clickhouse } from "@/lib/db"
import { toUnix } from "@/lib/unix"
import { yahoo } from "@/lib/yahoo"
import { StockHistoricalData, StockHistoricalDataSchema } from "@/schema/stock_historical_data"

export async function feedStockHistoricalData(symbol: string): Promise<void> {
  try {
    const now = new Date()
    const oneYearAgo = new Date(now)
    oneYearAgo.setFullYear(now.getFullYear() - 1)

    const result = await yahoo.historical(symbol, {
      period1: oneYearAgo,
      period2: now,
      interval: "1d",
      events: "history",
    })

    if (!Array.isArray(result) || result.length === 0) {
      console.warn(`⚠️ No historical data found for ${symbol}`)
      return
    }

    const rows: StockHistoricalData[] = result.map((entry) =>
      StockHistoricalDataSchema.parse({
        symbol,
        date: formatDateTime(new Date(entry.date ?? now)), // 👈 fix here
        open: Number(entry.open ?? 0),
        high: Number(entry.high ?? 0),
        low: Number(entry.low ?? 0),
        close: Number(entry.close ?? 0),
        adj_close: Number(entry.adjClose ?? entry.close ?? 0),
        volume: Number(entry.volume ?? 0),
        fetch_time: formatDateTime(now), // 👈 fix here too
      })
    )

    console.log(`Inserting historical data for ${symbol}:`, rows)

    await clickhouse.insert({
      table: "stock_historical_data",
      values: rows,
      format: "JSONEachRow",
    })

    console.log(`✅ Historical data inserted for ${symbol} (${rows.length} rows)`)
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`❌ Error inserting historical data for ${symbol}: ${error.message}`)
    } else {
      console.error(`❌ Unknown error for ${symbol}:`, error)
    }
  }
}
