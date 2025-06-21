import { z } from "zod"
import { clickhouse } from "@/lib/db"
import { yahoo } from "@/lib/yahoo"
import { StockQuote, StockQuoteSchema } from "@/schema/stock_quotes"

export async function feedStockQuote(symbol: string): Promise<void> {
  try {
    const quote = await yahoo.quote(symbol)

    const row: StockQuote = StockQuoteSchema.parse({
      symbol: quote.symbol,
      name: quote.shortName ?? "",
      currency: quote.currency ?? "",
      stock_exchange: quote.fullExchangeName ?? "",
      quote_price: Number(quote.regularMarketPrice ?? 0),
      ask: Number(quote.ask ?? 0),
      bid: Number(quote.bid ?? 0),
      day_low: Number(quote.regularMarketDayLow ?? 0),
      day_high: Number(quote.regularMarketDayHigh ?? 0),
      year_low: Number(quote.fiftyTwoWeekLow ?? 0),
      year_high: Number(quote.fiftyTwoWeekHigh ?? 0),
      volume: Number(quote.regularMarketVolume ?? 0),
      market_cap: Number(quote.marketCap ?? 0),
    })

    await clickhouse.insert({
      table: "stock_quotes",
      values: [row],
      format: "JSONEachRow",
    })

    console.log(`✅ Inserted quote for ${symbol}`)
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      console.error(`❌ Zod validation error for ${symbol}:`, error.issues)
    } else if (error instanceof Error) {
      console.error(`❌ Failed to insert quote for ${symbol}:`, error.message)
    } else {
      console.error(`❌ Unknown error for ${symbol}:`, error)
    }
  }
}
