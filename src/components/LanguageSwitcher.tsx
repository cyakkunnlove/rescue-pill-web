"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, ChevronDown, Check } from "lucide-react";
import { useI18n, LOCALES } from "@/lib/i18n";

export function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const { locale, setLocale, t } = useI18n();
  const [isOpen, setIsOpen] = useState(false);

  const currentLocale = LOCALES.find((l) => l.code === locale);

  return (
    <div className="relative">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-label={t("common.selectLanguage")}
        onClick={() => setIsOpen(!isOpen)}
        className={`flex min-h-11 items-center gap-2 px-3 py-2 rounded-xl
                   bg-white/80 backdrop-blur-sm border border-primary-light
                   hover:border-primary transition-colors
                   ${compact ? "text-sm" : ""}`}
      >
        <Globe className="w-4 h-4 text-primary" />
        {compact ? (
          <span className="text-lg">{currentLocale?.flag}</span>
        ) : (
          <>
            <span className="text-text-primary">{currentLocale?.flag} {currentLocale?.name}</span>
          </>
        )}
        <ChevronDown
          className={`w-4 h-4 text-text-muted transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Dropdown */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg 
                        border border-primary-light overflow-hidden z-50"
            >
              {LOCALES.map((loc) => (
                <button
                  type="button"
                  key={loc.code}
                  aria-pressed={locale === loc.code}
                  onClick={() => {
                    setLocale(loc.code);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left
                            hover:bg-primary-light transition-colors
                            ${locale === loc.code ? "bg-primary-light/50" : ""}`}
                >
                  <span className="text-xl">{loc.flag}</span>
                  <span className="flex-1 text-text-primary">{loc.name}</span>
                  {locale === loc.code && (
                    <Check className="w-4 h-4 text-primary" />
                  )}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
