"use client";

import Link from "next/link";
import VisitorCounter from "./VisitorCounter";
import { useLanguage } from "@/context/LanguageContext";

const FACEBOOK_URL = "https://facebook.com/YOUR_PAGE_HERE";
const INSTAGRAM_URL = "https://instagram.com/YOUR_HANDLE_HERE";
const WHATSAPP_NUMBER = "91XXXXXXXXXX";

const content = {
  en: {
    address: "Songadhwa, Bairagitola, Kuchaikote block, Gopalganj district, Bihar — 841425",
    quickLinks: "Quick Links",
    connect: "Connect With Us",
    rights: "All rights reserved.",
    links: { about: "About Mela", history: "History", schedule: "Schedule", gallery: "Gallery", donate: "Donate", contact: "Contact" },
  },
  hi: {
    address: "सोंगढ़वा, बैरागीटोला, कुचायकोट प्रखंड, गोपालगंज जिला, बिहार — 841425",
    quickLinks: "त्वरित लिंक",
    connect: "हमसे जुड़ें",
    rights: "सर्वाधिकार सुरक्षित।",
    links: { about: "मेला के बारे में", history: "इतिहास", schedule: "कार्यक्रम", gallery: "गैलरी", donate: "दान करें", contact: "संपर्क करें" },
  },
};

export default function Footer() {
  const { lang } = useLanguage();
  const t = content[lang];
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}`;

  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-white font-bold text-lg mb-2">🥁 Songadhwa Akhra No-7 Dol Mela</h3>
          <p className="text-sm text-gray-400">{t.address}</p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-2">{t.quickLinks}</h4>
          <ul className="space-y-1 text-sm">
            <li><Link href="/about" className="hover:text-orange-400">{t.links.about}</Link></li>
            <li><Link href="/history" className="hover:text-orange-400">{t.links.history}</Link></li>
            <li><Link href="/schedule" className="hover:text-orange-400">{t.links.schedule}</Link></li>
            <li><Link href="/gallery" className="hover:text-orange-400">{t.links.gallery}</Link></li>
            <li><Link href="/donate" className="hover:text-orange-400">{t.links.donate}</Link></li>
            <li><Link href="/contact" className="hover:text-orange-400">{t.links.contact}</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-2">{t.connect}</h4>
          <div className="flex gap-4">
            <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-orange-600 transition-colors">📘</a>
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-orange-600 transition-colors">📷</a>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-orange-600 transition-colors">💬</a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 py-4 text-center text-xs text-gray-500 space-y-1">
        <p>© {new Date().getFullYear()} Songadhwa Akhra No-7 Dol Mela Committee. {t.rights}</p>
        <VisitorCounter />
      </div>
    </footer>
  );
}