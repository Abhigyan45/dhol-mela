import Navbar from "@/components/Navbar";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function NewsPage() {
  const newsItems = await prisma.news.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main>
      <Navbar />
      <section className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-8">📰 Latest Mela News</h1>
        {newsItems.length === 0 ? (
          <p className="text-gray-500">No news yet — check back soon.</p>
        ) : (
          <div className="space-y-4">
            {newsItems.map((item: typeof newsItems[number]) => (
              <div key={item.id} className="border rounded-xl p-5">
                <p className="text-sm text-gray-400 mb-1">
                  {new Date(item.createdAt).toLocaleDateString()}
                </p>
                <h2 className="font-semibold text-lg mb-2">{item.title}</h2>
                <p className="text-gray-600">{item.summary}</p>
                {item.content && (
                  <p className="text-gray-700 mt-3 whitespace-pre-line">{item.content}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}