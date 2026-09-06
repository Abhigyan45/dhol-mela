"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import { useLanguage } from "@/context/LanguageContext";

const content = {
  en: {
    heading: "📞 Contact Us", sub: "Dhol Mela Committee — Songadhwa, Bairagitola, Gopalganj, Bihar",
    thanks: "Thank you — your message has been sent to the committee.",
    name: "Your name", email: "Email or phone (optional)", message: "Your message",
    send: "Send Message", sending: "Sending...", error: "Something went wrong — please try again.",
  },
  hi: {
    heading: "📞 संपर्क करें", sub: "ढोल मेला समिति — सोंगढ़वा, बैरागीटोला, गोपालगंज, बिहार",
    thanks: "धन्यवाद — आपका संदेश समिति को भेज दिया गया है।",
    name: "आपका नाम", email: "ईमेल या फोन (वैकल्पिक)", message: "आपका संदेश",
    send: "संदेश भेजें", sending: "भेजा जा रहा है...", error: "कुछ गलत हो गया — कृपया पुनः प्रयास करें।",
  },
};

export default function ContactPage() {
  const { lang } = useLanguage();
  const t = content[lang];
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message }),
    });
    if (res.ok) {
      setStatus("sent");
      setName(""); setEmail(""); setMessage("");
    } else {
      setStatus("error");
    }
  }

  return (
    <main>
      <Navbar />
      <section className="max-w-xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-2">{t.heading}</h1>
        <p className="text-gray-600 mb-8">{t.sub}</p>
        {status === "sent" ? (
          <div className="border rounded-xl p-6 bg-green-50 text-green-700 text-center">{t.thanks}</div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="text" placeholder={t.name} value={name} onChange={(e) => setName(e.target.value)} className="w-full border rounded-lg px-4 py-2" required />
            <input type="email" placeholder={t.email} value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border rounded-lg px-4 py-2" />
            <textarea placeholder={t.message} value={message} onChange={(e) => setMessage(e.target.value)} className="w-full border rounded-lg px-4 py-2 h-32" required />
            <button type="submit" disabled={status === "sending"} className="bg-orange-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-orange-700 disabled:opacity-50">
              {status === "sending" ? t.sending : t.send}
            </button>
            {status === "error" && <p className="text-red-600 text-sm">{t.error}</p>}
          </form>
        )}
      </section>
    </main>
  );
}