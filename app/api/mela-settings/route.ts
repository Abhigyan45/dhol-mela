import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const settings = await prisma.melaSettings.findUnique({ where: { id: "main" } });
  return NextResponse.json({ melaDate: settings?.melaDate ?? null });
}