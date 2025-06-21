import { NextResponse } from "next/server"
import { v4 as uuidv4 } from "uuid"
import { clickhouse } from "@/lib/db"
import { yahoo } from "@/lib/yahoo"
import { SymbolEntity, SymbolSchema } from "@/schema/symbol"

const SYMBOLS_TO_FEED = ["BAJFINANCE.BO"]

export async function GET() {
  const inserted: string[] = []
  const failed: { symbol: string; error: string }[] = []

  for (const symbol of SYMBOLS_TO_FEED) {
    try {
      const quote = await yahoo.quote(symbol)
      const now = new Date()

      const parsed: SymbolEntity = SymbolSchema.parse({
        symbol_id: uuidv4(),
        symbol_code: quote.symbol,
        exchange: quote.fullExchangeName ?? "NSE",
        full_name: quote.shortName ?? quote.longName ?? "",
        sector: "",
        industry: "",
        isin: "", // Add if available
        lot_size: 1,
        tick_size: 0.05,
        currency: quote.currency ?? "INR",
        active: true,
        created_at: now,
      })

      // 🔁 Adapt parsed data for ClickHouse
      const row = {
        ...parsed,
        active: parsed.active ? 1 : 0, // ✅ UInt8
        created_at: parsed.created_at.toISOString().replace("T", " ").slice(0, 19), // ✅ "YYYY-MM-DD HH:mm:ss"
      }

      await clickhouse.insert({
        table: "symbols",
        values: [row],
        format: "JSONEachRow",
      })

      inserted.push(symbol)
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : typeof error === "object" && error !== null && "issues" in error
          ? JSON.stringify((error as unknown).issues, null, 2)
          : "Unknown error"

      failed.push({ symbol, error: message })
    }
  }

  return NextResponse.json({ inserted, failed })
}
