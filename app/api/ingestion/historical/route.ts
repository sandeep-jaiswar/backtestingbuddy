import { NextRequest } from "next/server"
import yahooFinance from "yahoo-finance2"

const POST = async (request: NextRequest) => {
  const { symbol } = (await request.json()) as { symbol: string }
  if (!symbol) {
    return Response.json({ error: "Symbol is required" }, { status: 400 })
  }
  const data = await yahooFinance.historical(symbol, {
    period1: "2020-01-01",
    period2: new Date().toISOString().split("T")[0],
    interval: "1d",
  })
  return Response.json(data)
}

export { POST }
