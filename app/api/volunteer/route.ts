import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { name, phone, village, interest, honeypot, elapsedMs } = await req.json();

  if (honeypot) {
    return NextResponse.json({ success: true });
  }
  if (typeof elapsedMs === "number" && elapsedMs < 2000) {
    return NextResponse.json({ success: true });
  }

  if (!name || !phone) {
    return NextResponse.json({ error: "Name and phone are required" }, { status: 400 });
  }
  await prisma.volunteer.create({ data: { name, phone, village, interest } });
  return NextResponse.json({ success: true });
}