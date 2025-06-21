import { z } from "zod"

export const SymbolStatsDailySchema = z.object({
  symbol_id: z.string().uuid(),
  date: z.coerce.date(), // ClickHouse `Date` (YYYY-MM-DD)
  timeframe: z.string(), // e.g., "1d", "1w", etc.
  avg_volume: z.number(),
  volatility_14d: z.number(),
  avg_true_range: z.number(),
  trend_strength: z.number(),
  generated_at: z.coerce.date(), // ClickHouse `DateTime`
})

export type SymbolStatsDaily = z.infer<typeof SymbolStatsDailySchema>
export const SymbolStatsDailyInsertSchema = SymbolStatsDailySchema.omit({
  symbol_id: true, // symbol_id will be set later
  generated_at: true, // generated_at will be set later
})
