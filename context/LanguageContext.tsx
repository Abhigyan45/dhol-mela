"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type Language = "en" | "hi";

type LanguageContextType = {
  lang: Language;
  toggleLang: () => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>("en");

  useEffect(() => {
    const saved = localStorage.getItem("dholmela_lang") as Language | null;
    if (saved === "en" || saved === "hi") setLang(saved);
  }, []);

  function toggleLang() {
    setLang((prev) => {
      const next = prev === "en" ? "hi" : "en";
      localStorage.setItem("dholmela_lang", next);
      return next;
    });
  }

  return (
    <LanguageContext.Provider value={{ lang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}