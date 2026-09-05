import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const notifications = await prisma.notification.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(notifications);
}

export async function POST(req: Request) {
  const { message } = await req.json();
  if (!message) {
    return NextResponse.json({ error: "Message is required" }, { status: 400 });
  }
  const notification = await prisma.notification.create({ data: { message } });
  return NextResponse.json(notification);
}