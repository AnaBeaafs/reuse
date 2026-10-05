import { NextRequest, NextResponse } from "next/server";
import { createItem, listItems } from "@/lib/items-store";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") || undefined;
  const categoria = searchParams.get("categoria") || undefined;
  const type = searchParams.get("type") || undefined;
  const sort = searchParams.get("sort") || undefined;
  const status = searchParams.get("status") || undefined;

  const data = listItems({ q, categoria, type, sort, status });

  return NextResponse.json({
    success: true,
    count: data.length,
    data,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.title || !body.category || !body.location) {
      return NextResponse.json(
        { success: false, error: "Campos obrigatórios: title, category, location" },
        { status: 400 }
      );
    }

    const item = createItem({
      title: body.title,
      description: body.description,
      price: body.price === "" || body.price === undefined ? null : Number(body.price),
      category: body.category,
      location: body.location,
      imageUrl: body.imageUrl,
      type: body.type === "doacao" || Number(body.price) === 0 ? "doacao" : "troca",
      userId: body.userId,
      userName: body.userName,
    });

    return NextResponse.json({ success: true, data: item }, { status: 201 });
  } catch {
    return NextResponse.json({ success: false, error: "JSON inválido" }, { status: 400 });
  }
}
