"use client";

import Navbar from "@/components/Navbar";
import { useLanguage } from "@/context/LanguageContext";

const UPI_ID = "r.abhigyan@ptyes";
const PAYEE_NAME = "Songadhwa Akhra No. 7 Committee";

const content = {
  en: { heading: "💰 Support the Mela", body: "Your contribution helps us organize a memorable Dhol Mela for the whole village. Scan the QR code below or use the UPI ID directly.", scan: "Scan with any UPI app (GPay, PhonePe, Paytm)" },
  hi: { heading: "💰 मेले का समर्थन करें", body: "आपका योगदान पूरे गांव के लिए एक यादगार ढोल मेला आयोजित करने में मदद करता है। नीचे दिए गए QR कोड को स्कैन करें या सीधे UPI ID का उपयोग करें।", scan: "किसी भी UPI ऐप से स्कैन करें (GPay, PhonePe, Paytm)" },
};

export default function DonatePage() {
  const { lang } = useLanguage();
  const t = content[lang];
  const upiUrl = `upi://pay?pa=${UPI_ID}&pn=${encodeURIComponent(PAYEE_NAME)}&cu=INR`;
  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(upiUrl)}`;

  return (
    <main>
      <Navbar />
      <section className="max-w-xl mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">{t.heading}</h1>
        <p className="text-gray-600 mb-8">{t.body}</p>
        <div className="border rounded-2xl p-8 inline-block">
          <img src={qrImageUrl} alt="UPI QR Code" className="mx-auto mb-4" />
          <p className="font-mono text-lg font-semibold">{UPI_ID}</p>
          <p className="text-sm text-gray-500 mt-1">{t.scan}</p>
        </div>
      </section>
    </main>
  );
}