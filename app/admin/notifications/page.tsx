"use client";

import { useEffect, useState } from "react";

type NotificationItem = {
  id: string;
  message: string;
  active: boolean;
  createdAt: string;
};

export default function AdminNotifications() {
  const [items, setItems] = useState<NotificationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  async function load() {
    setLoading(true);
    const res = await fetch("/api/admin/notifications");
    setItems(await res.json());
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await fetch("/api/admin/notifications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });
    setMessage("");
    load();
  }

  async function toggleActive(item: NotificationItem) {
    await fetch(`/api/admin/notifications/${item.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: item.message, active: !item.active }),
    });
    load();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this notification?")) return;
    await fetch(`/api/admin/notifications/${id}`, { method: "DELETE" });
    load();
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">📢 Manage Notifications</h1>

      <form onSubmit={handleSubmit} className="border rounded-xl p-5 mb-8 flex gap-3">
        <input
          type="text"
          placeholder="Notification message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 border rounded-lg px-3 py-2"
          required
        />
        <button className="bg-orange-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-orange-700">
          Add
        </button>
      </form>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : items.length === 0 ? (
        <p className="text-gray-500">No notifications yet.</p>
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.id} className="border rounded-xl p-4 flex justify-between items-center gap-4">
              <p className={!item.active ? "text-gray-400" : ""}>{item.message}</p>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => toggleActive(item)} className="text-sm px-3 py-1 rounded-lg border hover:bg-gray-50">
                  {item.active ? "Deactivate" : "Activate"}
                </button>
                <button onClick={() => handleDelete(item.id)} className="text-sm px-3 py-1 rounded-lg border border-red-300 text-red-600 hover:bg-red-50">
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