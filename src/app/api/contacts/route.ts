import { NextRequest, NextResponse } from "next/server"
import { useApi } from "@/lib/Api"

export async function GET() {
  return NextResponse.json(await useApi("contact").getList())
}
export async function POST(req: NextRequest) {
  const { contact } = await req.json()
  return NextResponse.json(await useApi("contact").create(contact))
}
export async function PATCH(req: NextRequest) {
  const { id, info } = await req.json()
  return NextResponse.json(await useApi("contact").update({ id, ...info }))
}
export async function DELETE(req: NextRequest) {
  return NextResponse.json(await useApi("contact").delete({ id: req.nextUrl.searchParams.get("id")! }))
}
