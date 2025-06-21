import { z } from "zod"

export const CorporateActionSchema = z.object({
  symbol_id: z.string().uuid(),

  action_type: z.enum(["split", "bonus", "dividend"]), // Enum8

  ex_date: z.coerce.date(), // ClickHouse Date (YYYY-MM-DD)
  record_date: z.coerce.date(),

  ratio: z.string(), // e.g. "2:1" or "5:2"
  amount: z.number(), // For dividends

  announced_at: z.coerce.date(), // DateTime
})

export type CorporateAction = z.infer<typeof CorporateActionSchema>
export const CorporateActionInsertSchema = CorporateActionSchema.omit({
  symbol_id: true, // symbol_id will be set later
  announced_at: true, // announced_at will be set later
})
