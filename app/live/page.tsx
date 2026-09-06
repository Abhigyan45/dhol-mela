"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { useLanguage } from "@/context/LanguageContext";

const content = {
  en: { heading: "Live Updates", sub: "Real-time updates from the mela ground, October 15, 2026.", empty: "No live updates yet — check back once the mela begins." },
  hi: { heading: "लाइव अपडेट", sub: "15 अक्टूबर 2026 को मेला स्थल से रीयल-टाइम अपडेट।", empty: "अभी कोई लाइव अपडेट नहीं — मेला शुरू होने पर देखें।" },
};

type Update = { id: string; timeLabel: string; message: string };

export default function LivePage() {
  const { lang } = useLanguage();
  const t = content[lang];
  const [updates, setUpdates] = useState<Update[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/live-updates");
        setUpdates(await res.json());
      } catch {}
    }
    load();
    const interval = setInterval(load, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main>
      <Navbar />
      <section className="max-w-2xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
          <span className="inline-block w-3 h-3 rounded-full bg-red-600 animate-pulse" />
          {t.heading}
        </h1>
        <p className="text-gray-600 mb-8">{t.sub}</p>
        {updates.length === 0 ? (
          <p className="text-gray-500">{t.empty}</p>
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