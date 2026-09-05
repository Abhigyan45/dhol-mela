import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const updates = await prisma.liveUpdate.findMany({
    orderBy: { createdAt: "desc" },
    take: 20,
  });
  return NextResponse.json(updates);
}