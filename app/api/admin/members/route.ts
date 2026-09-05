import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const members = await prisma.member.findMany({ orderBy: { order: "asc" } });
  return NextResponse.json(members);
}

export async function POST(req: Request) {
  const { name, role, photoUrl, order } = await req.json();
  if (!name || !role) {
    return NextResponse.json({ error: "Name and role are required" }, { status: 400 });
  }
  const member = await prisma.member.create({ data: { name, role, photoUrl, order: order ?? 0 } });
  return NextResponse.json(member);
}