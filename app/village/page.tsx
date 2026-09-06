"use client";

import Navbar from "@/components/Navbar";
import { useLanguage } from "@/context/LanguageContext";

const content = {
  en: {
    title: "🏡 Welcome to Our Village: Songadhwa",
    intro: "Located in the serene heart of the Kuchaikote block in the Gopalganj district of Bihar, Songadhwa (also known as Songharwa) is a beautiful, tight-knit community grounded in rich agrarian roots, shared values, and centuries-old cultural traditions. Guided by our local PIN code 841425, our village seamlessly balances peaceful rural life with a vibrant, modernizing outlook.",
    popHeading: "👨‍👩‍👧‍👦 Population & Community Life",
    pop1: "Total Population:",
    pop1desc: "Home to roughly 2,500 to 3,000 residents.",
    pop2: "Our Culture:",
    pop2desc: "Life in Songadhwa is quiet, green, and peaceful — most families thrive on farming, growing lush fields of sugarcane and grain.",
    pop3: "Unity in Diversity:",
    pop3desc: "Neighbors live together like an extended family. From dynamic night processions to local markets, the village is defined by a powerful sense of brotherhood and mutual support.",
    landmarksHeading: "🛕 Notable Landmarks, Temples & Schools",
    spiritual: "Spiritual Centers",
    temple1: "The Local Hanuman Mandir:",
    temple1desc: "The heart of our community, especially during the Dol Mela, where youth gather to offer prayers and Nishan (holy flags) before processions.",
    temple2placeholder: "[Insert Name]",
    temple2desc: "Temple: A peaceful spiritual spot where village families gather every morning and evening for daily prayers and community discussions.",
    education: "Education & Services",
    school1: "Our Village Schools:",
    school1desc: "Songadhwa is home to",
    schoolPlaceholder: "[Insert School Name, e.g., Rajkiya Prathmik Vidyalaya]",
    school1desc2: ", ensuring a strong educational foundation right within the village.",
    school2: "Songharwa Post Office & Services:",
    school2desc: "Our local Branch Post Office ensures the village stays connected with essential digital and financial services.",
    proudHeading: "⭐ What Makes Us Proud",
    proud1: "Home of Akhra No. 7:",
    proud1desc: "Widely recognized across Gopalganj district for the legendary Songadhwa Akhra No-7 Dol Mela — the discipline, bravery, and grandeur of the annual parade make the village a symbol of pride for miles around.",
    proud2: "Preserving Ancient Martial Arts:",
    proud2desc: "In an era of smartphones, the youth of the village keep ancestral roots alive by mastering Lathi-Khel (stick fighting) and defensive sword play.",
    proud3: "Hardworking Spirit:",
    proud3desc: "From farmers feeding the region to young professionals building careers in major cities, the people of Songadhwa are known for honesty, resilience, and an unshakeable work ethic.",
  },
  hi: {
    title: "🏡 हमारे गांव में आपका स्वागत है: सोंगढ़वा",
    intro: "बिहार के गोपालगंज जिले के कुचायकोट प्रखंड के शांत हृदय में स्थित, सोंगढ़वा (जिसे सोंगहरवा भी कहा जाता है) एक सुंदर, घनिष्ठ समुदाय है जो समृद्ध कृषि जड़ों, साझा मूल्यों और सदियों पुरानी सांस्कृतिक परंपराओं पर आधारित है। हमारे स्थानीय पिन कोड 841425 द्वारा निर्देशित, हमारा गांव शांतिपूर्ण ग्रामीण जीवन को एक जीवंत, आधुनिक दृष्टिकोण के साथ सहजता से संतुलित करता है।",
    popHeading: "👨‍👩‍👧‍👦 जनसंख्या और सामुदायिक जीवन",
    pop1: "कुल जनसंख्या:",
    pop1desc: "लगभग 2,500 से 3,000 निवासियों का घर।",
    pop2: "हमारी संस्कृति:",
    pop2desc: "सोंगढ़वा में जीवन शांत, हरा-भरा और शांतिपूर्ण है — अधिकांश परिवार खेती पर निर्भर हैं, गन्ने और अनाज के हरे-भरे खेत उगाते हैं।",
    pop3: "विविधता में एकता:",
    pop3desc: "पड़ोसी एक विस्तारित परिवार की तरह एक साथ रहते हैं। गतिशील रात्रि जुलूसों से लेकर स्थानीय बाजारों तक, गांव भाईचारे और आपसी सहयोग की एक शक्तिशाली भावना से परिभाषित होता है।",
    landmarksHeading: "🛕 उल्लेखनीय स्थल, मंदिर और स्कूल",
    spiritual: "आध्यात्मिक केंद्र",
    temple1: "स्थानीय हनुमान मंदिर:",
    temple1desc: "हमारे समुदाय का हृदय, विशेष रूप से डोल मेले के दौरान, जहां युवा जुलूसों से पहले प्रार्थना और निशान (पवित्र झंडे) चढ़ाने के लिए एकत्र होते हैं।",
    temple2placeholder: "[नाम दर्ज करें]",
    temple2desc: "मंदिर: एक शांतिपूर्ण आध्यात्मिक स्थान जहां गांव के परिवार हर सुबह और शाम दैनिक प्रार्थना और सामुदायिक चर्चा के लिए एकत्र होते हैं।",
    education: "शिक्षा और सेवाएं",
    school1: "हमारे गांव के स्कूल:",
    school1desc: "सोंगढ़वा",
    schoolPlaceholder: "[स्कूल का नाम दर्ज करें, जैसे राजकीय प्राथमिक विद्यालय]",
    school1desc2: "का घर है, जो गांव के भीतर ही एक मजबूत शैक्षिक आधार सुनिश्चित करता है।",
    school2: "सोंगहरवा डाकघर और सेवाएं:",
    school2desc: "हमारा स्थानीय शाखा डाकघर सुनिश्चित करता है कि गांव आवश्यक डिजिटल और वित्तीय सेवाओं से जुड़ा रहे।",
    proudHeading: "⭐ हमें किस बात पर गर्व है",
    proud1: "अखाड़ा नंबर 7 का घर:",
    proud1desc: "पौराणिक सोंगढ़वा अखाड़ा नंबर 7 ढोल मेला के लिए पूरे गोपालगंज जिले में व्यापक रूप से मान्यता प्राप्त — वार्षिक परेड का अनुशासन, वीरता और भव्यता गांव को मीलों तक गर्व का प्रतीक बनाती है।",
    proud2: "प्राचीन मार्शल आर्ट का संरक्षण:",
    proud2desc: "स्मार्टफोन के युग में, गांव के युवा लाठी-खेल (स्टिक फाइटिंग) और रक्षात्मक तलवारबाजी में महारत हासिल करके पैतृक जड़ों को जीवित रखते हैं।",
    proud3: "मेहनती भावना:",
    proud3desc: "क्षेत्र को खिलाने वाले किसानों से लेकर प्रमुख शहरों में करियर बनाने वाले युवा पेशेवरों तक, सोंगढ़वा के लोग ईमानदारी, दृढ़ता और अटूट कार्य नीति के लिए जाने जाते हैं।",
  },
};

export default function VillagePage() {
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
          <h2 className="text-2xl font-bold mb-3">{t.popHeading}</h2>
          <ul className="space-y-2 text-gray-700">
            <li><strong>{t.pop1}</strong> {t.pop1desc}</li>
            <li><strong>{t.pop2}</strong> {t.pop2desc}</li>
            <li><strong>{t.pop3}</strong> {t.pop3desc}</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-3">{t.landmarksHeading}</h2>
          <h3 className="font-semibold mb-2">{t.spiritual}</h3>
          <ul className="space-y-2 text-gray-700 list-disc list-inside mb-4">
            <li><strong>{t.temple1}</strong> {t.temple1desc}</li>
            <li><span className="text-red-600">{t.temple2placeholder}</span> {t.temple2desc}</li>
          </ul>
          <h3 className="font-semibold mb-2">{t.education}</h3>
          <ul className="space-y-2 text-gray-700 list-disc list-inside">
            <li><strong>{t.school1}</strong> {t.school1desc} <span className="text-red-600">{t.schoolPlaceholder}</span>{t.school1desc2}</li>
            <li><strong>{t.school2}</strong> {t.school2desc}</li>
          </ul>
        </div>

        <div className="bg-orange-50 rounded-xl p-6">
          <h2 className="text-2xl font-bold mb-3">{t.proudHeading}</h2>
          <ul className="space-y-3 text-gray-700">
            <li><strong>{t.proud1}</strong> {t.proud1desc}</li>
            <li><strong>{t.proud2}</strong> {t.proud2desc}</li>
            <li><strong>{t.proud3}</strong> {t.proud3desc}</li>
          </ul>
        </div>
      </section>
    </main>
  );
}