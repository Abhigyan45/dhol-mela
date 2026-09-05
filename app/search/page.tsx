"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";

type News = { id: string; title: string; summary: string };
type Photo = { id: string; url: string; caption: string | null; category: string };
type Archive = { id: string; title: string; year: number; description: string | null };

export default function SearchPage() {
  const [q, setQ] = useState("");
  const [results, setResults] = useState<{ news: News[]; gallery: Photo[]; archive: Archive[] } | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!q.trim()) return;
    setLoading(true);
    const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
    setResults(await res.json());
    setLoading(false);
  }

  const totalResults = results ? results.news.length + results.gallery.length + results.archive.length : 0;

  return (
    <main>
      <Navbar />
      <section className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-6">🔍 Search</h1>
        <form onSubmit={handleSearch} className="flex gap-3 mb-8">
          <input
            type="text"
            placeholder="Search news, gallery, archive..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="flex-1 border rounded-lg px-4 py-2"
          />
          <button className="bg-orange-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-orange-700">
            Search
          </button>
        </form>

        {loading && <p className="text-gray-500">Searching...</p>}

        {results && !loading && (
          <>
            {totalResults === 0 ? (
              <p className="text-gray-500">No results found for "{q}".</p>
            ) : (
              <div className="space-y-10">
                {results.news.length > 0 && (
                  <div>
                    <h2 className="font-bold text-lg mb-3">📰 News</h2>
                    <div className="space-y-2">
                      {results.news.map((n: News) => (
                        <div key={n.id} className="border rounded-lg p-3">
                          <p className="font-semibold">{n.title}</p>
                          <p className="text-sm text-gray-600">{n.summary}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {results.gallery.length > 0 && (
                  <div>
                    <h2 className="font-bold text-lg mb-3">📸 Gallery</h2>
                    <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                      {results.gallery.map((p: Photo) => (
                        <img key={p.id} src={p.url} alt={p.caption ?? ""} className="w-full aspect-square object-cover rounded-lg" />
                      ))}
                    </div>
                  </div>
                )}

                {results.archive.length > 0 && (
                  <div>
                    <h2 className="font-bold text-lg mb-3">🗂️ Archive</h2>
                    <div className="space-y-2">
                      {results.archive.map((a: Archive) => (
                        <div key={a.id} className="border rounded-lg p-3">
                          <p className="font-semibold">{a.title} ({a.year})</p>
                          {a.description && <p className="text-sm text-gray-600">{a.description}</p>}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </section>
    </main>
  );
}