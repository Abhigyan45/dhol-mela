"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

const mainLinks = [
  { href: "/", en: "Home", hi: "होम" },
  { href: "/about", en: "About", hi: "मेला के बारे में" },
  { href: "/history", en: "History", hi: "इतिहास" },
  { href: "/news", en: "News", hi: "समाचार" },
  { href: "/notifications", en: "Notifications", hi: "सूचनाएं" },
  { href: "/gallery", en: "Gallery", hi: "गैलरी" },
  { href: "/committee", en: "Committee", hi: "समिति" },
  { href: "/village", en: "Our Village", hi: "हमारा गांव" },
  { href: "/location", en: "Location", hi: "स्थान" },
  { href: "/contact", en: "Contact", hi: "संपर्क करें" },
];

const moreLinks = [
  { href: "/live", en: "Live", hi: "लाइव" },
  { href: "/search", en: "Search", hi: "खोजें" },
  { href: "/volunteer", en: "Volunteer", hi: "स्वयंसेवक" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const { lang, toggleLang } = useLanguage();
  const moreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setMoreOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b">
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3 gap-4">
        <Link href="/" className="text-lg font-bold flex items-center gap-1.5 whitespace-nowrap shrink-0">
          🥁 <span className="hidden sm:inline">Akhra No-7</span> Dol Mela
        </Link>

        <ul className="hidden lg:flex items-center gap-3.5 text-sm font-medium whitespace-nowrap">
          {mainLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="hover:text-orange-600 transition-colors">
                {lang === "en" ? link.en : link.hi}
              </Link>
            </li>
          ))}
          <li className="relative" ref={moreRef}>
            <button
              onClick={() => setMoreOpen(!moreOpen)}
              className="hover:text-orange-600 transition-colors flex items-center gap-1"
            >
              {lang === "en" ? "More" : "अधिक"} <span className="text-xs">▾</span>
            </button>
            {moreOpen && (
              <ul className="absolute right-0 mt-2 bg-white border rounded-lg shadow-lg py-1 min-w-[140px]">
                {moreLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setMoreOpen(false)}
                      className="block px-4 py-2 hover:bg-gray-50 hover:text-orange-600"
                    >
                      {lang === "en" ? link.en : link.hi}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        </ul>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={toggleLang}
            className="text-sm font-semibold border rounded-full px-3 py-1 hover:bg-gray-50"
          >
            {lang === "en" ? "हिं" : "EN"}
          </button>
          <button
            className="lg:hidden text-2xl"
            aria-label="Menu"
            onClick={() => setOpen(!open)}
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {open && (
        <ul className="lg:hidden flex flex-col gap-1 px-4 pb-4 text-sm font-medium">
          {[...mainLinks, ...moreLinks].map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setOpen(false)}
                className="block py-2 hover:text-orange-600 transition-colors"
              >
                {lang === "en" ? link.en : link.hi}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}