import { z } from "zod"

export const StockQuoteSchema = z.object({
  symbol: z.string(),
  timestamp: z.coerce.date(),
  name: z.string(),
  currency: z.string(),
  stock_exchange: z.string(),
  quote_price: z.coerce.number(),
  ask: z.coerce.number(),
  bid: z.coerce.number(),
  day_low: z.coerce.number(),
  day_high: z.coerce.number(),
  year_low: z.coerce.number(),
  year_high: z.coerce.number(),
  volume: z.number().int(),
  market_cap: z.number().int(),
})

export type StockQuote = z.infer<typeof StockQuoteSchema>
// No explicit schema with ID needed for ClickHouse insert, as timestamp and symbol form the order key
// You can use StockQuoteSchema directly for validation before inserting.
