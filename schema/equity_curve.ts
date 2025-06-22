import { z } from "zod"

export const EquityCurveSchema = z.object({
  backtest_id: z.string().uuid(),
  ts: z.string(), // ClickHouse DateTime
  equity_value: z.number(), // Float64
})

export type EquityCurve = z.infer<typeof EquityCurveSchema>
