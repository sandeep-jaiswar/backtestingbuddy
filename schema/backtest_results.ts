import { z } from "zod"

export const BacktestResultSchema = z.object({
  backtest_id: z.string().uuid(),
  strategy_name: z.string(),
  symbol_id: z.string().uuid(),
  timeframe: z.string(),

  start_date: z.string(), // ClickHouse Date
  end_date: z.string(),

  total_return: z.number(),
  annual_return: z.number(),
  sharpe_ratio: z.number(),
  max_drawdown: z.number(),

  total_trades: z.number().int().nonnegative(),
  executed_at: z.string(),
})

export type BacktestResult = z.infer<typeof BacktestResultSchema>
export const BacktestResultInsertSchema = BacktestResultSchema.omit({
  backtest_id: true, // backtest_id will be set later
  executed_at: true, // executed_at will be set later
})
