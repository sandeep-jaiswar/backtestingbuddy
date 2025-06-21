import { z } from "zod"

export const MarketCalendarSchema = z.object({
  exchange: z.string(), // e.g., "NSE", "BSE", "NYSE"
  date: z.coerce.date(), // Date of market status
  is_trading_day: z.boolean(), // UInt8 → treated as boolean
  holiday_name: z.string(), // May be empty for trading days
  updated_at: z.coerce.date(), // DateTime of last update
})

export type MarketCalendar = z.infer<typeof MarketCalendarSchema>
export const MarketCalendarInsertSchema = MarketCalendarSchema.omit({
  exchange: true, // exchange will be set later
  updated_at: true, // updated_at will be set later
})
