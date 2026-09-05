import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const notifications = await prisma.notification.findMany({
    where: { active: true },
    orderBy: { createdAt: "desc" },
    take: 3,
  });
  return NextResponse.json(notifications);
}