"use client";

import { useLanguage } from "@/context/LanguageContext";

const content = {
  en: { heading: "🤝 Our Sponsors", empty: "No sponsors listed yet.", thanks: "We're grateful to the individuals and businesses who support the Songadhwa Akhra No-7 Dol Mela each year." },
  hi: { heading: "🤝 हमारे प्रायोजक", empty: "अभी कोई प्रायोजक सूचीबद्ध नहीं है।", thanks: "हम उन व्यक्तियों और व्यवसायों के आभारी हैं जो हर साल सोंगढ़वा अखाड़ा नंबर 7 ढोल मेला का समर्थन करते हैं।" },
};

type Sponsor = { id: string; name: string; logoUrl: string | null; contribution: string | null };

export default function SponsorsPageContent({ sponsors }: { sponsors: Sponsor[] }) {
  const { lang } = useLanguage();
  const t = content[lang];

  return (
    <section className="max-w-4xl mx-auto px-4 py-16 text-center">
      <h1 className="text-3xl font-bold mb-3">{t.heading}</h1>
      <p className="text-gray-600 mb-10">{t.thanks}</p>

      {sponsors.length === 0 ? (
        <p className="text-gray-500">{t.empty}</p>
      ) : (
        <div className="flex flex-wrap justify-center gap-10">
          {sponsors.map((s) => (
            <div key={s.id} className="text-center">
              {s.logoUrl ? (
                <img src={s.logoUrl} alt={s.name} className="h-20 object-contain mx-auto mb-2" />
              ) : (
                <div className="h-20 w-20 rounded-full bg-gray-200 flex items-center justify-center mx-auto mb-2 font-bold text-gray-500 text-xl">
                  {s.name[0]}
                </div>
              )}
              <p className="font-semibold">{s.name}</p>
              {s.contribution && <p className="text-sm text-gray-500">{s.contribution}</p>}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}