import { z } from "zod"

export const StockHistoricalDataSchema = z.object({
  symbol: z.string(),
  date: z.coerce.date(),

  open: z.coerce.number(),
  high: z.coerce.number(),
  low: z.coerce.number(),
  close: z.coerce.number(),
  adj_close: z.coerce.number(),

  volume: z.number().int(),

  fetch_time: z.coerce.date(),
})

export type StockHistoricalData = z.infer<typeof StockHistoricalDataSchema>
export const StockHistoricalDataArraySchema = z.array(StockHistoricalDataSchema)
export type StockHistoricalDataArray = z.infer<typeof StockHistoricalDataArraySchema>
