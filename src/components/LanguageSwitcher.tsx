"use client";

import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { cn } from "@/lib/utils";

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();
  return (
    <div className="inline-flex items-center rounded-full border border-ink-900/10 bg-white/60 p-1 text-xs font-medium backdrop-blur">
      {(["en", "gr"] as const).map((l) => (
        <button
          key={l}
          onClick={() => setLocale(l)}
          className={cn(
            "rounded-full px-3 py-1 transition-all",
            locale === l
              ? "bg-ink-900 text-sand-50 shadow-sm"
              : "text-ink-500 hover:text-ink-900"
          )}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
