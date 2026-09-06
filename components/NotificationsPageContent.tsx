"use client";

import { useLanguage } from "@/context/LanguageContext";

const content = {
  en: { heading: "📢 Notifications", empty: "No notifications right now." },
  hi: { heading: "📢 सूचनाएं", empty: "अभी कोई सूचना नहीं है।" },
};

type Notification = { id: string; message: string; createdAt: string | Date };

export default function NotificationsPageContent({ notifications }: { notifications: Notification[] }) {
  const { lang } = useLanguage();
  const t = content[lang];

  return (
    <section className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8">{t.heading}</h1>
      {notifications.length === 0 ? (
        <p className="text-gray-500">{t.empty}</p>
      ) : (
        <div className="space-y-3">
          {notifications.map((n) => (
            <div key={n.id} className="border-l-4 border-orange-600 bg-orange-50 rounded-r-lg p-4">
              <p className="text-sm text-gray-400 mb-1">{new Date(n.createdAt).toLocaleDateString()}</p>
              <p className="text-gray-800">{n.message}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}