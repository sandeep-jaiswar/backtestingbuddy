import { z } from "zod"

export const StockQuoteSchema = z.object({
  symbol: z.string(),
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

  last_trade_time: z.coerce.date(),
  fetch_time: z.coerce.date(),
})

export type StockQuote = z.infer<typeof StockQuoteSchema>
