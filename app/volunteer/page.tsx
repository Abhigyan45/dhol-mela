"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import { useLanguage } from "@/context/LanguageContext";

const content = {
  en: {
    heading: "🙋 Volunteer With Us", sub: "Help make this year's mela a success — sign up to volunteer with the committee.",
    thanks: "Thank you for signing up! The committee will reach out to you.",
    name: "Your name", phone: "Phone number", village: "Village/area (optional)",
    interest: "How would you like to help? (e.g. food stalls, crowd management, decoration)",
    photo: "Upload your photo", uploading: "Uploading photo...",
    submit: "Sign Up", submitting: "Submitting...", error: "Something went wrong — please try again.",
  },
  hi: {
    heading: "🙋 हमारे साथ स्वयंसेवा करें", sub: "इस साल के मेले को सफल बनाने में मदद करें — समिति के साथ स्वयंसेवक के रूप में साइन अप करें।",
    thanks: "साइन अप करने के लिए धन्यवाद! समिति आपसे संपर्क करेगी।",
    name: "आपका नाम", phone: "फोन नंबर", village: "गांव/क्षेत्र (वैकल्पिक)",
    interest: "आप कैसे मदद करना चाहेंगे? (जैसे भोजन स्टॉल, भीड़ प्रबंधन, सजावट)",
    photo: "अपनी तस्वीर अपलोड करें", uploading: "तस्वीर अपलोड हो रही है...",
    submit: "साइन अप करें", submitting: "जमा किया जा रहा है...", error: "कुछ गलत हो गया — कृपया पुनः प्रयास करें।",
  },
};

export default function VolunteerPage() {
  const { lang } = useLanguage();
  const t = content[lang];
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [village, setVillage] = useState("");
  const [interest, setInterest] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [honeypot, setHoneypot] = useState("");
  const [formLoadTime] = useState(Date.now());

  async function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
  const file = e.target.files?.[0];
  if (!file) return;

  setUploading(true);
  const formData = new FormData();
  formData.append("file", file);

  try {
    const res = await fetch("/api/upload", { method: "POST", body: formData });
    const data = await res.json();
    if (data.url) {
      setPhotoUrl(data.url);
    } else {
      alert("Upload failed: " + JSON.stringify(data));
    }
  } catch (err) {
    alert("Upload error: " + (err instanceof Error ? err.message : String(err)));
  }
  setUploading(false);
}

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    const res = await fetch("/api/volunteer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name, phone, village, interest, photoUrl,
        honeypot,
        elapsedMs: Date.now() - formLoadTime,
      }),
    });
    if (res.ok) {
      setStatus("sent");
      setName(""); setPhone(""); setVillage(""); setInterest(""); setPhotoUrl("");
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
            <input
              type="text"
              name="website"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              style={{ position: "absolute", left: "-9999px" }}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />
            <input type="text" placeholder={t.name} value={name} onChange={(e) => setName(e.target.value)} className="w-full border rounded-lg px-4 py-2" required />
            <input type="tel" placeholder={t.phone} value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full border rounded-lg px-4 py-2" required />
            <input type="text" placeholder={t.village} value={village} onChange={(e) => setVillage(e.target.value)} className="w-full border rounded-lg px-4 py-2" />
            <textarea placeholder={t.interest} value={interest} onChange={(e) => setInterest(e.target.value)} className="w-full border rounded-lg px-4 py-2 h-24" />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.photo}</label>
              <input type="file" accept="image/*" onChange={handlePhotoChange} className="w-full text-sm" />
              {uploading && <p className="text-sm text-gray-500 mt-1">{t.uploading}</p>}
              {photoUrl && !uploading && (
                <img src={photoUrl} alt="Preview" className="w-20 h-20 rounded-full object-cover mt-2" />
              )}
            </div>

            <button type="submit" disabled={status === "sending" || uploading} className="bg-orange-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-orange-700 disabled:opacity-50">
              {status === "sending" ? t.submitting : t.submit}
            </button>
            {status === "error" && <p className="text-red-600 text-sm">{t.error}</p>}
          </form>
        )}
      </section>
    </main>
  );
}