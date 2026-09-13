import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const settings = await prisma.melaSettings.findUnique({ where: { id: "main" } });
  return NextResponse.json({ melaDate: settings?.melaDate ?? null });
}

export async function PUT(req: Request) {
  const { melaDate } = await req.json();
  if (!melaDate) {
    return NextResponse.json({ error: "Date is required" }, { status: 400 });
  }
  const settings = await prisma.melaSettings.upsert({
    where: { id: "main" },
    update: { melaDate: new Date(melaDate) },
    create: { id: "main", melaDate: new Date(melaDate) },
  });
  return NextResponse.json(settings);
}