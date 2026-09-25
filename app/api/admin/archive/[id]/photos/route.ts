import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { url, type, caption } = await req.json();

  if (!url) {
    return NextResponse.json({ error: "URL is required" }, { status: 400 });
  }

  const photo = await prisma.archivePhoto.create({
    data: { url, type: type ?? "photo", caption, archiveId: id },
  });

  return NextResponse.json(photo);
}