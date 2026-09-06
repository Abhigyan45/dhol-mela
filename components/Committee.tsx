"use client";

import { useLanguage } from "@/context/LanguageContext";

const content = {
  en: { heading: "👥 Mela Committee", empty: "Committee members coming soon." },
  hi: { heading: "👥 मेला समिति", empty: "समिति सदस्य जल्द ही जोड़े जाएंगे।" },
};

type Member = { id: string; name: string; role: string };

export default function Committee({ members }: { members: Member[] }) {
  const { lang } = useLanguage();
  const t = content[lang];

  return (
    <section className="max-w-6xl mx-auto px-4 py-16 bg-orange-50 rounded-2xl">
      <h2 className="text-3xl font-bold mb-6 text-center">{t.heading}</h2>
      {members.length === 0 ? (
        <p className="text-gray-500 text-center">{t.empty}</p>
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