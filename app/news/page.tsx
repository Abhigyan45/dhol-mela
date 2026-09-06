import Navbar from "@/components/Navbar";
import { PrismaClient } from "@prisma/client";
import NewsPageContent from "@/components/NewsPageContent";

const prisma = new PrismaClient();

export default async function NewsPage() {
  const newsItems = await prisma.news.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main>
      <Navbar />
      <NewsPageContent newsItems={newsItems} />
    </main>
  );
}