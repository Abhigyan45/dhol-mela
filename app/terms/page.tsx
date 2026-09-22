"use client";

import Navbar from "@/components/Navbar";
import FadeIn from "@/components/FadeIn";
import { useLanguage } from "@/context/LanguageContext";

const content = {
  en: {
    title: "📜 Terms & Disclaimer",
    intro: "This website (songadhwadholmela.vercel.app) is run by volunteers of the Songadhwa Akhra No-7 Dhol Mela Committee to share information about the annual mela with the public.",
    s1: "Purpose of this Website",
    s1body: "This site is for informational purposes only — sharing news, schedules, gallery, and ways to support or volunteer for the mela. It is not an official government website and does not represent any government body.",
    s2: "Individual Responsibility",
    s2body: "The Songadhwa Akhra No-7 Dhol Mela Committee, its volunteers, and this website are not responsible for the individual actions or conduct of any attendee, vendor, or participant at the mela. Every attendee is responsible for following applicable laws and for their own conduct and safety during the event.",
    s3: "No Liability for User Content",
    s3body: "Messages submitted through the Contact or Volunteer forms are reviewed by committee volunteers. The committee reserves the right to not act on, or to report to appropriate authorities, any content that appears unlawful.",
    s4: "Donations",
    s4body: "Donations made through this website's UPI details go directly to the committee's designated account. The website itself does not process or hold any funds.",
    s5: "Rules & Safety",
    s5body: "Attendees are expected to follow the guidelines posted on our Rules & Safety page. The committee may update these rules at any time.",
    s6: "Contact",
    s6body: "For questions about these terms, please reach out via our Contact page.",
    note: "This page is a general statement from the organizing committee and is not a substitute for professional legal advice.",
  },
  hi: {
    title: "📜 नियम एवं अस्वीकरण",
    intro: "यह वेबसाइट (songadhwadholmela.vercel.app) सोनगढ़वा अखाड़ा नंबर 7 ढोल मेला समिति के स्वयंसेवकों द्वारा वार्षिक मेले की जानकारी जनता के साथ साझा करने के लिए संचालित की जाती है।",
    s1: "इस वेबसाइट का उद्देश्य",
    s1body: "यह साइट केवल जानकारी के उद्देश्य से है — समाचार, कार्यक्रम, गैलरी, और मेले के समर्थन या स्वयंसेवा के तरीके साझा करना। यह कोई सरकारी वेबसाइट नहीं है और किसी सरकारी निकाय का प्रतिनिधित्व नहीं करती।",
    s2: "व्यक्तिगत जिम्मेदारी",
    s2body: "सोनगढ़वा अखाड़ा नंबर 7 ढोल मेला समिति, इसके स्वयंसेवक, और यह वेबसाइट मेले में किसी भी उपस्थित व्यक्ति, विक्रेता, या प्रतिभागी के व्यक्तिगत कार्यों या आचरण के लिए जिम्मेदार नहीं हैं। हर उपस्थित व्यक्ति लागू कानूनों का पालन करने और आयोजन के दौरान अपने स्वयं के आचरण और सुरक्षा के लिए जिम्मेदार है।",
    s3: "उपयोगकर्ता सामग्री के लिए कोई दायित्व नहीं",
    s3body: "संपर्क या स्वयंसेवक फॉर्म के माध्यम से भेजे गए संदेशों की समीक्षा समिति के स्वयंसेवकों द्वारा की जाती है। समिति किसी भी सामग्री पर कार्रवाई न करने, या उसे उचित अधिकारियों को रिपोर्ट करने का अधिकार सुरक्षित रखती है जो गैरकानूनी प्रतीत होती है।",
    s4: "दान",
    s4body: "इस वेबसाइट के UPI विवरण के माध्यम से किया गया दान सीधे समिति के निर्दिष्ट खाते में जाता है। वेबसाइट स्वयं किसी भी धनराशि को संसाधित या धारण नहीं करती।",
    s5: "नियम एवं सुरक्षा",
    s5body: "उपस्थित लोगों से हमारे नियम एवं सुरक्षा पृष्ठ पर पोस्ट किए गए दिशानिर्देशों का पालन करने की अपेक्षा की जाती है। समिति किसी भी समय इन नियमों को अपडेट कर सकती है।",
    s6: "संपर्क",
    s6body: "इन शर्तों के बारे में प्रश्नों के लिए, कृपया हमारे संपर्क पृष्ठ के माध्यम से संपर्क करें।",
    note: "यह पृष्ठ आयोजन समिति का एक सामान्य वक्तव्य है और यह पेशेवर कानूनी सलाह का विकल्प नहीं है।",
  },
};

export default function TermsPage() {
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

            {[
              [t.s1, t.s1body], [t.s2, t.s2body], [t.s3, t.s3body],
              [t.s4, t.s4body], [t.s5, t.s5body], [t.s6, t.s6body],
            ].map(([heading, body], i) => (
              <div key={i} className="mb-6">
                <h2 className="text-lg font-bold mb-2">{heading}</h2>
                <p className="text-gray-700 leading-relaxed">{body}</p>
              </div>
            ))}

            <p className="text-xs text-gray-400 mt-10 border-t pt-4">{t.note}</p>
          </div>
        </FadeIn>
      </section>
    </main>
  );
}