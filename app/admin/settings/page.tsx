"use client";

import { useEffect, useState } from "react";

export default function AdminSettings() {
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/admin/mela-settings");
      const data = await res.json();
      if (data.melaDate) {
        // Convert to yyyy-MM-ddThh:mm format for the datetime-local input
        const d = new Date(data.melaDate);
        const local = new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
        setDate(local);
      }
      setLoading(false);
    }
    load();
  }, []);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaved(false);
    await fetch("/api/admin/mela-settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ melaDate: date }),
    });
    setSaved(true);
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">⚙️ Mela Settings</h1>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        <form onSubmit={handleSave} className="border rounded-xl p-5 space-y-3">
          <label className="block text-sm font-medium text-gray-700">
            Mela Date & Start Time
          </label>
          <input
            type="datetime-local"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
            required
          />
          <p className="text-xs text-gray-500">
            This controls the countdown timer and the date shown on the homepage.
          </p>
          <button className="bg-orange-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-orange-700">
            Save Date
          </button>
          {saved && <p className="text-green-600 text-sm">✓ Saved</p>}
        </form>
      )}
    </div>
  );
}