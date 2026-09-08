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
    <section className="container-px mx-auto max-w-7xl py-24 md:py-32 lg:py-36">
      <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16 lg:gap-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-70px" }}
          transition={{ duration: 0.85 }}
          className="relative"
        >
          <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-sand-200/50 to-sea-100/30 blur-2xl" />
          <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] shadow-premium ring-1 ring-ink-900/5">
            <Image
              src={image}
              alt="Olive groves above the Ionian sea"
              fill
              sizes="(min-width:768px) 50vw, 100vw"
              className="object-cover transition-transform duration-[2200ms] hover:scale-[1.04]"
            />
          </div>
          <div className="absolute -bottom-5 -right-3 hidden rounded-2xl glass px-5 py-4 md:block">
            <div className="text-[9px] font-medium uppercase tracking-luxury text-ink-400">
              Est. spirit
            </div>
            <div className="mt-1 font-serif text-2xl text-ink-900">1962</div>
          </div>
        </motion.div>

        <div>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3"
          >
            <span className="gold-line" />
            <span className="eyebrow">{eyebrow}</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-5 h-section text-balance"
          >
            {title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-6 max-w-xl text-base font-light leading-relaxed text-ink-500 md:text-lg"
          >
            {body}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-10 grid grid-cols-3 gap-3"
          >
            {stats.map((s) => (
              <div
                key={`${s.k}-${s.v}`}
                className="rounded-2xl border border-ink-900/[0.05] bg-white/70 p-4 shadow-sm backdrop-blur transition-all duration-500 hover:shadow-float"
              >
                <div className="font-serif text-3xl text-ink-900 sm:text-4xl">
                  {s.k}
                </div>
                <div className="mt-1 text-[11px] font-light text-ink-500">
                  {s.v}
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-10"
          >
            <Link href="/villas" className="btn-primary group">
              {t.hero.exploreCta}
              <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
