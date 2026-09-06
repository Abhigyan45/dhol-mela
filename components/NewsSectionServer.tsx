import { PrismaClient } from "@prisma/client";
import NewsSection from "./NewsSection";

const prisma = new PrismaClient();

export default async function NewsSectionServer() {
  const newsItems = await prisma.news.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
    take: 4,
  });
  return <NewsSection newsItems={newsItems} />;
}