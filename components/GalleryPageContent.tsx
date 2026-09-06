"use client";

import { useLanguage } from "@/context/LanguageContext";

const content = {
  en: { heading: "📸 Gallery", empty: "No photos uploaded yet — check back soon." },
  hi: { heading: "📸 गैलरी", empty: "अभी कोई तस्वीर नहीं है — जल्द ही देखें।" },
};

type Photo = { id: string; url: string; caption: string | null; year: number; category: string };

export default function GalleryPageContent({ photos }: { photos: Photo[] }) {
  const { lang } = useLanguage();
  const t = content[lang];

  const byYear = photos.reduce<Record<number, Photo[]>>((acc, p) => {
    (acc[p.year] ??= []).push(p);
    return acc;
  }, {});
  const years = Object.keys(byYear).map(Number).sort((a, b) => b - a);

  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8">{t.heading}</h1>
      {years.length === 0 ? (
        <p className="text-gray-500">{t.empty}</p>
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
  );
}