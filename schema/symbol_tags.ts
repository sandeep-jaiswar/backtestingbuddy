import { z } from "zod"

export const SymbolTagSchema = z.object({
  symbol_id: z.string().uuid(),
  tag: z.string(),
})

export type SymbolTag = z.infer<typeof SymbolTagSchema>
export const SymbolTagInsertSchema = SymbolTagSchema.omit({
  symbol_id: true, // symbol_id will be set later
})
