"use client";
import Navbar from "@/components/Navbar";
import { useLanguage } from "@/context/LanguageContext";
import FadeIn from "@/components/FadeIn";

const content = {
  en: {
    title: "📜 History of Songadhwa Akhra No-7 Dhol Mela",
    intro: "The Songadhwa Akhra No-7 Dhol Mela is not just a festival; it is a living legacy of our village's unity, bravery, and deep-rooted faith. For decades, our Akhra has stood as a symbol of pride in the Gopalganj district, preserving the rich traditions of the Mahaviri Akhada and Dol processions.",
    whenHeading: "🌱 When & Why It Started",
    whenBody: "The roots of our mela trace back to",
    yearPlaceholder: "15/10/1967",
    whenBody2: "when the elders and youth of Songadhwa village came together to establish Akhra No. 7.",
    vision: "The Vision:",
    visionDesc: "Founded under the leadership of",
    founderPlaceholder: "Late Harinarayan Singh & Late Deepnarayan Singh, along with their brother",
    purpose: "The Purpose:",
    purposeDesc: "To bring the community together, encourage youth to practice traditional physical fitness (martial arts, lathi, and sword fighting), and celebrate the divine blessings of Lord Hanuman during the festive season.",
    growthNote: "What began as a small, humble gathering with a single holy flag (Nishan) has today grown into one of the most anticipated grand festivals in the region.",
    milestonesHeading: "🏆 Major Milestones Over the Years",
    milestones: [
      { year: "[1967]", title: "The First Grand Dol", description: "Transitioned from carrying traditional flags to building the first monumental, beautifully decorated Dol — marking entry into the mainstream Dhol Mela celebrations of Gopalganj." },
      { year: "[1977]", title: "Youth Martial Arts Excellence", description: "Village youth gained widespread recognition across the district for exceptional skills in Lathi-Khel (stick fighting) and traditional sword displays, winning accolades in regional friendly competitions." },
      { year: "[1985]", title: "The Modern Sound Revolution", description: "Introduced state-of-the-art modern sound systems and lighting, making the night procession one of the most energetic and heavily attended events in the area." },
      { year: "[1985-2026(till now)]", title: "Community Infrastructure Growth", description: "The Akhra committee officially structured the Mela layout — introducing dedicated food zones, volunteer-led safety teams, and organized parking to accommodate thousands of outside visitors." },
    ],
    legacyHeading: "🤝 Carrying the Legacy Forward",
    legacyBody: "Since 1967, Akhra No. 7 has passed from generation to generation — each carrying the torch further than the last. Today, the third generation of Songadhwa village leads the tradition. While modern tech and massive DJ setups have enhanced the scale of the festival, the core values of brotherhood, devotion, and cultural pride remain exactly as they were on day one.",
  },
  hi: {
    title: "📜 सोनगढ़वा अखाड़ा नंबर 7 ढोल मेला का इतिहास",
    intro: "सोनगढ़वा अखाड़ा नंबर 7 ढोल मेला केवल एक त्योहार नहीं है; यह हमारे गांव की एकता, वीरता और गहरी आस्था की एक जीवंत विरासत है। दशकों से, हमारा अखाड़ा गोपालगंज जिले में गर्व का प्रतीक रहा है, जो महावीरी अखाड़ा और डोल जुलूसों की समृद्ध परंपराओं को संरक्षित करता है।",
    whenHeading: "🌱 कब और क्यों शुरू हुआ",
    whenBody: "हमारे मेले की जड़ें",
    yearPlaceholder: "15/10/1967",
    whenBody2: "तक जाती हैं, जब सोनगढ़वा गांव के बुजुर्ग और युवा अखाड़ा नंबर 7 की स्थापना के लिए एक साथ आए।",
    vision: "दृष्टिकोण:",
    visionDesc: "की अगुवाई में स्थापित",
    founderPlaceholder: "दिवंगत हरिनारायण सिंह और दिवंगत दीपनारायण सिंह, अपने भाई के साथ",
    purpose: "उद्देश्य:",
    purposeDesc: "समुदाय को एक साथ लाना, युवाओं को पारंपरिक शारीरिक फिटनेस (मार्शल आर्ट, लाठी और तलवारबाजी) का अभ्यास करने के लिए प्रोत्साहित करना, और त्योहारी मौसम के दौरान भगवान हनुमान के दिव्य आशीर्वाद का उत्सव मनाना।",
    growthNote: "जो एक पवित्र झंडे (निशान) के साथ एक छोटे, विनम्र समागम के रूप में शुरू हुआ था, वह आज क्षेत्र के सबसे प्रतीक्षित भव्य त्योहारों में से एक बन गया है।",
    milestonesHeading: "🏆 वर्षों में प्रमुख उपलब्धियां",
    milestones: [
      { year: "[1967]", title: "पहला भव्य डोल", description: "पारंपरिक झंडे ले जाने से पहला विशाल, सुंदर सजाया गया डोल बनाने में परिवर्तित — गोपालगंज के मुख्यधारा के डोल मेला उत्सवों में प्रवेश को चिह्नित करता है।" },
      { year: "[1977]", title: "युवा मार्शल आर्ट उत्कृष्टता", description: "गांव के युवाओं ने लाठी-खेल (स्टिक फाइटिंग) और पारंपरिक तलवार प्रदर्शन में असाधारण कौशल के लिए पूरे जिले में व्यापक मान्यता प्राप्त की, क्षेत्रीय मैत्रीपूर्ण प्रतियोगिताओं में सम्मान जीता।" },
      { year: "[1985]", title: "आधुनिक साउंड क्रांति", description: "अत्याधुनिक आधुनिक साउंड सिस्टम और लाइटिंग पेश की, जिससे रात्रि जुलूस क्षेत्र में सबसे ऊर्जावान और अधिक उपस्थित होने वाले आयोजनों में से एक बन गया।" },
      { year: "[1985-2026(अभी तक)]", title: "सामुदायिक बुनियादी ढांचे का विकास", description: "अखाड़ा समिति ने आधिकारिक तौर पर मेला लेआउट को संरचित किया — हजारों बाहरी आगंतुकों को समायोजित करने के लिए समर्पित खाद्य क्षेत्र, स्वयंसेवक-नेतृत्व वाली सुरक्षा टीमें और संगठित पार्किंग की शुरुआत की।" },
    ],
    legacyHeading: "🤝 विरासत को आगे बढ़ाना",
    legacyBody: "1967 से, अखाड़ा नंबर 7 पीढ़ी दर पीढ़ी आगे बढ़ा है — हर पीढ़ी ने मशाल को पिछली से आगे ले जाया है। आज, सोनगढ़वा गांव की तीसरी पीढ़ी इस परंपरा का नेतृत्व कर रही है। जबकि आधुनिक तकनीक और विशाल डीजे सेटअप ने त्योहार के पैमाने को बढ़ाया है, भाईचारे, भक्ति और सांस्कृतिक गौरव के मूल मूल्य ठीक वैसे ही बने हुए हैं जैसे पहले दिन थे।",
  },
};

export default function HistoryPage() {
  const { lang } = useLanguage();
  const t = content[lang];

  return (
    <main>
      <Navbar />
      <section className="max-w-3xl mx-auto px-4 py-16">
        <FadeIn>
          <div>
            <h1 className="text-3xl font-bold mb-6">{t.title}</h1>
            <p className="text-gray-700 leading-relaxed mb-8">{t.intro}</p>
          </div>
        </FadeIn>

        <FadeIn>
          <div>
            <h2 className="text-2xl font-bold mb-3">{t.whenHeading}</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              {t.whenBody} <span className="text-red-600 font-semibold">{t.yearPlaceholder}</span> {t.whenBody2}
            </p>
            <ul className="space-y-2 text-gray-700 list-disc list-inside mb-8">
              <li><strong>{t.vision}</strong> {t.visionDesc} <span className="text-red-600">{t.founderPlaceholder}</span>.</li>
              <li><strong>{t.purpose}</strong> {t.purposeDesc}</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mb-12">{t.growthNote}</p>
          </div>
        </FadeIn>

        <FadeIn>
          <div>
            <h2 className="text-2xl font-bold mb-6">{t.milestonesHeading}</h2>
            <div className="relative border-l-2 border-orange-200 pl-8 space-y-10 mb-12">
              {t.milestones.map((m, i) => (
                <div key={i} className="relative">
                  <span className="absolute -left-[41px] top-1 w-4 h-4 rounded-full bg-orange-600 border-4 border-white" />
                  <p className="text-orange-600 font-semibold text-sm mb-1">{m.year}</p>
                  <h3 className="text-lg font-bold mb-1">{m.title}</h3>
                  <p className="text-gray-600 text-sm">{m.description}</p>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        <FadeIn>
          <div>
            <h2 className="text-2xl font-bold mb-3">{t.legacyHeading}</h2>
            <p className="text-gray-700 leading-relaxed">{t.legacyBody}</p>
          </div>
        </FadeIn>
      </section>
    </main>
  );
}