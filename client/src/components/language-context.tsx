import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { type Language, getTranslation } from "@/lib/i18n";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("peptide-europe-lang");
      if (saved && ["en", "de", "fr", "es", "it", "nl"].includes(saved)) {
        return saved as Language;
      }
    }
    return "en";
  });

  useEffect(() => {
    localStorage.setItem("peptide-europe-lang", language);
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string) => getTranslation(language, key);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
