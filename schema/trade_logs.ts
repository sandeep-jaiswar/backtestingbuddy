import { z } from "zod"

export const TradeLogSchema = z.object({
  trade_id: z.string().uuid(),
  backtest_id: z.string().uuid(),
  symbol_id: z.string().uuid(),
  entry_time: z.coerce.date(), // In case input is string
  exit_time: z.coerce.date(),
  entry_price: z.number(),
  exit_price: z.number(),
  quantity: z.number(),
  direction: z.enum(["buy", "sell"]), // Enum8
  profit_loss: z.number(),
})

export type TradeLog = z.infer<typeof TradeLogSchema>
export const TradeLogInsertSchema = TradeLogSchema.omit({
  trade_id: true, // trade_id is auto-generated
  backtest_id: true, // backtest_id will be set later
})
