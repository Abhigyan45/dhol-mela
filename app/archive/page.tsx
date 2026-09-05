import Navbar from "@/components/Navbar";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function ArchivePage() {
  const archives = await prisma.archive.findMany({
    include: { photos: true },
    orderBy: { year: "desc" },
  });

  return (
    <main>
      <Navbar />
      <section className="max-w-5xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-8">🗂️ Previous Years</h1>
        {archives.length === 0 ? (
          <p className="text-gray-500">No past years archived yet — check back after this year's mela!</p>
        ) : (
          <div className="space-y-12">
            {archives.map((a) => (
              <div key={a.id}>
                <h2 className="text-2xl font-bold mb-1">{a.title}</h2>
                {a.description && <p className="text-gray-600 mb-4">{a.description}</p>}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {a.photos.map((p) => (
                    <img key={p.id} src={p.url} alt={p.caption ?? ""} className="w-full aspect-square object-cover rounded-xl" />
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