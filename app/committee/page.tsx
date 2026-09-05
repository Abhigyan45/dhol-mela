import Navbar from "@/components/Navbar";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function CommitteePage() {
  const members = await prisma.member.findMany({ orderBy: { order: "asc" } });

  return (
    <main>
      <Navbar />
      <section className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-8 text-center">👥 Mela Committee</h1>
        {members.length === 0 ? (
          <p className="text-gray-500 text-center">Committee members coming soon.</p>
        ) : (
          <div className="grid sm:grid-cols-3 gap-8 text-center">
            {members.map((m: typeof members[number]) => (
              <div key={m.id}>
                <div className="w-24 h-24 mx-auto rounded-full bg-gray-300 mb-3" />
                <p className="font-semibold text-lg">{m.name}</p>
                <p className="text-sm text-gray-500">{m.role}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}