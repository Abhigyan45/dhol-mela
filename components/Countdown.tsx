"use client";

import { useEffect, useState } from "react";

const MELA_DATE = new Date("2026-10-15T00:00:00+05:30"); // IST

function getTimeLeft() {
  const now = new Date();
  const diff = MELA_DATE.getTime() - now.getTime();

  if (diff <= 0) return null;

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState<ReturnType<typeof getTimeLeft>>(null);

  useEffect(() => {
    setTimeLeft(getTimeLeft());
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!timeLeft) {
    return <p className="text-orange-600 font-semibold text-lg">🎉 The Mela is here!</p>;
  }

  const units = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <div className="flex justify-center gap-4 md:gap-6">
      {units.map((unit) => (
        <div key={unit.label} className="bg-white rounded-xl shadow-sm border px-4 py-3 min-w-[70px] text-center">
          <p className="text-2xl md:text-3xl font-bold text-orange-600">{unit.value}</p>
          <p className="text-xs text-gray-500 uppercase tracking-wide">{unit.label}</p>
        </div>
      ))}
    </div>
  );
}