"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

type NotificationItem = { id: string; message: string };

export default function NotificationBanner() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const { lang } = useLanguage();

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
    <div className="bg-orange-600 text-white text-sm">
      <div className="max-w-6xl mx-auto px-4 py-2 space-y-1">
        {notifications.map((n) => (
          <p key={n.id}>{lang === "en" ? "📢" : "📢"} {n.message}</p>
        ))}
      </div>
    </div>
  );
}