import Link from "next/link";

export default function AdminDashboard() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <p className="text-gray-600 mt-2 mb-6">Welcome — this is a protected page.</p>
      <div className="flex gap-4 flex-wrap">
        <Link href="/admin/news" className="px-4 py-2 rounded-lg bg-orange-600 text-white font-medium">Manage News</Link>
        <Link href="/admin/notifications" className="px-4 py-2 rounded-lg bg-orange-600 text-white font-medium">Manage Notifications</Link>
        <Link href="/admin/members" className="px-4 py-2 rounded-lg bg-orange-600 text-white font-medium">Manage Committee</Link>
        <Link href="/admin/archive" className="px-4 py-2 rounded-lg bg-orange-600 text-white font-medium">Manage Archive</Link>
        <Link href="/admin/gallery" className="px-4 py-2 rounded-lg bg-orange-600 text-white font-medium">Manage Gallery</Link>
        <Link href="/admin/contact" className="px-4 py-2 rounded-lg bg-orange-600 text-white font-medium">Contact Messages</Link>
        <Link href="/admin/live-updates" className="px-4 py-2 rounded-lg bg-orange-600 text-white font-medium">Live Updates</Link>
        <Link href="/admin/volunteers" className="px-4 py-2 rounded-lg bg-orange-600 text-white font-medium">Volunteers</Link>
        <Link href="/admin/sponsors" className="px-4 py-2 rounded-lg bg-orange-600 text-white font-medium">Sponsors</Link>
      </div>
    </div>
  );
}