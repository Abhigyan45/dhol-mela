"use client";

import { useLanguage } from "@/context/LanguageContext";

const content = {
  en: { heading: "📰 Latest Mela News", empty: "No news yet — check back soon." },
  hi: { heading: "📰 ताज़ा मेला समाचार", empty: "अभी कोई समाचार नहीं — जल्द ही देखें।" },
};

type News = { id: string; title: string; summary: string; content: string | null; createdAt: string | Date };

export default function NewsPageContent({ newsItems }: { newsItems: News[] }) {
  const { lang } = useLanguage();
  const t = content[lang];

  return (
    <section className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8">{t.heading}</h1>
      {newsItems.length === 0 ? (
        <p className="text-gray-500">{t.empty}</p>
      ) : (
        <div className="space-y-4">
          {newsItems.map((item) => (
            <div key={item.id} className="border rounded-xl p-5">
              <p className="text-sm text-gray-400 mb-1">{new Date(item.createdAt).toLocaleDateString()}</p>
              <h2 className="font-semibold text-lg mb-2">{item.title}</h2>
              <p className="text-gray-600">{item.summary}</p>
              {item.content && <p className="text-gray-700 mt-3 whitespace-pre-line">{item.content}</p>}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}