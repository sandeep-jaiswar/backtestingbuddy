import { z } from "zod"

export const OHLCVSchema = z.object({
  symbol_id: z.string().uuid(),

  ts: z.coerce.date().nullable().optional(),
  timeframe: z.string(), // e.g., "1m", "1h", "1d"

  open: z.number(),
  high: z.number(),
  low: z.number(),
  close: z.number(),
  volume: z.number(),

  sma_50: z.number(),
  sma_200: z.number(),
  ema_20: z.number(),

  rsi_14: z.number(),
  macd_line: z.number(),
  macd_signal: z.number(),

  bb_upper: z.number(),
  bb_lower: z.number(),

  atr_14: z.number(),
  supertrend: z.number(),
  adx_14: z.number(),

  williams_r: z.number(),
  obv: z.number(),

  stochastic_k: z.number(),
  stochastic_d: z.number(),

  ingestion_time: z.coerce.date().nullable().optional(),
})

export type OHLCV = z.infer<typeof OHLCVSchema>
export const OHLCVArraySchema = z.array(OHLCVSchema)
export type OHLCVArray = z.infer<typeof OHLCVArraySchema>
