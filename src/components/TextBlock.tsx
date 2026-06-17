"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import type { TextBlockContent } from "@/types";

export default function TextBlock({ content }: { content?: TextBlockContent }) {
  const { t, locale } = useLanguage();
  const localized = content?.[locale];
  const eyebrow = localized?.eyebrow || t.home.aboutEyebrow;
  const title = localized?.title || "";
  const body = localized?.body || localized?.subtitle || "";

  if (!title && !body) return null;

  return (
    <section className="container-px mx-auto max-w-7xl py-16 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mx-auto max-w-3xl text-center"
      >
        {eyebrow && (
          <div className="flex items-center justify-center gap-3">
            <span className="gold-line" />
            <span className="eyebrow">{eyebrow}</span>
            <span className="gold-line" />
          </div>
        )}
        {title && (
          <h2 className="mt-4 h-section text-balance">{title}</h2>
        )}
        {body && (
          <p className="mt-5 text-base leading-relaxed text-ink-500 md:text-lg">
            {body}
          </p>
        )}
      </motion.div>
    </section>
  );
}
