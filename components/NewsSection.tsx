import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function NewsSection() {
  const newsItems = await prisma.news.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
    take: 4,
  });

  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold mb-6">📰 Latest Mela News</h2>
      {newsItems.length === 0 ? (
        <p className="text-gray-500">No news yet — check back soon.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {newsItems.map((item: typeof newsItems[number]) => (
            <div key={item.id} className="border rounded-xl p-5 hover:shadow-md transition-shadow">
              <p className="text-sm text-gray-400 mb-1">
                {new Date(item.createdAt).toLocaleDateString()}
              </p>
              <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.summary}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}