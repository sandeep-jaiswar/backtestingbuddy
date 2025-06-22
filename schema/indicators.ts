import { z } from "zod"

export const IndicatorSchema = z.object({
  symbol_id: z.string().uuid(),
  ts: z.string(), // DateTime: timestamp of the indicator
  timeframe: z.string(), // LowCardinality(String): e.g., "1m", "5m", "1d"
  name: z.string(), // e.g., "RSI", "MACD"
  value: z.number(), // Float64: numeric value of the indicator
  params: z.string(), // e.g., "14" or "12,26,9"
  computed_time: z.string(), // DateTime: when it was calculated
})

export type Indicator = z.infer<typeof IndicatorSchema>
export const IndicatorInsertSchema = IndicatorSchema.omit({
  symbol_id: true, // symbol_id will be set later
  computed_time: true, // computed_time will be set later
  ts: true, // ts will be set later
})
