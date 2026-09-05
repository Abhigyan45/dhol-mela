"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";

type Update = { id: string; timeLabel: string; message: string };

export default function LivePage() {
  const [updates, setUpdates] = useState<Update[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/live-updates");
        setUpdates(await res.json());
      } catch {
        // fail silently, keep last known updates
      }
    }
    load();
    const interval = setInterval(load, 15000); // faster poll — 15s — since this matters most in-the-moment
    return () => clearInterval(interval);
  }, []);

  return (
    <main>
      <Navbar />
      <section className="max-w-2xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
          <span className="inline-block w-3 h-3 rounded-full bg-red-600 animate-pulse" />
          Live Updates
        </h1>
        <p className="text-gray-600 mb-8">Real-time updates from the mela ground, October 15, 2026.</p>

        {updates.length === 0 ? (
          <p className="text-gray-500">No live updates yet — check back once the mela begins.</p>
        ) : (
          <div className="space-y-4">
            {updates.map((u) => (
              <div key={u.id} className="border-l-4 border-orange-600 pl-4 py-1">
                <p className="text-orange-600 font-semibold text-sm">{u.timeLabel}</p>
                <p className="text-gray-800">{u.message}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}