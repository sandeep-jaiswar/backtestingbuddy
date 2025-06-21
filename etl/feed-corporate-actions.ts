import { formatDateTime } from "@/lib/date"
import { clickhouse } from "@/lib/db"
import { getSymbolId } from "@/lib/symbols" // ✅ Lookup utility
import { yahoo } from "@/lib/yahoo"
import { CorporateAction, CorporateActionSchema } from "@/schema/corporate_actions"

export async function feedCorporateActions(symbol: string): Promise<void> {
  try {
    const symbol_id = await getSymbolId(symbol)

    if (!symbol_id) {
      console.warn(`⚠️ Skipping corporate actions for ${symbol} — symbol_id not found`)
      return
    }

    const result = await yahoo.quoteSummary(symbol, {
      modules: ["calendarEvents"],
    })

    const dividendTimestamp = result?.calendarEvents?.dividendDate

    if (typeof dividendTimestamp !== "number") {
      console.warn(`⚠️ No dividend date found for ${symbol}`)
      return
    }

    const exDate = new Date(dividendTimestamp * 1000)
    const now = new Date().toISOString()

    const row: CorporateAction = CorporateActionSchema.parse({
      symbol_id,
      action_type: "dividend",
      ex_date: formatDateTime(exDate),
      record_date: formatDateTime(exDate),
      ratio: "",
      amount: 0,
      announced_at: now,
    })

    await clickhouse.insert({
      table: "corporate_actions",
      values: [row],
      format: "JSONEachRow",
    })

    console.log(`✅ Corporate action inserted: ${symbol}`)
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`❌ Error inserting corporate action for ${symbol}: ${error.message}`)
    } else {
      console.error(`❌ Unknown error inserting corporate action for ${symbol}:`, error)
    }
  }
}
