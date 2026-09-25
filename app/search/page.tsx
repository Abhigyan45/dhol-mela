"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import { useLanguage } from "@/context/LanguageContext";
import FadeIn from "@/components/FadeIn";

const content = {
  en: {
    heading: "🔍 Search", placeholder: "Search news, gallery, notifications, committee...", button: "Search", searching: "Searching...",
    noResults: (q: string) => `No results found for "${q}".`,
    news: "📰 News", gallery: "📸 Gallery", archive: "🗂️ Archive",
    notifications: "📢 Notifications", committee: "👥 Committee", sponsors: "🤝 Sponsors",
  },
  hi: {
    heading: "🔍 खोजें", placeholder: "समाचार, गैलरी, सूचनाएं, समिति खोजें...", button: "खोजें", searching: "खोजा जा रहा है...",
    noResults: (q: string) => `"${q}" के लिए कोई परिणाम नहीं मिला।`,
    news: "📰 समाचार", gallery: "📸 गैलरी", archive: "🗂️ अभिलेखागार",
    notifications: "📢 सूचनाएं", committee: "👥 समिति", sponsors: "🤝 प्रायोजक",
  },
};

type News = { id: string; title: string; summary: string };
type Photo = { id: string; url: string; caption: string | null; category: string };
type Archive = { id: string; title: string; year: number; description: string | null };
type Notification = { id: string; message: string };
type Member = { id: string; name: string; role: string };
type Sponsor = { id: string; name: string; contribution: string | null };

export default function SearchPage() {
  const { lang } = useLanguage();
  const t = content[lang];
  const [q, setQ] = useState("");
  const [results, setResults] = useState<{
    news: News[]; gallery: Photo[]; archive: Archive[];
    notifications: Notification[]; committee: Member[]; sponsors: Sponsor[];
  } | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!q.trim()) return;
    setLoading(true);
    const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
    setResults(await res.json());
    setLoading(false);
  }

  const totalResults = results
    ? results.news.length + results.gallery.length + results.archive.length +
      results.notifications.length + results.committee.length + results.sponsors.length
    : 0;

  return (
    <main>
      <Navbar />
      <section className="max-w-3xl mx-auto px-4 py-16">
        <FadeIn>
          <div>
            <h1 className="text-3xl font-bold mb-6">{t.heading}</h1>
            <form onSubmit={handleSearch} className="flex gap-3 mb-8">
              <input type="text" placeholder={t.placeholder} value={q} onChange={(e) => setQ(e.target.value)} className="flex-1 border rounded-lg px-4 py-2" />
              <button className="bg-orange-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-orange-700">{t.button}</button>
            </form>
          </div>
        </FadeIn>

        {loading && <p className="text-gray-500">{t.searching}</p>}

        {results && !loading && (
          <>
            {totalResults === 0 ? (
              <FadeIn>
                <p className="text-gray-500">{t.noResults(q)}</p>
              </FadeIn>
            ) : (
              <div className="space-y-10">
                {results.notifications.length > 0 && (
                  <FadeIn>
                    <div>
                      <h2 className="font-bold text-lg mb-3">{t.notifications}</h2>
                      <div className="space-y-2">
                        {results.notifications.map((n) => (
                          <div key={n.id} className="border-l-4 border-orange-600 bg-orange-50 rounded-r-lg p-3">
                            <p className="text-sm">{n.message}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </FadeIn>
                )}
                {results.news.length > 0 && (
                  <FadeIn>
                    <div>
                      <h2 className="font-bold text-lg mb-3">{t.news}</h2>
                      <div className="space-y-2">
                        {results.news.map((n) => (
                          <div key={n.id} className="border rounded-lg p-3">
                            <p className="font-semibold">{n.title}</p>
                            <p className="text-sm text-gray-600">{n.summary}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </FadeIn>
                )}
                {results.committee.length > 0 && (
                  <FadeIn>
                    <div>
                      <h2 className="font-bold text-lg mb-3">{t.committee}</h2>
                      <div className="space-y-2">
                        {results.committee.map((m) => (
                          <div key={m.id} className="border rounded-lg p-3">
                            <p className="font-semibold">{m.name}</p>
                            <p className="text-sm text-gray-600">{m.role}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </FadeIn>
                )}
                {results.sponsors.length > 0 && (
                  <FadeIn>
                    <div>
                      <h2 className="font-bold text-lg mb-3">{t.sponsors}</h2>
                      <div className="space-y-2">
                        {results.sponsors.map((s) => (
                          <div key={s.id} className="border rounded-lg p-3">
                            <p className="font-semibold">{s.name}</p>
                            {s.contribution && <p className="text-sm text-gray-600">{s.contribution}</p>}
                          </div>
                        ))}
                      </div>
                    </div>
                  </FadeIn>
                )}
                {results.gallery.length > 0 && (
                  <FadeIn>
                    <div>
                      <h2 className="font-bold text-lg mb-3">{t.gallery}</h2>
                      <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                        {results.gallery.map((p) => (
                          <img key={p.id} src={p.url} alt={p.caption ?? ""} className="w-full aspect-square object-cover rounded-lg" />
                        ))}
                      </div>
                    </div>
                  </FadeIn>
                )}
                {results.archive.length > 0 && (
                  <FadeIn>
                    <div>
                      <h2 className="font-bold text-lg mb-3">{t.archive}</h2>
                      <div className="space-y-2">
                        {results.archive.map((a) => (
                          <div key={a.id} className="border rounded-lg p-3">
                            <p className="font-semibold">{a.title} ({a.year})</p>
                            {a.description && <p className="text-sm text-gray-600">{a.description}</p>}
                          </div>
                        ))}
                      </div>
                    </div>
                  </FadeIn>
                )}
              </div>
            )}
          </>
        )}
      </section>
    </main>
  );
}