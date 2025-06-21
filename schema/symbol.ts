import { create } from "domain"
import { z } from "zod"

export const SymbolSchema = z.object({
  symbol_id: z.string().uuid(),
  symbol_code: z.string(),
  exchange: z.string(),
  full_name: z.string(),
  sector: z.string(),
  industry: z.string(),
  isin: z.string(),
  lot_size: z.number().int().nonnegative(),
  tick_size: z.number(),
  currency: z.string(),
  active: z.boolean(),
  created_at: z.date(),
})

export type SymbolEntity = z.infer<typeof SymbolSchema>
export const SymbolSchemaWithId = SymbolSchema.extend({
  created_at: z.date().default(() => new Date()),
  symbol_id: z
    .string()
    .uuid()
    .default(() => crypto.randomUUID()),
})
export type SymbolEntityWithId = z.infer<typeof SymbolSchemaWithId>
