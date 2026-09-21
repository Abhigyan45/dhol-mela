"use client";

import { useEffect, useState } from "react";
import Countdown from "./Countdown";
import { useLanguage } from "@/context/LanguageContext";
import { Calendar, MapPin } from "lucide-react";

const content = {
  en: { tagline: "Tradition • Culture • Unity", about: "About Mela", gallery: "Gallery", donate: "DONATE" },
  hi: { tagline: "परंपरा • संस्कृति • एकता", about: "मेला के बारे में", gallery: "गैलरी", donate: "दान करें" },
};

export default function Hero() {
  const { lang } = useLanguage();
  const t = content[lang];
  const [melaDate, setMelaDate] = useState<Date | null>(null);

  useEffect(() => {
    async function loadDate() {
      const res = await fetch("/api/mela-settings");
      const data = await res.json();
      if (data.melaDate) setMelaDate(new Date(data.melaDate));
    }
    loadDate();
  }, []);

  const formattedDate = melaDate
    ? melaDate.toLocaleDateString(lang === "hi" ? "hi-IN" : "en-IN", { day: "numeric", month: "long", year: "numeric" })
    : "";

  return (
    <section
      className="relative py-20 px-4 text-center bg-cover bg-top"
      style={{ backgroundImage: "url('/images/banner.png')" }}
    >
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10">
       <p className="hero-fade-in text-orange-400 font-semibold tracking-wide uppercase text-sm mb-3" style={{ animationDelay: "0.1s" }}>
       {t.tagline}
       </p>
  <h1 className="hero-fade-in text-4xl md:text-6xl font-extrabold mb-4 text-white" style={{ animationDelay: "0.25s" }}>
    Songadhwa Akhra No-7 Dhol Mela {melaDate ? melaDate.getFullYear() : new Date().getFullYear()}
  </h1>
  {formattedDate && (
  <p className="text-gray-200 mb-2 flex items-center justify-center gap-2">
    <Calendar className="w-4 h-4" /> {formattedDate}
  </p>
)}
  <p className="text-gray-200 mb-8 flex items-center justify-center gap-2">
  <MapPin className="w-4 h-4" /> Songadhwa, Bairagitola, Gopalganj, Bihar
</p>

  <div className="hero-fade-in mb-8" style={{ animationDelay: "0.65s" }}>
    <Countdown />
  </div>

  <div className="hero-fade-in flex flex-wrap justify-center gap-4" style={{ animationDelay: "0.8s" }}>
    <a href="/about" className="px-6 py-3 rounded-full border border-white/50 text-white font-medium hover:bg-white/10 transition-colors">{t.about}</a>
    <a href="/gallery" className="px-6 py-3 rounded-full border border-white/50 text-white font-medium hover:bg-white/10 transition-colors">{t.gallery}</a>
  </div>
  <div className="hero-fade-in mt-8" style={{ animationDelay: "0.95s" }}>
    <a href="/donate" className="inline-block px-8 py-3 rounded-full bg-orange-600 text-white font-bold hover:bg-orange-700 transition-colors">{t.donate}</a>
  </div>
</div>
      
    </section>
  );
}