import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function Committee() {
  const members = await prisma.member.findMany({ orderBy: { order: "asc" } });

  return (
    <section className="max-w-6xl mx-auto px-4 py-16 bg-orange-50 rounded-2xl">
      <h2 className="text-3xl font-bold mb-6 text-center">👥 Mela Committee</h2>
      {members.length === 0 ? (
        <p className="text-gray-500 text-center">Committee members coming soon.</p>
      ) : (
        <div className="grid sm:grid-cols-3 gap-6 text-center">
          {members.map((m) => (
            <div key={m.id}>
              <div className="w-20 h-20 mx-auto rounded-full bg-gray-300 mb-3" />
              <p className="font-semibold">{m.name}</p>
              <p className="text-sm text-gray-500">{m.role}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}