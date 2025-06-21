import { clickhouse } from "@/lib/db"

export async function getSymbolId(symbolCode: string): Promise<string | null> {
  const result = await clickhouse
    .query({
      query: `SELECT symbol_id FROM symbols WHERE symbol_code = {symbolCode:String} LIMIT 1`,
      query_params: { symbolCode },
      format: "JSONEachRow",
    })
    .then((res) => res.json<{ symbol_id: string }[]>())

  return result[0]?.symbol_id ?? null
}
