// "use client";

// import { useEffect, useState } from "react";

// type NewsItem = {
//   id: string;
//   title: string;
//   summary: string;
//   content: string | null;
//   published: boolean;
//   createdAt: string;
// };

// export default function AdminNews() {
//   const [items, setItems] = useState<NewsItem[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [title, setTitle] = useState("");
//   const [summary, setSummary] = useState("");
//   const [content, setContent] = useState("");
//   const [editingId, setEditingId] = useState<string | null>(null);

//   async function loadNews() {
//     setLoading(true);
//     const res = await fetch("/api/admin/news");
//     const data = await res.json();
//     setItems(data);
//     setLoading(false);
//   }

//   useEffect(() => {
//     loadNews();
//   }, []);

//   function resetForm() {
//     setTitle("");
//     setSummary("");
//     setContent("");
//     setEditingId(null);
//   }

//   async function handleSubmit(e: React.FormEvent) {
//     e.preventDefault();

//     if (editingId) {
//       await fetch(`/api/admin/news/${editingId}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ title, summary, content, published: true }),
//       });
//     } else {
//       await fetch("/api/admin/news", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ title, summary, content }),
//       });
//     }

//     resetForm();
//     loadNews();
//   }

//   function startEdit(item: NewsItem) {
//     setEditingId(item.id);
//     setTitle(item.title);
//     setSummary(item.summary);
//     setContent(item.content ?? "");
//   }

//   async function handleDelete(id: string) {
//     if (!confirm("Delete this news item?")) return;
//     await fetch(`/api/admin/news/${id}`, { method: "DELETE" });
//     loadNews();
//   }

//   async function togglePublished(item: NewsItem) {
//     await fetch(`/api/admin/news/${item.id}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         title: item.title,
//         summary: item.summary,
//         content: item.content,
//         published: !item.published,
//       }),
//     });
//     loadNews();
//   }

//   return (
//     <div className="max-w-3xl mx-auto p-6">
//       <h1 className="text-2xl font-bold mb-6">📰 Manage News</h1>

//       <form onSubmit={handleSubmit} className="border rounded-xl p-5 mb-8 space-y-3">
//         <h2 className="font-semibold">{editingId ? "Edit News Item" : "Add New Item"}</h2>
//         <input
//           type="text"
//           placeholder="Title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           className="w-full border rounded-lg px-3 py-2"
//           required
//         />
//         <input
//           type="text"
//           placeholder="Short summary (shown on homepage)"
//           value={summary}
//           onChange={(e) => setSummary(e.target.value)}
//           className="w-full border rounded-lg px-3 py-2"
//           required
//         />
//         <textarea
//           placeholder="Full content (optional)"
//           value={content}
//           onChange={(e) => setContent(e.target.value)}
//           className="w-full border rounded-lg px-3 py-2 h-24"
//         />
//         <div className="flex gap-3">
//           <button
//             type="submit"
//             className="bg-orange-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-orange-700"
//           >
//             {editingId ? "Save Changes" : "Add News"}
//           </button>
//           {editingId && (
//             <button
//               type="button"
//               onClick={resetForm}
//               className="px-5 py-2 rounded-lg border font-medium hover:bg-gray-50"
//             >
//               Cancel
//             </button>
//           )}
//         </div>
//       </form>

//       {loading ? (
//         <p className="text-gray-500">Loading...</p>
//       ) : items.length === 0 ? (
//         <p className="text-gray-500">No news items yet.</p>
//       ) : (
//         <div className="space-y-3">
//           {items.map((item) => (
//             <div key={item.id} className="border rounded-xl p-4 flex justify-between items-start gap-4">
//               <div>
//                 <div className="flex items-center gap-2">
//                   <h3 className="font-semibold">{item.title}</h3>
//                   {!item.published && (
//                     <span className="text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full">
//                       Hidden
//                     </span>
//                   )}
//                 </div>
//                 <p className="text-gray-600 text-sm mt-1">{item.summary}</p>
//               </div>
//               <div className="flex gap-2 shrink-0">
//                 <button
//                   onClick={() => togglePublished(item)}
//                   className="text-sm px-3 py-1 rounded-lg border hover:bg-gray-50"
//                 >
//                   {item.published ? "Hide" : "Show"}
//                 </button>
//                 <button
//                   onClick={() => startEdit(item)}
//                   className="text-sm px-3 py-1 rounded-lg border hover:bg-gray-50"
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => handleDelete(item.id)}
//                   className="text-sm px-3 py-1 rounded-lg border border-red-300 text-red-600 hover:bg-red-50"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import { Newspaper, PlayCircle, Image as ImageIcon, Video, Trash2, Pencil, Eye, EyeOff, X } from "lucide-react";

type NewsItem = {
  id: string;
  title: string;
  summary: string;
  content: string | null;
  published: boolean;
  mediaType: string | null;
  mediaUrl: string | null;
  createdAt: string;
};

export default function AdminNews() {
  const [items, setItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function loadNews() {
    setLoading(true);
    const res = await fetch("/api/admin/news");
    const data = await res.json();
    setItems(data);
    setLoading(false);
  }

  useEffect(() => {
    loadNews();
  }, []);

  function resetForm() {
    setTitle(""); setSummary(""); setContent(""); setYoutubeUrl("");
    setFile(null); setEditingId(null); setError("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("summary", summary);
    formData.append("content", content);
    if (file) formData.append("file", file);
    if (youtubeUrl) formData.append("youtubeUrl", youtubeUrl);

    let res;
    if (editingId) {
      formData.append("published", "true");
      res = await fetch(`/api/admin/news/${editingId}`, { method: "PUT", body: formData });
    } else {
      res = await fetch("/api/admin/news", { method: "POST", body: formData });
    }

    if (res.ok) {
      resetForm();
      loadNews();
    } else {
      const data = await res.json();
      setError(data.error || "Something went wrong");
    }
    setSaving(false);
  }

  function startEdit(item: NewsItem) {
    setEditingId(item.id);
    setTitle(item.title);
    setSummary(item.summary);
    setContent(item.content ?? "");
    setYoutubeUrl(item.mediaType === "youtube" && item.mediaUrl ? `https://youtu.be/${item.mediaUrl}` : "");
    setFile(null);
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this news item?")) return;
    await fetch(`/api/admin/news/${id}`, { method: "DELETE" });
    loadNews();
  }

  async function togglePublished(item: NewsItem) {
    const formData = new FormData();
    formData.append("title", item.title);
    formData.append("summary", item.summary);
    formData.append("content", item.content ?? "");
    formData.append("published", String(!item.published));
    await fetch(`/api/admin/news/${item.id}`, { method: "PUT", body: formData });
    loadNews();
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-ivory min-h-screen">
      <div className="flex items-center gap-3 mb-6">
        <Newspaper className="text-gold w-7 h-7" />
        <h1 className="text-2xl font-bold text-maroon">Manage News</h1>
      </div>

      <form onSubmit={handleSubmit} className="card p-5 mb-8 space-y-3">
        <h2 className="font-semibold text-charcoal">{editingId ? "Edit News Item" : "Add New Item"}</h2>
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-maroon-light/25 rounded-lg px-3 py-2" required />
        <input type="text" placeholder="Short summary (shown on homepage)" value={summary} onChange={(e) => setSummary(e.target.value)}
          className="w-full border border-maroon-light/25 rounded-lg px-3 py-2" required />
        <textarea placeholder="Full content (optional)" value={content} onChange={(e) => setContent(e.target.value)}
          className="w-full border border-maroon-light/25 rounded-lg px-3 py-2 h-24" />

        <div className="border-t border-maroon-light/15 pt-3 space-y-2">
          <p className="text-sm text-charcoal/60 flex items-center gap-2">
            <ImageIcon className="w-4 h-4 text-gold" /> Upload a photo or video (optional)
          </p>
          <input type="file" accept="image/*,video/*" onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            className="w-full text-sm" />

          <p className="text-sm text-charcoal/60 flex items-center gap-2 mt-2">
            <PlayCircle className="w-4 h-4 text-gold" /> Or paste a YouTube link instead
          </p>
          <input type="url" placeholder="https://youtube.com/watch?v=..." value={youtubeUrl}
            onChange={(e) => setYoutubeUrl(e.target.value)}
            className="w-full border border-maroon-light/25 rounded-lg px-3 py-2" />
        </div>

        <div className="flex gap-3 pt-1">
          <button type="submit" disabled={saving}
            className="bg-maroon text-white px-5 py-2 rounded-lg font-medium hover:bg-maroon-dark disabled:opacity-50">
            {saving ? "Saving..." : editingId ? "Save Changes" : "Add News"}
          </button>
          {editingId && (
            <button type="button" onClick={resetForm}
              className="px-5 py-2 rounded-lg border border-maroon-light/25 font-medium hover:bg-black/5">
              Cancel
            </button>
          )}
        </div>
        {error && <p className="text-red-600 text-sm">{error}</p>}
      </form>

      {loading ? (
        <p className="text-charcoal/50">Loading...</p>
      ) : items.length === 0 ? (
        <p className="text-charcoal/50">No news items yet.</p>
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.id} className="card p-4 flex justify-between items-start gap-4">
              <div className="flex gap-3 flex-1">
                {item.mediaType === "photo" && item.mediaUrl && (
                  <img src={item.mediaUrl} className="w-16 h-16 object-cover rounded-lg shrink-0" />
                )}
                {item.mediaType === "video" && (
                  <div className="w-16 h-16 bg-charcoal/10 rounded-lg flex items-center justify-center shrink-0">
                    <Video className="w-6 h-6 text-maroon-light" />
                  </div>
                )}
                {item.mediaType === "youtube" && (
                  <div className="w-16 h-16 bg-charcoal/10 rounded-lg flex items-center justify-center shrink-0">
                    <PlayCircle className="w-6 h-6 text-red-500" />
                  </div>
                )}
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-charcoal">{item.title}</h3>
                    {!item.published && (
                      <span className="text-xs bg-charcoal/10 text-charcoal/60 px-2 py-0.5 rounded-full">Hidden</span>
                    )}
                  </div>
                  <p className="text-charcoal/60 text-sm mt-1">{item.summary}</p>
                </div>
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => togglePublished(item)} className="text-sm p-2 rounded-lg border border-maroon-light/25 hover:bg-black/5">
                  {item.published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
                <button onClick={() => startEdit(item)} className="text-sm p-2 rounded-lg border border-maroon-light/25 hover:bg-black/5">
                  <Pencil className="w-4 h-4" />
                </button>
                <button onClick={() => handleDelete(item.id)} className="text-sm p-2 rounded-lg border border-red-300 text-red-600 hover:bg-red-50">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}