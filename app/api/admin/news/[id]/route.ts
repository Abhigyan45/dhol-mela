// import { NextResponse } from "next/server";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
//   const { id } = await params;
//   const { title, summary, content, published } = await req.json();

//   const news = await prisma.news.update({
//     where: { id },
//     data: { title, summary, content, published },
//   });

//   return NextResponse.json(news);
// }

// export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
//   const { id } = await params;
//   await prisma.news.delete({ where: { id } });
//   return NextResponse.json({ success: true });
// }

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { put } from "@vercel/blob";
import { parseYouTubeId } from "@/lib/youtube";
import { getAdminSession } from "@/lib/adminAuth";

const prisma = new PrismaClient();

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const formData = await req.formData();
  const title = formData.get("title") as string;
  const summary = formData.get("summary") as string;
  const content = formData.get("content") as string | null;
  const published = formData.get("published") === "true";
  const youtubeUrl = formData.get("youtubeUrl") as string | null;
  const file = formData.get("file") as File | null;
  const removeMedia = formData.get("removeMedia") === "true";

  const existing = await prisma.news.findUnique({ where: { id } });
  let mediaType = existing?.mediaType ?? null;
  let mediaUrl = existing?.mediaUrl ?? null;

  if (removeMedia) {
    mediaType = null;
    mediaUrl = null;
  } else if (file && file.size > 0) {
    const blob = await put(`news/${Date.now()}-${file.name}`, file, { access: "public" ,token: process.env.VOLIMG_READ_WRITE_TOKEN,});
    mediaType = file.type.startsWith("video/") ? "video" : "photo";
    mediaUrl = blob.url;
  } else if (youtubeUrl) {
    const videoId = parseYouTubeId(youtubeUrl);
    if (videoId) {
      mediaType = "youtube";
      mediaUrl = videoId;
    }
  }

  const news = await prisma.news.update({
    where: { id },
    data: { title, summary, content, published, mediaType, mediaUrl },
  });

  return NextResponse.json(news);
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  await prisma.news.delete({ where: { id } });
  return NextResponse.json({ success: true });
}