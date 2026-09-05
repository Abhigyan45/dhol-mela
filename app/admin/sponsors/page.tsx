"use client";

import { useEffect, useState } from "react";

type S = { id: string; name: string; logoUrl: string | null; contribution: string | null; order: number };

export default function AdminSponsors() {
  const [items, setItems] = useState<S[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [contribution, setContribution] = useState("");
  const [order, setOrder] = useState(0);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/admin/sponsors");
    setItems(await res.json());
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await fetch("/api/admin/sponsors", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, logoUrl, contribution, order }),
    });
    setName(""); setLogoUrl(""); setContribution(""); setOrder(0);
    load();
  }

  async function handleDelete(id: string) {
    if (!confirm("Remove this sponsor?")) return;
    await fetch(`/api/admin/sponsors/${id}`, { method: "DELETE" });
    load();
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">🤝 Sponsors</h1>

      <form onSubmit={handleSubmit} className="border rounded-xl p-5 mb-8 space-y-3">
        <input type="text" placeholder="Sponsor name" value={name} onChange={(e) => setName(e.target.value)} className="w-full border rounded-lg px-3 py-2" required />
        <input type="text" placeholder="Logo URL (optional)" value={logoUrl} onChange={(e) => setLogoUrl(e.target.value)} className="w-full border rounded-lg px-3 py-2" />
        <input type="text" placeholder="Contribution (e.g. Gold Sponsor)" value={contribution} onChange={(e) => setContribution(e.target.value)} className="w-full border rounded-lg px-3 py-2" />
        <input type="number" placeholder="Display order" value={order} onChange={(e) => setOrder(Number(e.target.value))} className="w-full border rounded-lg px-3 py-2" />
        <button className="bg-orange-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-orange-700">Add Sponsor</button>
      </form>

      {loading ? <p className="text-gray-500">Loading...</p> : (
        <div className="space-y-3">
          {items.map((s: S) => (
            <div key={s.id} className="border rounded-xl p-4 flex justify-between items-center gap-4">
              <div className="flex items-center gap-3">
                {s.logoUrl && <img src={s.logoUrl} alt={s.name} className="w-10 h-10 object-contain rounded" />}
                <div>
                  <p className="font-semibold">{s.name}</p>
                  {s.contribution && <p className="text-sm text-gray-500">{s.contribution}</p>}
                </div>
              </div>
              <button onClick={() => handleDelete(s.id)} className="text-sm px-3 py-1 rounded-lg border border-red-300 text-red-600 hover:bg-red-50">Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}