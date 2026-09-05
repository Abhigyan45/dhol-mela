"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";

export default function VolunteerPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [village, setVillage] = useState("");
  const [interest, setInterest] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    const res = await fetch("/api/volunteer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, phone, village, interest }),
    });
    if (res.ok) {
      setStatus("sent");
      setName(""); setPhone(""); setVillage(""); setInterest("");
    } else {
      setStatus("error");
    }
  }

  return (
    <main>
      <Navbar />
      <section className="max-w-xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-2">🙋 Volunteer With Us</h1>
        <p className="text-gray-600 mb-8">
          Help make this year's mela a success — sign up to volunteer with the committee.
        </p>
        {status === "sent" ? (
          <div className="border rounded-xl p-6 bg-green-50 text-green-700 text-center">
            Thank you for signing up! The committee will reach out to you.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="text" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} className="w-full border rounded-lg px-4 py-2" required />
            <input type="tel" placeholder="Phone number" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full border rounded-lg px-4 py-2" required />
            <input type="text" placeholder="Village/area (optional)" value={village} onChange={(e) => setVillage(e.target.value)} className="w-full border rounded-lg px-4 py-2" />
            <textarea placeholder="How would you like to help? (e.g. food stalls, crowd management, decoration)" value={interest} onChange={(e) => setInterest(e.target.value)} className="w-full border rounded-lg px-4 py-2 h-24" />
            <button type="submit" disabled={status === "sending"} className="bg-orange-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-orange-700 disabled:opacity-50">
              {status === "sending" ? "Submitting..." : "Sign Up"}
            </button>
            {status === "error" && <p className="text-red-600 text-sm">Something went wrong — please try again.</p>}
          </form>
        )}
      </section>
    </main>
  );
}