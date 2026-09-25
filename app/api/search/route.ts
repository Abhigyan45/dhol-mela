import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q")?.trim();

  if (!q) {
    return NextResponse.json({ news: [], gallery: [], archive: [], notifications: [], committee: [], sponsors: [] });
  }

  const [news, gallery, archive, notifications, committee, sponsors] = await Promise.all([
    prisma.news.findMany({
      where: { published: true, OR: [{ title: { contains: q, mode: "insensitive" } }, { summary: { contains: q, mode: "insensitive" } }] },
      take: 10,
    }),
    prisma.galleryPhoto.findMany({
      where: { OR: [{ caption: { contains: q, mode: "insensitive" } }, { category: { contains: q, mode: "insensitive" } }] },
      take: 10,
    }),
    prisma.archive.findMany({
      where: { OR: [{ title: { contains: q, mode: "insensitive" } }, { description: { contains: q, mode: "insensitive" } }] },
      take: 10,
    }),
    prisma.notification.findMany({
      where: { active: true, message: { contains: q, mode: "insensitive" } },
      take: 10,
    }),
    prisma.member.findMany({
      where: { OR: [{ name: { contains: q, mode: "insensitive" } }, { role: { contains: q, mode: "insensitive" } }] },
      take: 10,
    }),
    prisma.sponsor.findMany({
      where: { OR: [{ name: { contains: q, mode: "insensitive" } }, { contribution: { contains: q, mode: "insensitive" } }] },
      take: 10,
    }),
  ]);

  return NextResponse.json({ news, gallery, archive, notifications, committee, sponsors });
}