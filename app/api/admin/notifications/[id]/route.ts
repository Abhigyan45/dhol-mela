import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { message, active } = await req.json();
  const notification = await prisma.notification.update({
    where: { id },
    data: { message, active },
  });
  return NextResponse.json(notification);
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await prisma.notification.delete({ where: { id } });
  return NextResponse.json({ success: true });
}