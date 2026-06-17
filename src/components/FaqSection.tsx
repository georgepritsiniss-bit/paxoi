"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { cn } from "@/lib/utils";
import type { FaqContent, FaqItem } from "@/types";

const DEFAULT_FAQ: FaqItem[] = [
  {
    en: {
      q: "How do I book a villa?",
      a: "Browse our villas, pick your dates on the availability calendar, then book directly via Booking.com or Airbnb — or contact us for a bespoke stay.",
    },
    gr: {
      q: "Πώς κάνω κράτηση;",
      a: "Δείτε τις βίλες, ελέγξτε τη διαθεσιμότητα και κλείστε μέσω Booking.com ή Airbnb — ή επικοινωνήστε μαζί μας.",
    },
  },
  {
    en: {
      q: "Can we rent all three villas together?",
      a: "Yes — perfect for weddings, retreats or large family gatherings. Contact us for a private quote.",
    },
    gr: {
      q: "Μπορούμε να νοικιάσουμε και τις τρεις βίλες;",
      a: "Ναι — ιδανικό για γάμους ή οικογενειακές διακοπές. Επικοινωνήστε μαζί μας για προσφορά.",
    },
  },
  {
    en: {
      q: "Is there a minimum stay?",
      a: "We typically require a 5-night minimum in peak season and 3 nights off-season. Long stays receive preferential rates.",
    },
    gr: {
      q: "Υπάρχει ελάχιστη διαμονή;",
      a: "Συνήθως 5 νύχτες στην υψηλή season και 3 εκτός. Οι μεγάλες διαμονές έχουν ειδικές τιμές.",
    },
  },
];

export default function FaqSection({
  content,
  compact = false,
}: {
  content?: FaqContent;
  compact?: boolean;
}) {
  const { locale } = useLanguage();
  const items =
    content?.items && content.items.length > 0 ? content.items : DEFAULT_FAQ;
  const [open, setOpen] = useState<number | null>(0);

  const display = compact ? items.slice(0, 4) : items;

  return (
    <section
      className={cn(
        "container-px mx-auto max-w-7xl",
        compact ? "py-16 md:py-20" : "py-16 md:py-24"
      )}
    >
      <div className="mx-auto max-w-2xl">
        <span className="eyebrow">FAQ</span>
        <h2 className="mt-3 h-section">Common questions</h2>

        <div className="mt-8 space-y-2">
          {display.map((item, i) => {
            const q =
              (locale === "gr" ? item.gr?.q : item.en?.q) || item.en?.q || "";
            const a =
              (locale === "gr" ? item.gr?.a : item.en?.a) || item.en?.a || "";
            const isOpen = open === i;
            return (
              <div
                key={i}
                className="overflow-hidden rounded-2xl border border-ink-900/5 bg-white shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="text-sm font-semibold text-ink-900 sm:text-base">
                    {q}
                  </span>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 shrink-0 text-ink-400 transition-transform",
                      isOpen && "rotate-180"
                    )}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <p className="border-t border-ink-900/5 px-5 py-4 text-sm leading-relaxed text-ink-500">
                        {a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {compact && items.length > 4 && (
          <Link
            href="/faq"
            className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-ink-900 hover:text-sand-600"
          >
            View all questions
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        )}
      </div>
    </section>
  );
}
