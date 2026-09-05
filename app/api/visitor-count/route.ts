import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const stats = await prisma.siteStats.findUnique({ where: { id: "main" } });
  return NextResponse.json({ count: stats?.visitorCount ?? 0 });
}

export async function POST() {
  const stats = await prisma.siteStats.upsert({
    where: { id: "main" },
    update: { visitorCount: { increment: 1 } },
    create: { id: "main", visitorCount: 1 },
  });
  return NextResponse.json({ count: stats.visitorCount });
}