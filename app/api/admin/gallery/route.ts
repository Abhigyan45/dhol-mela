import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const photos = await prisma.galleryPhoto.findMany({
    orderBy: [{ year: "desc" }, { createdAt: "desc" }],
  });
  return NextResponse.json(photos);
}

export async function POST(req: Request) {
  const { url, caption, year, category } = await req.json();
  if (!url || !year || !category) {
    return NextResponse.json({ error: "URL, year, and category are required" }, { status: 400 });
  }
  const photo = await prisma.galleryPhoto.create({ data: { url, caption, year, category } });
  return NextResponse.json(photo);
}