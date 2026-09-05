"use client";

import { useEffect, useState } from "react";

type NotificationItem = {
  id: string;
  message: string;
};

export default function NotificationBanner() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/notifications");
        const data = await res.json();
        setNotifications(data);
      } catch {
        // fail silently — banner just stays as-is if a poll fails
      }
    }

    load(); // initial load
    const interval = setInterval(load, 30000); // poll every 30s
    return () => clearInterval(interval);
  }, []);

  if (notifications.length === 0) return null;

  return (
    <div className="bg-orange-600 text-white text-sm">
      <div className="max-w-6xl mx-auto px-4 py-2 space-y-1">
        {notifications.map((n) => (
          <p key={n.id}>📢 {n.message}</p>
        ))}
      </div>
    </div>
  );
}