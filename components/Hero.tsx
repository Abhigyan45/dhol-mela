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
    <section className="relative bg-gradient-to-b from-orange-50 to-white py-20 px-4 text-center">
      <p className="text-orange-600 font-semibold tracking-wide uppercase text-sm mb-3">
        {t.tagline}
      </p>
      <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
       Songadhwa Akhra No-7 Dol Mela {new Date().getFullYear()}
      </h1>
      <p className="text-gray-600 mb-2">{t.date}</p>
      <p className="text-gray-600 mb-8">{t.location}</p>

      <div className="mb-8">
        <Countdown />
      </div>

      <div className="flex flex-wrap justify-center gap-4">
        <a href="/about" className="px-6 py-3 rounded-full border border-gray-300 font-medium hover:bg-gray-50 transition-colors">
          {t.about}
        </a>
        <a href="/gallery" className="px-6 py-3 rounded-full border border-gray-300 font-medium hover:bg-gray-50 transition-colors">
          {t.gallery}
        </a>
      </div>
      <div className="mt-8">
        <a href="/donate" className="inline-block px-8 py-3 rounded-full bg-orange-600 text-white font-bold hover:bg-orange-700 transition-colors">
          {t.donate}
        </a>
      </div>
    </section>
  );
}