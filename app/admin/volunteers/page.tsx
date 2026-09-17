"use client";

import { useEffect, useState } from "react";

type V = {
  id: string; name: string; phone: string; village: string | null; interest: string | null;
  status: string; uniqueId: string | null; createdAt: string;
};

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

  async function updateStatus(id: string, status: string) {
    await fetch(`/api/admin/volunteers/${id}/status`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    load();
  }

  async function handleDelete(id: string) {
    if (!confirm("Remove this volunteer entry?")) return;
    await fetch(`/api/admin/volunteers/${id}`, { method: "DELETE" });
    load();
  }

  function whatsappSendUrl(v: V) {
    const idUrl = `${window.location.origin}/volunteer-id/${v.uniqueId}`;
    const message = `Namaste ${v.name}, aapka Songadhwa Akhra No. 7 volunteer ID approved ho gaya hai. Apna ID card yahan se download karein: ${idUrl}`;
    const cleanPhone = v.phone.replace(/\D/g, "");
    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
  }

  const statusColors: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-700",
    approved: "bg-green-100 text-green-700",
    rejected: "bg-red-100 text-red-700",
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">🙋 Volunteers</h1>
      {loading ? <p className="text-gray-500">Loading...</p> : items.length === 0 ? (
        <p className="text-gray-500">No volunteers yet.</p>
      ) : (
        <div className="space-y-3">
          {items.map((v) => (
            <div key={v.id} className="border rounded-xl p-4">
              <div className="flex justify-between items-start gap-4 mb-2">
                <div>
                  <p className="font-semibold">{v.name} — {v.phone}</p>
                  {v.village && <p className="text-sm text-gray-500">{v.village}</p>}
                  {v.interest && <p className="text-sm text-gray-700 mt-1">{v.interest}</p>}
                  {v.uniqueId && <p className="text-xs font-mono text-gray-400 mt-1">{v.uniqueId}</p>}
                </div>
                <span className={`text-xs px-2 py-1 rounded-full font-medium shrink-0 ${statusColors[v.status]}`}>
                  {v.status}
                </span>
              </div>
              <div className="flex gap-2 flex-wrap">
                {v.status !== "approved" && (
                  <button onClick={() => updateStatus(v.id, "approved")} className="text-sm px-3 py-1 rounded-lg border border-green-300 text-green-700 hover:bg-green-50">
                    Approve
                  </button>
                )}
                {v.status !== "rejected" && (
                  <button onClick={() => updateStatus(v.id, "rejected")} className="text-sm px-3 py-1 rounded-lg border border-red-300 text-red-600 hover:bg-red-50">
                    Reject
                  </button>
                )}
                {v.status === "approved" && v.uniqueId && (
                  <a
                  href={whatsappSendUrl(v)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm px-3 py-1 rounded-lg bg-green-600 text-white hover:bg-green-700"
                >
                   📤 Send via WhatsApp
                  </a>
                )}
                <button onClick={() => handleDelete(v.id)} className="text-sm px-3 py-1 rounded-lg border hover:bg-gray-50 text-gray-500">
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