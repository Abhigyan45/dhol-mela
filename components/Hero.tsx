"use client";

import Countdown from "./Countdown";
import { useLanguage } from "@/context/LanguageContext";

const content = {
  en: {
    tagline: "Tradition • Culture • Unity",
    date: "📅 October 15, 2026",
    location: "📍 Songadhwa, Bairagitola, Gopalganj, Bihar",
    about: "About Mela",
    gallery: "Gallery",
    donate: "DONATE",
  },
  hi: {
    tagline: "परंपरा • संस्कृति • एकता",
    date: "📅 15 अक्टूबर 2026",
    location: "📍 सोंगढ़वा, बैरागीटोला, गोपालगंज, बिहार",
    about: "मेला के बारे में",
    gallery: "गैलरी",
    donate: "दान करें",
  },
};

export default function Hero() {
  const { lang } = useLanguage();
  const t = content[lang];

  return (
    <section
      className="relative py-20 px-4 text-center bg-cover bg-center"
      style={{ backgroundImage: "url('/images/banner.png')" }}
    >
      {/* Dark overlay for text readability over the photo */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Actual content sits above the overlay */}
      <div className="relative z-10">
        <p className="text-orange-400 font-semibold tracking-wide uppercase text-sm mb-3">
          {t.tagline}
        </p>
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 text-white">
          Songadhwa Akhra No-7 Dol Mela {new Date().getFullYear()}
        </h1>
        <p className="text-gray-200 mb-2">{t.date}</p>
        <p className="text-gray-200 mb-8">{t.location}</p>

        <div className="mb-8">
          <Countdown />
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <a href="/about" className="px-6 py-3 rounded-full border border-white/50 text-white font-medium hover:bg-white/10 transition-colors">
            {t.about}
          </a>
          <a href="/gallery" className="px-6 py-3 rounded-full border border-white/50 text-white font-medium hover:bg-white/10 transition-colors">
            {t.gallery}
          </a>
        </div>
        <div className="mt-8">
          <a href="/donate" className="inline-block px-8 py-3 rounded-full bg-orange-600 text-white font-bold hover:bg-orange-700 transition-colors">
            {t.donate}
          </a>
        </div>
      </div>
    </section>
  );
}