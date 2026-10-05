import { NextResponse } from "next/server";
import { listUsers } from "@/lib/items-store";

export async function GET() {
  const users = listUsers();
  return NextResponse.json({ success: true, count: users.length, data: users });
}
