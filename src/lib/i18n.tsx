"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Import locale files
import ja from "@/locales/ja.json";
import en from "@/locales/en.json";
import zh from "@/locales/zh.json";
import vi from "@/locales/vi.json";
import ko from "@/locales/ko.json";

export type Locale = "ja" | "en" | "zh" | "vi" | "ko";

export const LOCALES: { code: Locale; name: string; flag: string }[] = [
  { code: "ja", name: "日本語", flag: "🇯🇵" },
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "zh", name: "中文", flag: "🇨🇳" },
  { code: "vi", name: "Tiếng Việt", flag: "🇻🇳" },
  { code: "ko", name: "한국어", flag: "🇰🇷" },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const translations: Record<Locale, any> = {
  ja,
  en,
  zh,
  vi,
  ko,
};

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("ja");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Get saved locale or detect from browser
    const saved = localStorage.getItem("locale") as Locale | null;
    if (saved && translations[saved]) {
      setLocaleState(saved);
    } else {
      // Try to detect from browser language
      const browserLang = navigator.language.split("-")[0];
      if (browserLang === "ja") setLocaleState("ja");
      else if (browserLang === "zh") setLocaleState("zh");
      else if (browserLang === "vi") setLocaleState("vi");
      else if (browserLang === "ko") setLocaleState("ko");
      else setLocaleState("ja"); // Default to Japanese for Japan-focused app
    }
    setMounted(true);
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem("locale", newLocale);
  };

  const t = (key: string): string => {
    const keys = key.split(".");
    let value: unknown = translations[locale];
    
    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = (value as Record<string, unknown>)[k];
      } else {
        // Fallback to Japanese if key not found
        value = translations["ja"];
        for (const k2 of keys) {
          if (value && typeof value === "object" && k2 in value) {
            value = (value as Record<string, unknown>)[k2];
          } else {
            return key; // Return key if not found
          }
        }
        break;
      }
    }
    
    return typeof value === "string" ? value : key;
  };

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
}

export function useTranslation() {
  const { t, locale, setLocale } = useI18n();
  return { t, locale, setLocale };
}
