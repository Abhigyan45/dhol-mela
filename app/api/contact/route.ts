import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { name, email, message, honeypot, elapsedMs } = await req.json();

  // Bot check 1: honeypot field was filled (real users never see or fill this)
  if (honeypot) {
    return NextResponse.json({ success: true }); // pretend success, don't tip off the bot
  }

  // Bot check 2: submitted too fast to be a real human typing
  if (typeof elapsedMs === "number" && elapsedMs < 2000) {
    return NextResponse.json({ success: true }); // same — silently ignore
  }

  if (!name || !message) {
    return NextResponse.json({ error: "Name and message are required" }, { status: 400 });
  }

  await prisma.contactMessage.create({ data: { name, email, message } });
  return NextResponse.json({ success: true });
}