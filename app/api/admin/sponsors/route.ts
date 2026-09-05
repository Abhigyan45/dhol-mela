import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const sponsors = await prisma.sponsor.findMany({ orderBy: { order: "asc" } });
  return NextResponse.json(sponsors);
}

export async function POST(req: Request) {
  const { name, logoUrl, contribution, order } = await req.json();
  if (!name) return NextResponse.json({ error: "Name is required" }, { status: 400 });
  const sponsor = await prisma.sponsor.create({ data: { name, logoUrl, contribution, order: order ?? 0 } });
  return NextResponse.json(sponsor);
}