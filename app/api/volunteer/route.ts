import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { name, phone, village, interest } = await req.json();
  if (!name || !phone) {
    return NextResponse.json({ error: "Name and phone are required" }, { status: 400 });
  }
  await prisma.volunteer.create({ data: { name, phone, village, interest } });
  return NextResponse.json({ success: true });
}