import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const updates = await prisma.liveUpdate.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(updates);
}

export async function POST(req: Request) {
  const { timeLabel, message } = await req.json();
  if (!timeLabel || !message) {
    return NextResponse.json({ error: "Time and message are required" }, { status: 400 });
  }
  const update = await prisma.liveUpdate.create({ data: { timeLabel, message } });
  return NextResponse.json(update);
}