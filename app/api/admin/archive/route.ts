import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const archives = await prisma.archive.findMany({
    include: { photos: true },
    orderBy: { year: "desc" },
  });
  return NextResponse.json(archives);
}

export async function POST(req: Request) {
  const { year, title, description } = await req.json();
  if (!year || !title) {
    return NextResponse.json({ error: "Year and title are required" }, { status: 400 });
  }
  const archive = await prisma.archive.create({ data: { year, title, description } });
  return NextResponse.json(archive);
}