"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { translations, type Locale, type Translations } from "./translations";

type Ctx = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: Translations;
};

const LanguageContext = createContext<Ctx | null>(null);

const DEFAULT_LOCALE: Locale = "gr";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);

  useEffect(() => {
    const stored = (typeof window !== "undefined" &&
      window.localStorage.getItem("paxoi.locale")) as Locale | null;
    if (stored === "en" || stored === "gr") setLocaleState(stored);

    // Keep the document <html lang> attribute in sync so screen readers,
    // browser translation prompts, and SEO crawlers see the active locale.
    if (typeof document !== "undefined") {
      document.documentElement.lang = stored === "en" ? "en" : "el";
    }
  }, []);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("paxoi.locale", l);
    }
    if (typeof document !== "undefined") {
      document.documentElement.lang = l === "en" ? "en" : "el";
    }
  }, []);

  const value = useMemo<Ctx>(
    () => ({ locale, setLocale, t: translations[locale] }),
    [locale, setLocale]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
