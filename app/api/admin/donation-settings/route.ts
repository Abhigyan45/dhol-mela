import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const settings = await prisma.donationSettings.findUnique({ where: { id: "main" } });
  return NextResponse.json(settings);
}

export async function PUT(req: Request) {
  const { upiId, payeeName } = await req.json();
  if (!upiId || !payeeName) {
    return NextResponse.json({ error: "UPI ID and payee name are required" }, { status: 400 });
  }
  const settings = await prisma.donationSettings.upsert({
    where: { id: "main" },
    update: { upiId, payeeName },
    create: { id: "main", upiId, payeeName },
  });
  return NextResponse.json(settings);
}