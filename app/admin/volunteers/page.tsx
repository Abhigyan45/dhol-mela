"use client";

import { useEffect, useState } from "react";

type V = { id: string; name: string; phone: string; village: string | null; interest: string | null; createdAt: string };

export default function AdminVolunteers() {
  const [items, setItems] = useState<V[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/admin/volunteers");
    setItems(await res.json());
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function handleDelete(id: string) {
    if (!confirm("Remove this volunteer entry?")) return;
    await fetch(`/api/admin/volunteers/${id}`, { method: "DELETE" });
    load();
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">🙋 Volunteers</h1>
      {loading ? <p className="text-gray-500">Loading...</p> : items.length === 0 ? (
        <p className="text-gray-500">No volunteers yet.</p>
      ) : (
        <div className="space-y-3">
          {items.map((v: V) => (
            <div key={v.id} className="border rounded-xl p-4 flex justify-between items-start gap-4">
              <div>
                <p className="font-semibold">{v.name} — {v.phone}</p>
                {v.village && <p className="text-sm text-gray-500">{v.village}</p>}
                {v.interest && <p className="text-sm text-gray-700 mt-1">{v.interest}</p>}
              </div>
              <button onClick={() => handleDelete(v.id)} className="text-sm px-3 py-1 rounded-lg border border-red-300 text-red-600 hover:bg-red-50">Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}