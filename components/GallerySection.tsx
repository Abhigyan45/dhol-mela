"use client";

import { useLanguage } from "@/context/LanguageContext";

const content = {
  en: { heading: "📸 Latest Gallery", empty: "Photos coming soon.", link: "View full gallery →" },
  hi: { heading: "📸 नवीनतम गैलरी", empty: "जल्द ही तस्वीरें जोड़ी जाएंगी।", link: "पूरी गैलरी देखें →" },
};

type Photo = { id: string; url: string; caption: string | null };

export default function GallerySection({ photos }: { photos: Photo[] }) {
  const { lang } = useLanguage();
  const t = content[lang];

  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold mb-6">{t.heading}</h2>
      {photos.length === 0 ? (
        <p className="text-gray-500">{t.empty}</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {photos.map((p) => (
            <img key={p.id} src={p.url} alt={p.caption ?? ""} className="w-full aspect-square object-cover rounded-xl" />
          ))}
        </div>
      )}
      <a href="/gallery" className="inline-block mt-4 text-orange-600 font-medium hover:underline">
        {t.link}
      </a>
    </section>
  );
}