import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const volunteers = await prisma.volunteer.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(volunteers);
}