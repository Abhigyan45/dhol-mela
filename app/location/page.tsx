"use client";

import Navbar from "@/components/Navbar";
import { useLanguage } from "@/context/LanguageContext";
import FadeIn from "@/components/FadeIn";

const LAT = 26.583427;
const LNG = 84.279223;

const content = {
  en: { heading: "📍 Location", sub: "Songadhwa, Bairagitola village, Gopalganj district, Bihar", directions: "Get Directions" },
  hi: { heading: "📍 स्थान", sub: "सोनगढ़वा, बैरागीटोला गांव, गोपालगंज जिला, बिहार", directions: "दिशा-निर्देश प्राप्त करें" },
};

export default function LocationPage() {
  const { lang } = useLanguage();
  const t = content[lang];
  const mapSrc = `https://www.google.com/maps?q=${LAT},${LNG}&hl=en&z=15&output=embed`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${LAT},${LNG}`;

  return (
    <main>
      <Navbar />
      <section className="max-w-4xl mx-auto px-4 py-16">
        <FadeIn>
        <div>
        <h1 className="text-3xl font-bold mb-2">{t.heading}</h1>
        <p className="text-gray-600 mb-6">{t.sub}</p>
        </div>
        </FadeIn>
        <FadeIn>
        <div className="mb-6">
          <p className="text-gray-700 leading-relaxed">
            The Songadhwa Akhra No. 7 Dol Mela is held in the village of Songadhwa, located in the Bairagitola area of Gopalganj district, Bihar. The mela site is easily accessible by road and is well-known among locals and visitors alike.
          </p>
        </div>
        </FadeIn>
        <FadeIn>
        <div className="rounded-2xl overflow-hidden border aspect-video">
          <iframe src={mapSrc} width="100%" height="100%" style={{ border: 0 }} loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Mela Location Map" />
        </div>
        </FadeIn>
        <FadeIn>
        <div className="mt-6">
        <a href={directionsUrl} target="_blank" rel="noopener noreferrer" className="inline-block mt-4 px-5 py-2 rounded-lg bg-orange-600 text-white font-medium hover:bg-orange-700">
          {t.directions}
        </a>
        </div>
        </FadeIn>
      </section>
    </main>
  );
}