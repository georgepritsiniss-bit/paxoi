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
    <section className="section-band container-px relative mx-auto max-w-7xl py-24 md:py-32 lg:py-40">
      <div className="orb -right-32 top-1/2 h-72 w-72 -translate-y-1/2 bg-sand-300/15" />

      <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16 lg:gap-24">
        <motion.div
          initial={{ opacity: 0, x: -32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-sand-200/40 to-sea-100/30 blur-2xl" />
          <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] shadow-card-hover ring-1 ring-ink-900/5">
            <Image
              src={image}
              alt="Olive groves above the Ionian sea"
              fill
              sizes="(min-width:768px) 50vw, 100vw"
              className="object-cover transition-transform duration-[2000ms] hover:scale-[1.05]"
            />
          </div>
          <div className="absolute -bottom-6 -right-4 hidden rounded-2xl glass px-5 py-4 md:block">
            <div className="text-[10px] font-semibold uppercase tracking-[0.25em] text-ink-400">
              Est. Paxos
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
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-4 h-section text-balance"
          >
            {title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-ink-500 md:text-lg"
          >
            {body}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-10 grid grid-cols-3 gap-3 sm:gap-4"
          >
            {stats.map((s, i) => (
              <motion.div
                key={`${s.k}-${s.v}`}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.35 + i * 0.08 }}
                className="group rounded-2xl border border-ink-900/5 bg-white/70 p-4 shadow-sm backdrop-blur transition-all duration-300 hover:border-sand-300/50 hover:shadow-float sm:p-5"
              >
                <div className="font-serif text-3xl text-ink-900 transition-colors group-hover:text-sand-600 sm:text-4xl">
                  {s.k}
                </div>
                <div className="mt-1 text-[11px] font-medium text-ink-500 sm:text-xs">
                  {s.v}
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-10"
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
