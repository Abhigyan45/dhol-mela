import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getAdminSession } from "@/lib/adminAuth";

const prisma = new PrismaClient();

export async function GET() {
  const rules = await prisma.safetyRule.findMany({ orderBy: { order: "asc" } });
  return NextResponse.json(rules);
}

export async function POST(req: Request) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { textEn, textHi, category, order } = await req.json();
  if (!textEn) return NextResponse.json({ error: "English text is required" }, { status: 400 });

  const rule = await prisma.safetyRule.create({
    data: { textEn, textHi: textHi || null, category: category ?? "general", order: order ?? 0 },
  });
  return NextResponse.json(rule);
}