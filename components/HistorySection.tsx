"use client";

import { useLanguage } from "@/context/LanguageContext";

const content = {
  en: { heading: "📜 History of Our Dhol Mela", body: "The Songadhwa Akhra No-7 Dol Mela has been a symbol of unity, bravery, and devotion for generations — read the full story.", link: "Read full history →" },
  hi: { heading: "📜 हमारे ढोल मेले का इतिहास", body: "सोंगढ़वा अखाड़ा नंबर 7 ढोल मेला पीढ़ियों से एकता, वीरता और भक्ति का प्रतीक रहा है — पूरी कहानी पढ़ें।", link: "पूरा इतिहास पढ़ें →" },
};

export default function HistorySection() {
  const { lang } = useLanguage();
  const t = content[lang];

  return (
    <section className="max-w-4xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold mb-4">{t.heading}</h2>
      <p className="text-gray-600 leading-relaxed">{t.body}</p>
      <a href="/history" className="inline-block mt-4 text-orange-600 font-medium hover:underline">
        {t.link}
      </a>
    </section>
  );
}