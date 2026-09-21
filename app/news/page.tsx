import Navbar from "@/components/Navbar";
import { PrismaClient } from "@prisma/client";
import NewsPageContent from "@/components/NewsPageContent";
import FadeIn from "@/components/FadeIn";

export const metadata = {
  title: "News - Songadhwa Akhra No-7 Dhol Mela",
  description: "Latest news and updates about the Songadhwa Akhra No-7 Dhol Mela.",
};


const prisma = new PrismaClient();
export const dynamic = "force-dynamic";

export default async function NewsPage() {
  const newsItems = await prisma.news.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main>
      <Navbar />
      <FadeIn>
        <NewsPageContent newsItems={newsItems} />
      </FadeIn>
    </main>
  );
}