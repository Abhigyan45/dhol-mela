"use client";

import { useEffect, useState } from "react";

export default function AdminDonationSettings() {
  const [upiId, setUpiId] = useState("");
  const [payeeName, setPayeeName] = useState("");
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/admin/donation-settings");
      const data = await res.json();
      if (data) {
        setUpiId(data.upiId ?? "");
        setPayeeName(data.payeeName ?? "");
      }
      setLoading(false);
    }
    load();
  }, []);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaved(false);
    await fetch("/api/admin/donation-settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ upiId, payeeName }),
    });
    setSaved(true);
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">💰 Donation Settings</h1>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        <form onSubmit={handleSave} className="border rounded-xl p-5 space-y-3">
          <label className="block text-sm font-medium text-gray-700">UPI ID</label>
          <input
            type="text"
            placeholder="yourname@bank"
            value={upiId}
            onChange={(e) => setUpiId(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 font-mono"
            required
          />
          <label className="block text-sm font-medium text-gray-700">Payee Display Name</label>
          <input
            type="text"
            placeholder="Songadhwa Akhra No. 7 Committee"
            value={payeeName}
            onChange={(e) => setPayeeName(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
            required
          />
          <p className="text-xs text-gray-500">
            This UPI ID and name are shown on the public Donate page and encoded into the QR code.
          </p>
          <button className="bg-orange-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-orange-700">
            Save
          </button>
          {saved && <p className="text-green-600 text-sm">✓ Saved</p>}
        </form>
      )}
    </div>
  );
}