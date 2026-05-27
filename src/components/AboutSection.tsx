"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import type { AboutContent } from "@/types";

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1400&q=80";

const DEFAULT_STATS = [
  { k: "3", v: "Private villas" },
  { k: "22", v: "Guests max" },
  { k: "0", v: "Booking fees" },
];

export default function AboutSection({ content }: { content?: AboutContent }) {
  const { t, locale } = useLanguage();

  const localized = content?.[locale];
  const eyebrow = localized?.eyebrow || t.home.aboutEyebrow;
  const title = localized?.title || t.home.aboutTitle;
  const body = localized?.body || t.home.aboutBody;
  const image = content?.image || DEFAULT_IMAGE;
  const stats =
    content?.stats && content.stats.length > 0 ? content.stats : DEFAULT_STATS;

  return (
    <section className="container-px mx-auto max-w-7xl py-20 md:py-28 lg:py-32">
      <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16 lg:gap-20">
        <motion.div
          initial={{ opacity: 0, x: -32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative aspect-[4/5] overflow-hidden rounded-3xl"
        >
          <Image
            src={image}
            alt="Olive groves above the Ionian sea"
            fill
            sizes="(min-width:768px) 50vw, 100vw"
            className="object-cover transition-transform duration-[1500ms] hover:scale-[1.04]"
          />
        </motion.div>

        <div>
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="eyebrow"
          >
            {eyebrow}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-3 h-section text-balance"
          >
            {title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-5 max-w-xl text-base leading-relaxed text-ink-500 sm:mt-6"
          >
            {body}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-8 grid grid-cols-3 gap-3 sm:gap-4"
          >
            {stats.map((s) => (
              <div
                key={`${s.k}-${s.v}`}
                className="rounded-2xl bg-sand-100/60 p-3 transition-colors hover:bg-sand-100 sm:p-4"
              >
                <div className="font-serif text-2xl text-ink-900 sm:text-3xl">
                  {s.k}
                </div>
                <div className="mt-1 text-[11px] text-ink-500 sm:text-xs">
                  {s.v}
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-8"
          >
            <Link href="/villas" className="btn-primary group">
              {t.hero.exploreCta}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
