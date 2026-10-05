import { NextRequest, NextResponse } from "next/server";
import { deleteItem, getItemById } from "@/lib/items-store";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const item = getItemById(id);
  if (!item) {
    return NextResponse.json({ success: false, error: "Item não encontrado" }, { status: 404 });
  }
  return NextResponse.json({ success: true, data: item });
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const ok = deleteItem(id);
  if (!ok) {
    return NextResponse.json({ success: false, error: "Item não encontrado" }, { status: 404 });
  }
  return NextResponse.json({ success: true, message: "Item excluído com sucesso" });
}
