"use client";

import { useEffect, useState } from "react";

type Photo = { id: string; url: string; caption: string | null; year: number; category: string };

const categories = ["Opening", "Dhol Programme", "Cultural", "Religious", "Crowd", "Decoration", "Committee", "Village", "Old Memories"];

export default function AdminGallery() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState("");
  const [caption, setCaption] = useState("");
  const [year, setYear] = useState(new Date().getFullYear());
  const [category, setCategory] = useState(categories[0]);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/admin/gallery");
    setPhotos(await res.json());
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await fetch("/api/admin/gallery", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url, caption, year, category }),
    });
    setUrl("");
    setCaption("");
    load();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this photo?")) return;
    await fetch(`/api/admin/gallery/${id}`, { method: "DELETE" });
    load();
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">📸 Manage Gallery</h1>

      <form onSubmit={handleSubmit} className="border rounded-xl p-5 mb-8 space-y-3">
        <h2 className="font-semibold">Add Photo</h2>
        <input
          type="text"
          placeholder="Photo URL (paste a link from Google Photos, Imgur, etc.)"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full border rounded-lg px-3 py-2"
          required
        />
        <input
          type="text"
          placeholder="Caption (optional)"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className="w-full border rounded-lg px-3 py-2"
        />
        <div className="flex gap-3">
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            className="w-32 border rounded-lg px-3 py-2"
            required
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="flex-1 border rounded-lg px-3 py-2"
          >
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <button className="bg-orange-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-orange-700">
          Add Photo
        </button>
      </form>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : photos.length === 0 ? (
        <p className="text-gray-500">No photos yet.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {photos.map((p) => (
            <div key={p.id} className="relative group">
              <img src={p.url} alt={p.caption ?? ""} className="w-full aspect-square object-cover rounded-lg" />
              <div className="mt-1 text-xs text-gray-500">{p.year} · {p.category}</div>
              <button
                onClick={() => handleDelete(p.id)}
                className="absolute top-1 right-1 bg-red-600 text-white text-xs px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}