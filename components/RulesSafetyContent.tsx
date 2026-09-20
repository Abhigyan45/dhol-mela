"use client";

import FadeIn from "@/components/FadeIn";
import { useLanguage } from "@/context/LanguageContext";

type Rule = { id: string; textEn: string; textHi: string | null; category: string };

const categoryLabels = {
  en: { safety: "🚨 Safety Instructions", conduct: "🙏 Rules of Conduct", general: "📋 General Guidelines" },
  hi: { safety: "🚨 सुरक्षा निर्देश", conduct: "🙏 आचरण के नियम", general: "📋 सामान्य दिशानिर्देश" },
};

const pageText = {
  en: { title: "🚨 Rules & Safety", intro: "Please read and follow these guidelines to help keep the Songadhwa Akhra No-7 Dol Mela safe and enjoyable for everyone.", empty: "Rules will be posted here closer to the mela date." },
  hi: { title: "🚨 नियम एवं सुरक्षा", intro: "कृपया इन दिशानिर्देशों को पढ़ें और उनका पालन करें ताकि सोंगढ़वा अखाड़ा नंबर 7 ढोल मेला सभी के लिए सुरक्षित और आनंददायक रहे।", empty: "मेले की तारीख नजदीक आने पर यहां नियम पोस्ट किए जाएंगे।" },
};

export default function RulesSafetyContent({ rules }: { rules: Rule[] }) {
  const { lang } = useLanguage();
  const t = pageText[lang];
  const labels = categoryLabels[lang];

  const byCategory = rules.reduce<Record<string, Rule[]>>((acc, r) => {
    (acc[r.category] ??= []).push(r);
    return acc;
  }, {});

  return (
    <section className="max-w-3xl mx-auto px-4 py-16">
      <FadeIn>
        <div>
          <h1 className="text-3xl font-bold mb-2">{t.title}</h1>
          <p className="text-gray-600 mb-10">{t.intro}</p>
        </div>
      </FadeIn>

      {rules.length === 0 ? (
        <p className="text-gray-500">{t.empty}</p>
      ) : (
        Object.entries(labels).map(([key, label]) =>
          byCategory[key]?.length ? (
            <FadeIn key={key}>
              <div className="mb-10">
                <h2 className="text-xl font-bold mb-3">{label}</h2>
                <ul className="space-y-2 text-gray-700 list-disc list-inside">
                  {byCategory[key].map((r) => (
                    <li key={r.id}>{lang === "hi" && r.textHi ? r.textHi : r.textEn}</li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          ) : null
        )
      )}
    </section>
  );
}