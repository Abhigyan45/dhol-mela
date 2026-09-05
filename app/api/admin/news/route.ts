import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const news = await prisma.news.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(news);
}

export async function POST(req: Request) {
  const { title, summary, content, published } = await req.json();

  if (!title || !summary) {
    return NextResponse.json({ error: "Title and summary are required" }, { status: 400 });
  }

  const news = await prisma.news.create({
    data: { title, summary, content, published: published ?? true },
  });

  return NextResponse.json(news);
}