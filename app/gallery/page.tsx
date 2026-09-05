import Navbar from "@/components/Navbar";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function GalleryPage() {
  const photos = await prisma.galleryPhoto.findMany({
    orderBy: [{ year: "desc" }, { category: "asc" }],
  });

  const byYear = photos.reduce<Record<number, typeof photos>>((acc, p) => {
    (acc[p.year] ??= []).push(p);
    return acc;
  }, {});

  const years = Object.keys(byYear).map(Number).sort((a, b) => b - a);

  return (
    <main>
      <Navbar />
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-8">📸 Gallery</h1>
        {years.length === 0 ? (
          <p className="text-gray-500">No photos uploaded yet — check back soon.</p>
        ) : (
          <div className="space-y-12">
            {years.map((year) => (
              <div key={year}>
                <h2 className="text-2xl font-bold mb-4">{year}</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {byYear[year].map((p) => (
                    <div key={p.id}>
                      <img src={p.url} alt={p.caption ?? ""} className="w-full aspect-square object-cover rounded-xl" />
                      <p className="text-xs text-gray-500 mt-1">{p.category}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}