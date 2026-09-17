import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type VolunteerStatusRecord = {
  id: string;
  name: string;
  phone: string;
  village: string | null;
  interest: string | null;
  status: string;
  uniqueId: string | null;
  approvedAt: Date | null;
  createdAt: Date;
};

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { status } = await req.json();

  if (!["pending", "approved", "rejected"].includes(status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  const volunteers = await prisma.$queryRaw<VolunteerStatusRecord[]>`
    SELECT "id", "name", "phone", "village", "interest", "status", "uniqueId", "approvedAt", "createdAt"
    FROM "Volunteer"
    WHERE "id" = ${id}
    LIMIT 1
  `;
  const volunteer = volunteers[0];
  if (!volunteer) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  let uniqueId = volunteer.uniqueId;
  let approvedAt = volunteer.approvedAt;

  if (status === "approved" && !uniqueId) {
    const [{ count: approvedCount }] = await prisma.$queryRaw<[{ count: bigint }]>`
      SELECT COUNT(*) AS count
      FROM "Volunteer"
      WHERE "status" = 'approved'
    `;
    const number = String(Number(approvedCount) + 1).padStart(4, "0");
    uniqueId = `AKHRA7-VOL-${number}`;
    approvedAt = new Date();
  }

  await prisma.$executeRaw`
    UPDATE "Volunteer"
    SET "status" = ${status}, "uniqueId" = ${uniqueId}, "approvedAt" = ${approvedAt}
    WHERE "id" = ${id}
  `;

  const [updated] = await prisma.$queryRaw<VolunteerStatusRecord[]>`
    SELECT "id", "name", "phone", "village", "interest", "status", "uniqueId", "approvedAt", "createdAt"
    FROM "Volunteer"
    WHERE "id" = ${id}
    LIMIT 1
  `;

  return NextResponse.json(updated);
}