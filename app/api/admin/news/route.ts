// import { NextResponse } from "next/server";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// export async function GET() {
//   const news = await prisma.news.findMany({ orderBy: { createdAt: "desc" } });
//   return NextResponse.json(news);
// }

// export async function POST(req: Request) {
//   const { title, summary, content, published } = await req.json();

//   if (!title || !summary) {
//     return NextResponse.json({ error: "Title and summary are required" }, { status: 400 });
//   }

//   const news = await prisma.news.create({
//     data: { title, summary, content, published: published ?? true },
//   });

//   return NextResponse.json(news);
// }
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { put } from "@vercel/blob";
import { parseYouTubeId } from "@/lib/youtube";
import { getAdminSession } from "@/lib/adminAuth";

const prisma = new PrismaClient();

export async function GET() {
  const news = await prisma.news.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(news);
}

export async function POST(req: Request) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const formData = await req.formData();
  const title = formData.get("title") as string;
  const summary = formData.get("summary") as string;
  const content = formData.get("content") as string | null;
  const youtubeUrl = formData.get("youtubeUrl") as string | null;
  const file = formData.get("file") as File | null;

  if (!title || !summary) {
    return NextResponse.json({ error: "Title and summary are required" }, { status: 400 });
  }

  let mediaType: string | null = null;
  let mediaUrl: string | null = null;

  if (file && file.size > 0) {
    const blob = await put(`news/${Date.now()}-${file.name}`, file, { access: "public" ,token: process.env.VOLIMG_READ_WRITE_TOKEN,});
    mediaType = file.type.startsWith("video/") ? "video" : "photo";
    mediaUrl = blob.url;
  } else if (youtubeUrl) {
    const videoId = parseYouTubeId(youtubeUrl);
    if (!videoId) {
      return NextResponse.json({ error: "Couldn't read that YouTube link" }, { status: 400 });
    }
    mediaType = "youtube";
    mediaUrl = videoId;
  }

  const news = await prisma.news.create({
    data: { title, summary, content: content || null, published: true, mediaType, mediaUrl },
  });

  return NextResponse.json(news);
}