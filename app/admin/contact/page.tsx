"use client";

import { useEffect, useState } from "react";

type Message = {
  id: string;
  name: string;
  email: string | null;
  message: string;
  read: boolean;
  createdAt: string;
};

export default function AdminContact() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/admin/contact");
    setMessages(await res.json());
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function toggleRead(m: Message) {
    await fetch(`/api/admin/contact/${m.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ read: !m.read }),
    });
    load();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this message?")) return;
    await fetch(`/api/admin/contact/${id}`, { method: "DELETE" });
    load();
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">📬 Contact Messages</h1>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : messages.length === 0 ? (
        <p className="text-gray-500">No messages yet.</p>
      ) : (
        <div className="space-y-3">
          {messages.map((m) => (
            <div key={m.id} className={`border rounded-xl p-4 ${!m.read ? "bg-orange-50" : ""}`}>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-semibold">{m.name} {!m.read && <span className="text-xs text-orange-600 ml-2">NEW</span>}</p>
                  {m.email && <p className="text-sm text-gray-500">{m.email}</p>}
                </div>
                <p className="text-xs text-gray-400">{new Date(m.createdAt).toLocaleString()}</p>
              </div>
              <p className="text-gray-700 text-sm mb-3">{m.message}</p>
              <div className="flex gap-2">
                <button onClick={() => toggleRead(m)} className="text-sm px-3 py-1 rounded-lg border hover:bg-gray-50">
                  {m.read ? "Mark unread" : "Mark read"}
                </button>
                <button onClick={() => handleDelete(m.id)} className="text-sm px-3 py-1 rounded-lg border border-red-300 text-red-600 hover:bg-red-50">
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