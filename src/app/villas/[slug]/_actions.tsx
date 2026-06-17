"use client";

import { motion } from "framer-motion";
import { ExternalLink, CalendarCheck } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { formatPrice } from "@/lib/utils";

export default function VillaActions({
  bookingUrl,
  airbnbUrl,
  priceFrom,
}: {
  bookingUrl: string | null;
  airbnbUrl: string | null;
  priceFrom: number | null;
}) {
  const { t } = useLanguage();
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass rounded-[1.75rem] p-6 shadow-float md:p-7"
    >
      {priceFrom != null && (
        <div className="flex items-baseline gap-2 border-b border-ink-900/5 pb-5">
          <span className="text-xs font-semibold uppercase tracking-wider text-ink-400">
            {t.listing.from}
          </span>
          <span className="font-serif text-4xl text-ink-900">
            {formatPrice(priceFrom)}
          </span>
          <span className="text-xs text-ink-400">/ {t.listing.perNight}</span>
        </div>
      )}

      <button
        type="button"
        className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full border border-ink-900/10 bg-ink-900/5 px-5 py-3.5 text-sm font-semibold text-ink-900 transition-all hover:border-sand-300/50 hover:bg-sand-50"
        onClick={() => {
          document
            .querySelector("#contact")
            ?.scrollIntoView({ behavior: "smooth" });
        }}
      >
        <CalendarCheck className="h-4 w-4" />
        {t.detail.checkAvailability}
      </button>

      <div className="mt-3 grid gap-2">
        {bookingUrl && (
          <a
            href={bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#003580] px-5 py-3.5 text-sm font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
          >
            {t.detail.bookBooking}
            <ExternalLink className="h-4 w-4 opacity-80 transition group-hover:opacity-100" />
          </a>
        )}
        {airbnbUrl && (
          <a
            href={airbnbUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#FF385C] px-5 py-3.5 text-sm font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
          >
            {t.detail.bookAirbnb}
            <ExternalLink className="h-4 w-4 opacity-80 transition group-hover:opacity-100" />
          </a>
        )}
      </div>

      <p className="mt-4 text-center text-xs text-ink-400">
        Secure booking via our trusted partners. No fees added.
      </p>
    </motion.div>
  );
}
