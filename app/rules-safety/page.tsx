import Navbar from "@/components/Navbar";
import FadeIn from "@/components/FadeIn";
import { PrismaClient } from "@prisma/client";

export const metadata = {
  title: "Rules & Safety - Songadhwa Akhra No-7 Dol Mela",
  description: "Rules of conduct and safety guidelines for the Songadhwa Akhra No-7 Dol Mela.",
};

const prisma = new PrismaClient();

export const dynamic = "force-dynamic";

const categoryLabels: Record<string, string> = {
  safety: "🚨 Safety Instructions",
  conduct: "🙏 Rules of Conduct",
  general: "📋 General Guidelines",
};

export default async function RulesSafetyPage() {
  const rules = await prisma.safetyRule.findMany({ orderBy: { order: "asc" } });

  const byCategory = rules.reduce<Record<string, typeof rules>>((acc, r) => {
    (acc[r.category] ??= []).push(r);
    return acc;
  }, {});

  return (
    <main>
      <Navbar />
      <section className="max-w-3xl mx-auto px-4 py-16">
        <FadeIn>
          <div>
            <h1 className="text-3xl font-bold mb-2">🚨 Rules & Safety</h1>
            <p className="text-gray-600 mb-10">
              Please read and follow these guidelines to help keep the Songadhwa Akhra No-7 Dol Mela safe and enjoyable for everyone.
            </p>
          </div>
        </FadeIn>

        {rules.length === 0 ? (
          <p className="text-gray-500">Rules will be posted here closer to the mela date.</p>
        ) : (
          Object.entries(categoryLabels).map(([key, label]) =>
            byCategory[key]?.length ? (
              <FadeIn key={key}>
                <div className="mb-10">
                  <h2 className="text-xl font-bold mb-3">{label}</h2>
                  <ul className="space-y-2 text-gray-700 list-disc list-inside">
                    {byCategory[key].map((r) => (
                      <li key={r.id}>{r.text}</li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            ) : null
          )
        )}
      </section>
    </main>
  );
}