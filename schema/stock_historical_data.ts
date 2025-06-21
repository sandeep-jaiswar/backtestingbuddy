import { z } from "zod"

export const StockHistoricalDataSchema = z.object({
  symbol: z.string(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/, "Invalid ClickHouse DateTime format"),
  open: z.coerce.number(),
  high: z.coerce.number(),
  low: z.coerce.number(),
  close: z.coerce.number(),
  adj_close: z.coerce.number(),
  volume: z.number().int(),
  fetch_time: z.string().regex(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/, "Invalid ClickHouse DateTime format"),
})

export type StockHistoricalData = z.infer<typeof StockHistoricalDataSchema>
export const StockHistoricalDataSchemaWithId = StockHistoricalDataSchema.extend({
  fetch_time: z.coerce.date().default(() => new Date()),
})
export const StockHistoricalDataArraySchema = z.array(StockHistoricalDataSchema)
export type StockHistoricalDataArray = z.infer<typeof StockHistoricalDataArraySchema>
