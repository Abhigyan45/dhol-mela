"use client";

import Navbar from "@/components/Navbar";
import { useLanguage } from "@/context/LanguageContext";

const content = {
  en: {
    heading: "🗓️ Event Schedule",
    subheading: "October 15, 2026 — Songadhwa, Bairagitola",
    schedule: [
      { time: "6:00 AM", title: "Puja / Prayers", description: "The day begins with traditional prayers and rituals." },
      { time: "10:00 AM", title: "Dhol Performances", description: "Traditional dhol performances by village groups." },
      { time: "2:00 PM", title: "Lunch / Prasad Distribution", description: "Community lunch and prasad distribution for all attendees." },
      { time: "10:00 PM", title: "Cultural Program", description: "Evening cultural performances closing out the day." },
    ],
  },
  hi: {
    heading: "🗓️ कार्यक्रम अनुसूची",
    subheading: "15 अक्टूबर 2026 — सोंगढ़वा, बैरागीटोला",
    schedule: [
      { time: "सुबह 6:00", title: "पूजा / प्रार्थना", description: "दिन की शुरुआत पारंपरिक प्रार्थना और अनुष्ठानों से होती है।" },
      { time: "सुबह 10:00", title: "ढोल प्रस्तुति", description: "गांव के समूहों द्वारा पारंपरिक ढोल प्रस्तुति।" },
      { time: "दोपहर 2:00", title: "भोजन / प्रसाद वितरण", description: "सभी उपस्थित लोगों के लिए सामुदायिक भोजन और प्रसाद वितरण।" },
      { time: "रात 10:00", title: "सांस्कृतिक कार्यक्रम", description: "दिन का समापन शाम के सांस्कृतिक कार्यक्रमों के साथ।" },
    ],
  },
};

export default function SchedulePage() {
  const { lang } = useLanguage();
  const t = content[lang];

  return (
    <main>
      <Navbar />
      <section className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-2">{t.heading}</h1>
        <p className="text-gray-600 mb-10">{t.subheading}</p>
        <div className="relative border-l-2 border-orange-200 pl-8 space-y-10">
          {t.schedule.map((item, i) => (
            <div key={i} className="relative">
              <span className="absolute -left-[41px] top-1 w-4 h-4 rounded-full bg-orange-600 border-4 border-white" />
              <p className="text-orange-600 font-semibold text-sm mb-1">{item.time}</p>
              <h3 className="text-lg font-bold mb-1">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}