"use client";

import { useEffect, useState } from "react";

type Photo = { id: string; url: string; type: string; caption: string | null; year: number; category: string };

const categories = ["Opening", "Dhol Programme", "Cultural", "Religious", "Crowd", "Decoration", "Committee", "Village", "Old Memories"];

export default function AdminGallery() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState("");
  const [type, setType] = useState<"photo" | "video">("photo");
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
      body: JSON.stringify({ url, type, caption, year, category }),
    });
    setUrl("");
    setCaption("");
    load();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this item?")) return;
    await fetch(`/api/admin/gallery/${id}`, { method: "DELETE" });
    load();
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">📸 Manage Gallery</h1>

      <form onSubmit={handleSubmit} className="border rounded-xl p-5 mb-8 space-y-3">
        <h2 className="font-semibold">Add Photo or Video</h2>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => setType("photo")}
            className={`px-4 py-2 rounded-lg border font-medium ${type === "photo" ? "bg-orange-600 text-white border-orange-600" : "hover:bg-gray-50"}`}
          >
            📷 Photo
          </button>
          <button
            type="button"
            onClick={() => setType("video")}
            className={`px-4 py-2 rounded-lg border font-medium ${type === "video" ? "bg-orange-600 text-white border-orange-600" : "hover:bg-gray-50"}`}
          >
            🎥 Video
          </button>
        </div>

        <input
          type="text"
          placeholder={type === "photo" ? "Photo URL (paste a direct image link)" : "Video URL (YouTube link, or direct .mp4 link)"}
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
          Add {type === "photo" ? "Photo" : "Video"}
        </button>
      </form>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : photos.length === 0 ? (
        <p className="text-gray-500">No items yet.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {photos.map((p) => (
            <div key={p.id} className="relative group">
              {p.type === "video" ? (
                <div className="w-full aspect-square bg-gray-900 rounded-lg flex items-center justify-center text-white text-3xl">
                  ▶️
                </div>
              ) : (
                <img src={p.url} alt={p.caption ?? ""} className="w-full aspect-square object-cover rounded-lg" />
              )}
              <div className="mt-1 text-xs text-gray-500">{p.year} · {p.category} · {p.type}</div>
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