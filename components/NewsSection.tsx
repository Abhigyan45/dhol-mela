"use client";

import { useLanguage } from "@/context/LanguageContext";

const content = {
  en: { heading: "📰 Latest Mela News", empty: "No news yet — check back soon." },
  hi: { heading: "📰 ताज़ा मेला समाचार", empty: "अभी कोई समाचार नहीं — जल्द ही देखें।" },
};

type NewsItem = { id: string; title: string; summary: string; createdAt: string | Date };

export default function NewsSection({ newsItems }: { newsItems: NewsItem[] }) {
  const { lang } = useLanguage();
  const t = content[lang];

  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold mb-6">{t.heading}</h2>
      {newsItems.length === 0 ? (
        <p className="text-gray-500">{t.empty}</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {newsItems.map((item) => (
            <div key={item.id} className="border rounded-xl p-5 hover:shadow-md transition-shadow">
              <p className="text-sm text-gray-400 mb-1">
                {new Date(item.createdAt).toLocaleDateString()}
              </p>
              <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.summary}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}