import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function SponsorsSection() {
  const sponsors = await prisma.sponsor.findMany({ orderBy: { order: "asc" } });
  if (sponsors.length === 0) return null;

  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold mb-6 text-center">🤝 Our Sponsors</h2>
      <div className="flex flex-wrap justify-center gap-8">
        {sponsors.map((s: typeof sponsors[number]) => (
          <div key={s.id} className="text-center">
            {s.logoUrl ? (
              <img src={s.logoUrl} alt={s.name} className="h-16 object-contain mx-auto mb-2" />
            ) : (
              <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center mx-auto mb-2 font-bold text-gray-500">
                {s.name[0]}
              </div>
            )}
            <p className="font-semibold text-sm">{s.name}</p>
            {s.contribution && <p className="text-xs text-gray-500">{s.contribution}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}