import { NextRequest } from "next/server"
import yahooFinance from "yahoo-finance2"

const POST = async (request: NextRequest) => {
  const { symbol } = (await request.json()) as { symbol: string }
  if (!symbol) {
    return Response.json({ error: "Symbol is required" }, { status: 400 })
  }
  const data = await yahooFinance.quote(symbol)
  return Response.json(data)
}

export { POST }
