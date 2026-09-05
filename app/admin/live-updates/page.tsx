"use client";

import { useEffect, useState } from "react";

type Update = { id: string; timeLabel: string; message: string; createdAt: string };

export default function AdminLiveUpdates() {
  const [updates, setUpdates] = useState<Update[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeLabel, setTimeLabel] = useState("");
  const [message, setMessage] = useState("");

  async function load() {
    setLoading(true);
    const res = await fetch("/api/admin/live-updates");
    setUpdates(await res.json());
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await fetch("/api/admin/live-updates", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ timeLabel, message }),
    });
    setTimeLabel("");
    setMessage("");
    load();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this update?")) return;
    await fetch(`/api/admin/live-updates/${id}`, { method: "DELETE" });
    load();
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">🔴 Live Updates</h1>
      <p className="text-gray-600 text-sm mb-6">
        Post these as things happen on mela day — visitors following along will see them appear automatically.
      </p>

      <form onSubmit={handleSubmit} className="border rounded-xl p-5 mb-8 flex gap-3">
        <input
          type="text"
          placeholder="Time (e.g. 10:00 AM)"
          value={timeLabel}
          onChange={(e) => setTimeLabel(e.target.value)}
          className="w-36 border rounded-lg px-3 py-2"
          required
        />
        <input
          type="text"
          placeholder="What's happening"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 border rounded-lg px-3 py-2"
          required
        />
        <button className="bg-orange-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-orange-700">
          Post
        </button>
      </form>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : updates.length === 0 ? (
        <p className="text-gray-500">No updates posted yet.</p>
      ) : (
        <div className="space-y-3">
          {updates.map((u) => (
            <div key={u.id} className="border rounded-xl p-4 flex justify-between items-start gap-4">
              <div>
                <p className="text-orange-600 font-semibold text-sm">{u.timeLabel}</p>
                <p className="text-gray-700">{u.message}</p>
              </div>
              <button onClick={() => handleDelete(u.id)} className="text-sm px-3 py-1 rounded-lg border border-red-300 text-red-600 hover:bg-red-50">
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}