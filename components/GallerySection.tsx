import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function GallerySection() {
  const photos = await prisma.galleryPhoto.findMany({
    orderBy: { createdAt: "desc" },
    take: 4,
  });

  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold mb-6">📸 Latest Gallery</h2>
      {photos.length === 0 ? (
        <p className="text-gray-500">Photos coming soon.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {photos.map((p: typeof photos[number]) => (
            <img key={p.id} src={p.url} alt={p.caption ?? ""} className="w-full aspect-square object-cover rounded-xl" />
          ))}
        </div>
      )}
      <a href="/gallery" className="inline-block mt-4 text-orange-600 font-medium hover:underline">
        View full gallery →
      </a>
    </section>
  );
}