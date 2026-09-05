"use client";

import { useEffect, useState } from "react";

type NewsItem = {
  id: string;
  title: string;
  summary: string;
  content: string | null;
  published: boolean;
  createdAt: string;
};

export default function AdminNews() {
  const [items, setItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  async function loadNews() {
    setLoading(true);
    const res = await fetch("/api/admin/news");
    const data = await res.json();
    setItems(data);
    setLoading(false);
  }

  useEffect(() => {
    loadNews();
  }, []);

  function resetForm() {
    setTitle("");
    setSummary("");
    setContent("");
    setEditingId(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (editingId) {
      await fetch(`/api/admin/news/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, summary, content, published: true }),
      });
    } else {
      await fetch("/api/admin/news", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, summary, content }),
      });
    }

    resetForm();
    loadNews();
  }

  function startEdit(item: NewsItem) {
    setEditingId(item.id);
    setTitle(item.title);
    setSummary(item.summary);
    setContent(item.content ?? "");
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this news item?")) return;
    await fetch(`/api/admin/news/${id}`, { method: "DELETE" });
    loadNews();
  }

  async function togglePublished(item: NewsItem) {
    await fetch(`/api/admin/news/${item.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: item.title,
        summary: item.summary,
        content: item.content,
        published: !item.published,
      }),
    });
    loadNews();
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">📰 Manage News</h1>

      <form onSubmit={handleSubmit} className="border rounded-xl p-5 mb-8 space-y-3">
        <h2 className="font-semibold">{editingId ? "Edit News Item" : "Add New Item"}</h2>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border rounded-lg px-3 py-2"
          required
        />
        <input
          type="text"
          placeholder="Short summary (shown on homepage)"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          className="w-full border rounded-lg px-3 py-2"
          required
        />
        <textarea
          placeholder="Full content (optional)"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 h-24"
        />
        <div className="flex gap-3">
          <button
            type="submit"
            className="bg-orange-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-orange-700"
          >
            {editingId ? "Save Changes" : "Add News"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="px-5 py-2 rounded-lg border font-medium hover:bg-gray-50"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : items.length === 0 ? (
        <p className="text-gray-500">No news items yet.</p>
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.id} className="border rounded-xl p-4 flex justify-between items-start gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">{item.title}</h3>
                  {!item.published && (
                    <span className="text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full">
                      Hidden
                    </span>
                  )}
                </div>
                <p className="text-gray-600 text-sm mt-1">{item.summary}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => togglePublished(item)}
                  className="text-sm px-3 py-1 rounded-lg border hover:bg-gray-50"
                >
                  {item.published ? "Hide" : "Show"}
                </button>
                <button
                  onClick={() => startEdit(item)}
                  className="text-sm px-3 py-1 rounded-lg border hover:bg-gray-50"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-sm px-3 py-1 rounded-lg border border-red-300 text-red-600 hover:bg-red-50"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}