"use client";

import Navbar from "@/components/Navbar";
import { useLanguage } from "@/context/LanguageContext";

const content = {
  en: {
    title: "🥁 About Songadhwa Akhra No-7 Dol Mela",
    intro: "Welcome to the official page of the Songadhwa Akhra No-7 Dol Mela, Gopalganj. This annual celebration is the pride of our village, bringing together the spirit of devotion, bravery, and community. Organized by Songadhwa Akhra No. 7, our Dol Mela is famous throughout the Gopalganj district for its magnificent Dols (holy floats), high-energy traditional martial arts, and vibrant cultural celebrations.",
    timesHeading: "⏰ Opening & Closing Times",
    timesIntro: "Our village mela follows a traditional two-day schedule, transitioning from a high-energy night procession into a bustling daytime carnival.",
    day1: "Day 1 (The Grand Procession):",
    day1desc: "Starts at 4:00 PM and runs overnight until 8:00 AM the following morning.",
    day2: "Day 2 (The Main Fair/Mela):",
    day2desc: "Stalls and family entertainment open from 10:00 AM and conclude around 10:00 PM.",
    religiousHeading: "🙏 Religious Programme",
    religious1: "Mahaviri Akhada Processions:",
    religious1desc: "The core spiritual element of the Mela — Songadhwa Akhra No. 7 brings out holy flags (Nishan) to honor Lord Hanuman.",
    religious2: "The Holy Dols:",
    religious2desc: "Beautifully decorated, monumental structures representing local deities, paraded through the village streets.",
    dholHeading: "🥁 Dhol & Music Programme",
    dhol1: "Traditional Dhol & Tasha:",
    dhol1desc: "Rhythmic, heavy drum beats as local youth perform synchronized drumming.",
    dhol2: "Mega DJ Outfits:",
    dhol2desc: "Modern sound setups light up the night with music and friendly competition between local groups.",
    culturalHeading: "🎭 Cultural Programme",
    cultural1: "Traditional Lathi & Sword Fighting:",
    cultural1desc: "Akhada members display ancient martial arts skills with breathtaking mock-fights.",
    cultural2: "Folk Dance & Stage Performances:",
    cultural2desc: "Local artists present traditional folk songs and performances during the daytime carnival.",
    facilitiesHeading: "🎪 Visitor Facilities",
    facility1: "Food Stalls & Bazaars:",
    facility1desc: "A massive open-air food street with Litti Chokha, Jalebi, Chat, and local sweets.",
    facility2: "Medical Help Desk:",
    facility2desc: "A dedicated first-aid booth managed by village volunteers near the main entry points.",
    facility3: "Designated Parking:",
    facility3desc: "Free parking grounds for two-wheelers and four-wheelers set up on the outskirts of the village entry points.",
    emergencyHeading: "🚨 Emergency Contact Information",
    emergencyIntro: "For assistance, crowd control, or medical emergencies, please reach out to our village control booth:",
    emergencyCommittee: "Songadhwa Akhra No. 7 Committee:",
    emergencyNote: "(replace with actual number)",
    emergencyPolice: "Local Police Helpline (Gopalganj):",
    emergencyAmbulance: "Ambulance Services:",
  },
  hi: {
    title: "🥁 सोंगढ़वा अखाड़ा नंबर 7 ढोल मेला के बारे में",
    intro: "सोंगढ़वा अखाड़ा नंबर 7 ढोल मेला, गोपालगंज के आधिकारिक पृष्ठ पर आपका स्वागत है। यह वार्षिक उत्सव हमारे गांव का गौरव है, जो भक्ति, वीरता और समुदाय की भावना को एक साथ लाता है। सोंगढ़वा अखाड़ा नंबर 7 द्वारा आयोजित, हमारा ढोल मेला अपने भव्य डोल (पवित्र झांकियों), उच्च-ऊर्जा पारंपरिक मार्शल आर्ट्स और जीवंत सांस्कृतिक उत्सवों के लिए पूरे गोपालगंज जिले में प्रसिद्ध है।",
    timesHeading: "⏰ खुलने और बंद होने का समय",
    timesIntro: "हमारा गांव मेला एक पारंपरिक दो-दिवसीय कार्यक्रम का पालन करता है, जो उच्च-ऊर्जा रात्रि जुलूस से दिन के भरे-पूरे मेले में परिवर्तित होता है।",
    day1: "दिन 1 (भव्य जुलूस):",
    day1desc: "शाम 4:00 बजे शुरू होकर अगली सुबह 8:00 बजे तक पूरी रात चलता है।",
    day2: "दिन 2 (मुख्य मेला):",
    day2desc: "स्टॉल और पारिवारिक मनोरंजन सुबह 10:00 बजे से शुरू होकर रात 10:00 बजे तक चलते हैं।",
    religiousHeading: "🙏 धार्मिक कार्यक्रम",
    religious1: "महावीरी अखाड़ा जुलूस:",
    religious1desc: "मेले का मुख्य आध्यात्मिक तत्व — सोंगढ़वा अखाड़ा नंबर 7 भगवान हनुमान का सम्मान करने के लिए पवित्र झंडे (निशान) लाता है।",
    religious2: "पवित्र डोल:",
    religious2desc: "सुंदर सजाए गए, विशाल संरचनाएं जो स्थानीय देवताओं का प्रतिनिधित्व करती हैं, गांव की गलियों में परेड की जाती हैं।",
    dholHeading: "🥁 ढोल और संगीत कार्यक्रम",
    dhol1: "पारंपरिक ढोल और ताशा:",
    dhol1desc: "लयबद्ध, भारी ढोल की थाप जैसे स्थानीय युवा समन्वित ढोल वादन करते हैं।",
    dhol2: "मेगा डीजे सेटअप:",
    dhol2desc: "आधुनिक साउंड सिस्टम रात को संगीत और स्थानीय समूहों के बीच मैत्रीपूर्ण प्रतिस्पर्धा से रोशन करते हैं।",
    culturalHeading: "🎭 सांस्कृतिक कार्यक्रम",
    cultural1: "पारंपरिक लाठी और तलवारबाजी:",
    cultural1desc: "अखाड़ा सदस्य रोमांचक नकली-लड़ाइयों के साथ प्राचीन मार्शल आर्ट कौशल का प्रदर्शन करते हैं।",
    cultural2: "लोक नृत्य और मंच प्रस्तुतियां:",
    cultural2desc: "स्थानीय कलाकार दिन के मेले के दौरान पारंपरिक लोक गीत और मंच प्रस्तुतियां प्रस्तुत करते हैं।",
    facilitiesHeading: "🎪 आगंतुक सुविधाएं",
    facility1: "खाद्य स्टॉल और बाज़ार:",
    facility1desc: "लिट्टी चोखा, जलेबी, चाट और स्थानीय मिठाइयों के साथ एक विशाल खुली हवा में खाद्य गली।",
    facility2: "चिकित्सा सहायता केंद्र:",
    facility2desc: "मुख्य प्रवेश बिंदुओं के पास गांव के स्वयंसेवकों द्वारा प्रबंधित एक समर्पित प्राथमिक चिकित्सा बूथ।",
    facility3: "निर्धारित पार्किंग:",
    facility3desc: "गांव के प्रवेश बिंदुओं के बाहरी इलाके में दोपहिया और चारपहिया वाहनों के लिए मुफ्त पार्किंग की व्यवस्था।",
    emergencyHeading: "🚨 आपातकालीन संपर्क जानकारी",
    emergencyIntro: "सहायता, भीड़ नियंत्रण, या चिकित्सा आपात स्थिति के लिए, कृपया हमारे गांव नियंत्रण बूथ से संपर्क करें:",
    emergencyCommittee: "सोंगढ़वा अखाड़ा नंबर 7 समिति:",
    emergencyNote: "(वास्तविक नंबर से बदलें)",
    emergencyPolice: "स्थानीय पुलिस हेल्पलाइन (गोपालगंज):",
    emergencyAmbulance: "एम्बुलेंस सेवाएं:",
  },
};

export default function AboutMelaPage() {
  const { lang } = useLanguage();
  const t = content[lang];

  return (
    <main>
      <Navbar />
      <section className="max-w-3xl mx-auto px-4 py-16 space-y-12">
        <div>
          <h1 className="text-3xl font-bold mb-4">{t.title}</h1>
          <p className="text-gray-700 leading-relaxed">{t.intro}</p>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-3">{t.timesHeading}</h2>
          <p className="text-gray-700 mb-3">{t.timesIntro}</p>
          <ul className="space-y-2 text-gray-700">
            <li><strong>{t.day1}</strong> {t.day1desc}</li>
            <li><strong>{t.day2}</strong> {t.day2desc}</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-3">{t.religiousHeading}</h2>
          <ul className="space-y-2 text-gray-700 list-disc list-inside">
            <li><strong>{t.religious1}</strong> {t.religious1desc}</li>
            <li><strong>{t.religious2}</strong> {t.religious2desc}</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-3">{t.dholHeading}</h2>
          <ul className="space-y-2 text-gray-700 list-disc list-inside">
            <li><strong>{t.dhol1}</strong> {t.dhol1desc}</li>
            <li><strong>{t.dhol2}</strong> {t.dhol2desc}</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-3">{t.culturalHeading}</h2>
          <ul className="space-y-2 text-gray-700 list-disc list-inside">
            <li><strong>{t.cultural1}</strong> {t.cultural1desc}</li>
            <li><strong>{t.cultural2}</strong> {t.cultural2desc}</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-3">{t.facilitiesHeading}</h2>
          <ul className="space-y-2 text-gray-700 list-disc list-inside">
            <li><strong>{t.facility1}</strong> {t.facility1desc}</li>
            <li><strong>{t.facility2}</strong> {t.facility2desc}</li>
            <li><strong>{t.facility3}</strong> {t.facility3desc}</li>
          </ul>
        </div>

        <div className="bg-orange-50 rounded-xl p-6">
          <h2 className="text-2xl font-bold mb-3">{t.emergencyHeading}</h2>
          <p className="text-gray-700 mb-3">{t.emergencyIntro}</p>
          <ul className="space-y-1 text-gray-700">
            <li><strong>{t.emergencyCommittee}</strong> <span className="text-red-600 font-mono">+91-XXXXX-XXXXX</span> <span className="text-xs text-gray-500">{t.emergencyNote}</span></li>
            <li><strong>{t.emergencyPolice}</strong> 112 / 100</li>
            <li><strong>{t.emergencyAmbulance}</strong> 102</li>
          </ul>
        </div>
      </section>
    </main>
  );
}