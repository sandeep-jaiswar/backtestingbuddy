import { NextRequest } from "next/server"
import yahooFinance from "yahoo-finance2"

const GET = async (request: NextRequest) => {
  const query = (await request.nextUrl.searchParams.get("query")) ?? ""
  const data = await yahooFinance.search(query)
  return Response.json(data)
}

export { GET }
