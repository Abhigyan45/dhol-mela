import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const settings = await prisma.donationSettings.findUnique({ where: { id: "main" } });
  return NextResponse.json({
    upiId: settings?.upiId ?? "",
    payeeName: settings?.payeeName ?? "Songadhwa Akhra No. 7 Committee",
  });
}