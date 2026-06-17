"use client";

import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { cn } from "@/lib/utils";

export default function LanguageSwitcher({
  overHero = false,
}: {
  overHero?: boolean;
}) {
  const { locale, setLocale } = useLanguage();
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border p-1 text-xs font-semibold backdrop-blur-xl transition-all",
        overHero
          ? "border-white/25 bg-white/10"
          : "border-ink-900/10 bg-white/70 shadow-sm"
      )}
    >
      {(["en", "gr"] as const).map((l) => {
        const active = locale === l;
        return (
          <button
            key={l}
            onClick={() => setLocale(l)}
            className={cn(
              "rounded-full px-3 py-1.5 transition-all duration-300",
              overHero
                ? active
                  ? "bg-white text-ink-900 shadow-sm"
                  : "text-white/75 hover:text-white"
                : active
                ? "bg-ink-900 text-sand-50 shadow-sm"
                : "text-ink-500 hover:text-ink-900"
            )}
          >
            {l.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
}
