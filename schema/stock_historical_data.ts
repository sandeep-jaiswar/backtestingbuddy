import { z } from "zod"

export const StockHistoricalDataSchema = z.object({
  symbol: z.string(),
  date: z.string(),
  open: z.coerce.number(),
  high: z.coerce.number(),
  low: z.coerce.number(),
  close: z.coerce.number(),
  volume: z.number().int(),
})

export type StockHistoricalData = z.infer<typeof StockHistoricalDataSchema>
export const StockHistoricalDataInsertSchema = StockHistoricalDataSchema.omit({
  date: true, // date will be set later
})
