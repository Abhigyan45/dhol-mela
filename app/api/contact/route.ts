import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { name, email, message } = await req.json();

  if (!name || !message) {
    return NextResponse.json({ error: "Name and message are required" }, { status: 400 });
  }

  await prisma.contactMessage.create({ data: { name, email, message } });
  return NextResponse.json({ success: true });
}