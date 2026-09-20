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

  const { text, category, order } = await req.json();
  if (!text) return NextResponse.json({ error: "Text is required" }, { status: 400 });

  const rule = await prisma.safetyRule.create({
    data: { text, category: category ?? "general", order: order ?? 0 },
  });
  return NextResponse.json(rule);
}