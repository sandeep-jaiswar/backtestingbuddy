export async function GET() {
  return Response.json({ status: "ok" })
}

export async function POST() {
  return Response.json({ status: "ingestion started" })
}
