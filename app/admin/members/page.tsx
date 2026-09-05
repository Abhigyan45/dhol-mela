"use client";

import { useEffect, useState } from "react";

type MemberItem = {
  id: string;
  name: string;
  role: string;
  photoUrl: string | null;
  order: number;
};

export default function AdminMembers() {
  const [items, setItems] = useState<MemberItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [order, setOrder] = useState(0);
  const [editingId, setEditingId] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/admin/members");
    setItems(await res.json());
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  function resetForm() {
    setName("");
    setRole("");
    setOrder(0);
    setEditingId(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (editingId) {
      await fetch(`/api/admin/members/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, role, order }),
      });
    } else {
      await fetch("/api/admin/members", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, role, order }),
      });
    }
    resetForm();
    load();
  }

  function startEdit(item: MemberItem) {
    setEditingId(item.id);
    setName(item.name);
    setRole(item.role);
    setOrder(item.order);
  }

  async function handleDelete(id: string) {
    if (!confirm("Remove this committee member?")) return;
    await fetch(`/api/admin/members/${id}`, { method: "DELETE" });
    load();
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">👥 Manage Committee Members</h1>

      <form onSubmit={handleSubmit} className="border rounded-xl p-5 mb-8 space-y-3">
        <h2 className="font-semibold">{editingId ? "Edit Member" : "Add Member"}</h2>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full border rounded-lg px-3 py-2" required />
        <input type="text" placeholder="Role (e.g. President)" value={role} onChange={(e) => setRole(e.target.value)} className="w-full border rounded-lg px-3 py-2" required />
        <input type="number" placeholder="Display order (0 = first)" value={order} onChange={(e) => setOrder(Number(e.target.value))} className="w-full border rounded-lg px-3 py-2" />
        <div className="flex gap-3">
          <button className="bg-orange-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-orange-700">
            {editingId ? "Save Changes" : "Add Member"}
          </button>
          {editingId && (
            <button type="button" onClick={resetForm} className="px-5 py-2 rounded-lg border font-medium hover:bg-gray-50">
              Cancel
            </button>
          )}
        </div>
      </form>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : items.length === 0 ? (
        <p className="text-gray-500">No members yet.</p>
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.id} className="border rounded-xl p-4 flex justify-between items-center gap-4">
              <div>
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-gray-500">{item.role} · order {item.order}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => startEdit(item)} className="text-sm px-3 py-1 rounded-lg border hover:bg-gray-50">Edit</button>
                <button onClick={() => handleDelete(item.id)} className="text-sm px-3 py-1 rounded-lg border border-red-300 text-red-600 hover:bg-red-50">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}