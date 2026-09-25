"use client";

import { useEffect, useState } from "react";
import { getYouTubeEmbedUrl, isDirectVideoFile } from "@/lib/video";

type Photo = { id: string; url: string; type: string; caption: string | null };
type ArchiveItem = {
  id: string;
  year: number;
  title: string;
  description: string | null;
  photos: Photo[];
};

export default function AdminArchive() {
  const [archives, setArchives] = useState<ArchiveItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [year, setYear] = useState(new Date().getFullYear() - 1);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [mediaUrl, setMediaUrl] = useState<{ [key: string]: string }>({});
  const [mediaType, setMediaType] = useState<{ [key: string]: "photo" | "video" }>({});

  async function load() {
    setLoading(true);
    const res = await fetch("/api/admin/archive");
    const data: ArchiveItem[] = await res.json();
    setArchives(data);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    await fetch("/api/admin/archive", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ year, title, description }),
    });
    setTitle("");
    setDescription("");
    load();
  }

  async function handleAddMedia(archiveId: string) {
    const url = mediaUrl[archiveId];
    if (!url) return;
    const type = mediaType[archiveId] ?? "photo";

    const res = await fetch(`/api/admin/archive/${archiveId}/photos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url, type }),
    });

    if (!res.ok) {
      alert("Failed to add — check the URL and try again.");
      return;
    }

    setMediaUrl({ ...mediaUrl, [archiveId]: "" });
    load();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this year's archive and all its photos?")) return;
    await fetch(`/api/admin/archive/${id}`, { method: "DELETE" });
    load();
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">🗂️ Manage Archive</h1>

      <form onSubmit={handleCreate} className="border rounded-xl p-5 mb-8 space-y-3">
        <h2 className="font-semibold">Add a Past Year</h2>
        <input
          type="number"
          placeholder="Year"
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          className="w-full border rounded-lg px-3 py-2"
          required
        />
        <input
          type="text"
          placeholder="Title (e.g. Dhol Mela 2025)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border rounded-lg px-3 py-2"
          required
        />
        <textarea
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 h-20"
        />
        <button className="bg-orange-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-orange-700">
          Add Year
        </button>
      </form>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        <div className="space-y-6">
          {archives.map((a: ArchiveItem) => (
            <div key={a.id} className="border rounded-xl p-5">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-bold text-lg">
                    {a.title} ({a.year})
                  </h3>
                  {a.description && <p className="text-gray-600 text-sm">{a.description}</p>}
                </div>
                <button
                  onClick={() => handleDelete(a.id)}
                  className="text-sm text-red-600 border border-red-300 rounded-lg px-3 py-1 hover:bg-red-50"
                >
                  Delete
                </button>
              </div>

              <div className="grid grid-cols-4 gap-2 mb-3">
                {a.photos.map((p: Photo) => (
                  p.type === "video" ? (
                    <div key={p.id} className="w-full aspect-square bg-gray-900 rounded-lg flex items-center justify-center text-white text-2xl">
                      ▶️
                    </div>
                  ) : (
                    <img
                      key={p.id}
                      src={p.url}
                      alt={p.caption ?? ""}
                      className="w-full aspect-square object-cover rounded-lg"
                    />
                  )
                ))}
              </div>

              <div className="flex gap-2 mb-2">
                <button
                  type="button"
                  onClick={() => setMediaType({ ...mediaType, [a.id]: "photo" })}
                  className={`px-3 py-1 rounded-lg text-sm border ${(mediaType[a.id] ?? "photo") === "photo" ? "bg-orange-600 text-white border-orange-600" : "hover:bg-gray-50"}`}
                >
                  📷 Photo
                </button>
                <button
                  type="button"
                  onClick={() => setMediaType({ ...mediaType, [a.id]: "video" })}
                  className={`px-3 py-1 rounded-lg text-sm border ${mediaType[a.id] === "video" ? "bg-orange-600 text-white border-orange-600" : "hover:bg-gray-50"}`}
                >
                  🎥 Video
                </button>
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder={mediaType[a.id] === "video" ? "Paste video URL (YouTube or .mp4 link)" : "Paste photo URL"}
                  value={mediaUrl[a.id] ?? ""}
                  onChange={(e) => setMediaUrl({ ...mediaUrl, [a.id]: e.target.value })}
                  className="flex-1 border rounded-lg px-3 py-2 text-sm"
                />
                <button
                  onClick={() => handleAddMedia(a.id)}
                  className="px-4 py-2 rounded-lg border text-sm hover:bg-gray-50"
                >
                  Add
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}