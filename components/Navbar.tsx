// components/Navbar.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/history", label: "History" },
  { href: "/news", label: "News" },
  { href: "/notifications", label: "Notifications" },
  { href: "/gallery", label: "Gallery" },
  { href: "/committee", label: "Committee" },
  { href: "/village", label: "Our Village" },
  { href: "/location", label: "Location" },
  { href: "/contact", label: "Contact" },
  { href: "/live", label: "Live" },
  { href: "/search", label: "Search" },
  { href: "/volunteer", label: "Volunteer" }
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { lang, toggleLang } = useLanguage();

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b">
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        <Link href="/" className="text-xl font-bold flex items-center gap-2">
          🥁 Dhol Mela
        </Link>

        <ul className="hidden md:flex gap-5 text-sm font-medium">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="hover:text-orange-600 transition-colors">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleLang}
            className="text-sm font-semibold border rounded-full px-3 py-1 hover:bg-gray-50"
          >
            {lang === "en" ? "हिं" : "EN"}
          </button>
          <button
            className="md:hidden text-2xl"
            aria-label="Menu"
            onClick={() => setOpen(!open)}
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {open && (
        <ul className="md:hidden flex flex-col gap-1 px-4 pb-4 text-sm font-medium">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setOpen(false)}
                className="block py-2 hover:text-orange-600 transition-colors"
              >
                {link.label}
              </Link>
              <Link href="/" className="text-xl font-bold flex items-center gap-2">
               🥁 Akhra No-7 Dol Mela
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}