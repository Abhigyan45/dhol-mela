"use client";

import { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

type NotificationItem = { id: string; message: string };

const labels = {
  en: { title: "NOTIFICATIONS", live: "LIVE" },
  hi: { title: "सूचनाएं", live: "लाइव" },
};

export default function NotificationBanner() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const { lang } = useLanguage();
  const t = labels[lang];

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/notifications");
        const data = await res.json();
        setNotifications(data);
      } catch {
        // fail silently
      }
    }
    load();
    const interval = setInterval(load, 30000);
    return () => clearInterval(interval);
  }, []);

  if (notifications.length === 0) return null;

  return (
    <div className="bg-maroon text-white flex items-stretch overflow-hidden">
      <div className="flex items-center gap-2 bg-maroon-dark px-4 py-2 shrink-0 z-10">
        <Bell className="w-4 h-4 text-gold" />
        <span className="text-xs font-bold tracking-wide hidden sm:inline">{t.title}</span>
        <span className="flex items-center gap-1 bg-green-600/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          {t.live}
        </span>
      </div>

      <div className="flex-1 overflow-hidden flex items-center">
        <div className="marquee-track">
          {[0, 1].map((rep) => (
            <div key={rep} className="flex items-center whitespace-nowrap">
              {notifications.map((n, i) => (
                <span key={`${rep}-${n.id}`} className="text-sm px-6 py-2 flex items-center gap-6">
                  {n.message}
                  {i < notifications.length - 1 && <span className="text-gold">•</span>}
                </span>
              ))}
              <span className="text-gold px-6">•</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}