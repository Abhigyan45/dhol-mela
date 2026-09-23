"use client";

import { useState } from "react";

export default function HanumanFloat() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="fixed bottom-20 right-4 z-40 flex flex-col items-center hanuman-float">
      <button
        onClick={() => setDismissed(true)}
        aria-label="Hide"
        className="absolute -top-1 -right-1 w-5 h-5 bg-gray-700 text-white rounded-full text-xs flex items-center justify-center hover:bg-gray-900 z-10"
      >
        ✕
      </button>
      <a href="/about" aria-label="About the Mela">
        <img
            src="/images/hanuman-icon.png"
            alt="Jai Bajrangbali"
            className="w-16 h-16 md:w-20 md:h-20 drop-shadow-lg"
        />
      </a>
    </div>
  );
}
