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
        "inline-flex items-center rounded-full border p-1 text-xs font-medium backdrop-blur transition-colors",
        overHero
          ? "border-white/30 bg-white/10"
          : "border-ink-900/10 bg-white/60"
      )}
    >
      {(["en", "gr"] as const).map((l) => {
        const active = locale === l;
        return (
          <button
            key={l}
            onClick={() => setLocale(l)}
            className={cn(
              "rounded-full px-3 py-1 transition-all",
              overHero
                ? active
                  ? "bg-white text-ink-900 shadow-sm"
                  : "text-white/80 hover:text-white"
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
