import { createContext, useContext, useEffect, useState } from "react";
import { LanguageCode, TranslationKey, translations } from "@/i18n/translations";

interface I18nContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: (key: TranslationKey, fallback?: string) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

const LANGUAGE_STORAGE_KEY = "harvest-app-language";

export const I18nProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguageState] = useState<LanguageCode>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY) as LanguageCode;
      if (stored && (stored === "en" || stored === "ta" || stored === "hi")) {
        return stored;
      }
      
      // Try to detect browser language
      const browserLang = navigator.language.split("-")[0];
      if (browserLang === "ta") return "ta";
      if (browserLang === "hi") return "hi";
    }
    
    return "en"; // Default language
  });

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
    localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
    document.documentElement.lang = lang;
    
    // Force a re-render of the app when language changes
    window.dispatchEvent(new Event('languagechange'));
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: TranslationKey, fallback?: string): string => {
    const translation = translations[language][key];
    // If the translation exists, return it, otherwise return the fallback or the key
    return translation || fallback || key;
  };

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => {
  const context = useContext(I18nContext);
  
  if (context === undefined) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  
  return context;
};
