"use client";

import { useEffect, useState } from "react";

type Rule = { id: string; textEn: string; textHi: string | null; category: string; order: number };

const categories = [
  { value: "safety", label: "🚨 Safety" },
  { value: "conduct", label: "🙏 Conduct" },
  { value: "general", label: "📋 General" },
];

export default function AdminRules() {
  const [rules, setRules] = useState<Rule[]>([]);
  const [loading, setLoading] = useState(true);
  const [textEn, setTextEn] = useState("");
  const [textHi, setTextHi] = useState("");
  const [category, setCategory] = useState("safety");
  const [order, setOrder] = useState(0);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/admin/rules");
    setRules(await res.json());
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await fetch("/api/admin/rules", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ textEn, textHi, category, order }),
    });
    setTextEn("");
    setTextHi("");
    setOrder(0);
    load();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this rule?")) return;
    await fetch(`/api/admin/rules/${id}`, { method: "DELETE" });
    load();
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">🚨 Rules & Safety</h1>

      <form onSubmit={handleSubmit} className="border rounded-xl p-5 mb-8 space-y-3">
        <label className="block text-sm font-medium text-gray-700">Rule text (English)</label>
        <textarea
          placeholder="e.g. No alcohol allowed on the mela grounds"
          value={textEn}
          onChange={(e) => setTextEn(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 h-20"
          required
        />
        <label className="block text-sm font-medium text-gray-700">Rule text (Hindi — optional, falls back to English if left blank)</label>
        <textarea
          placeholder="जैसे: मेला मैदान में शराब की अनुमति नहीं है"
          value={textHi}
          onChange={(e) => setTextHi(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 h-20"
        />
        <div className="flex gap-3">
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="flex-1 border rounded-lg px-3 py-2">
            {categories.map((c) => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
          <input
            type="number"
            placeholder="Order"
            value={order}
            onChange={(e) => setOrder(Number(e.target.value))}
            className="w-28 border rounded-lg px-3 py-2"
          />
        </div>
        <button className="bg-orange-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-orange-700">
          Add Rule
        </button>
      </form>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : rules.length === 0 ? (
        <p className="text-gray-500">No rules added yet.</p>
      ) : (
        <div className="space-y-3">
          {rules.map((r) => (
            <div key={r.id} className="border rounded-xl p-4 flex justify-between items-start gap-4">
              <div>
                <span className="text-xs uppercase text-gray-400">{r.category}</span>
                <p className="text-gray-800">{r.textEn}</p>
                {r.textHi && <p className="text-gray-500 text-sm mt-1">हिं: {r.textHi}</p>}
              </div>
              <button onClick={() => handleDelete(r.id)} className="text-sm px-3 py-1 rounded-lg border border-red-300 text-red-600 hover:bg-red-50 shrink-0">
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}