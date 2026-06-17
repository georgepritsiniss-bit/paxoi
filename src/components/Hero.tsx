"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import ImageSlider from "@/components/ImageSlider";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import type { HeroContent } from "@/types";

const DEFAULT_HERO_IMAGE =
  "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?auto=format&fit=crop&w=2400&q=80";

const HERO_STATS = [
  { value: "3", label: "Private villas" },
  { value: "∞", label: "Sea views" },
  { value: "24/7", label: "Concierge" },
];

export default function Hero({ content }: { content?: HeroContent }) {
  const { t, locale } = useLanguage();

  const localized = content?.[locale];
  const eyebrow = localized?.eyebrow || t.hero.eyebrow;
  const title = localized?.title || t.hero.title;
  const subtitle = localized?.subtitle || t.hero.subtitle;

  const slides =
    content?.images && content.images.length > 0
      ? content.images
      : [{ url: content?.image || DEFAULT_HERO_IMAGE, alt: "Luxury villa" }];

  const autoplay = content?.autoplay ?? 6;

  return (
    <section className="relative h-[100svh] min-h-[520px] w-full overflow-hidden sm:min-h-[580px]">
      <div className="absolute inset-0">
        <ImageSlider
          images={slides}
          autoplay={slides.length > 1 ? autoplay : 0}
          aspectClass="h-full min-h-[520px] sm:min-h-[580px]"
          className="h-full w-full !rounded-none"
          rounded="rounded-none"
          sizes="100vw"
          priority
          showArrows={slides.length > 1}
          showDots={slides.length > 1}
          showCounter={slides.length > 1}
        />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-ink-900/70 via-ink-900/30 to-transparent sm:h-40" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-ink-900/25 via-transparent to-ink-900/75" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-900/85 via-ink-900/15 to-transparent" />
        <div className="film-grain pointer-events-none" />
      </div>

      <div className="pointer-events-none absolute -right-16 top-1/4 hidden h-48 w-48 rounded-full bg-sand-400/20 blur-[80px] md:block" />

      <div className="relative z-10 flex h-full items-end pb-16 sm:pb-20 md:pb-28 lg:pb-32">
        <div className="container-px pointer-events-auto mx-auto max-w-7xl">
          <div className="grid items-end gap-8 lg:grid-cols-[1fr_auto] lg:gap-10">
            <div className="max-w-full">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.15 }}
                className="inline-flex max-w-full items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1.5 backdrop-blur-xl sm:px-4 sm:py-2"
              >
                <Sparkles className="h-3.5 w-3.5 shrink-0 text-sand-300" />
                <span className="truncate text-[10px] font-semibold uppercase tracking-[0.28em] text-white/90 sm:text-xs sm:tracking-[0.32em]">
                  {eyebrow}
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.9,
                  delay: 0.3,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="mt-4 max-w-4xl font-serif text-[2rem] font-light leading-[1.05] tracking-tight text-white text-balance sm:mt-6 sm:text-5xl md:text-6xl lg:text-7xl"
              >
                {title}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.45 }}
                className="mt-4 max-w-xl text-sm leading-relaxed text-white/85 sm:mt-5 sm:text-base md:text-lg"
              >
                {subtitle}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.6 }}
                className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center"
              >
                <Link
                  href="/villas"
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-ink-900 shadow-glow transition-all hover:-translate-y-0.5 hover:bg-sand-50 sm:w-auto sm:px-7 sm:py-3.5"
                >
                  {t.hero.exploreCta}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/contact"
                  className="btn-glass w-full justify-center sm:w-auto sm:px-7 sm:py-3.5"
                >
                  {t.hero.bookCta}
                </Link>
              </motion.div>
            </div>

            {/* Stats — horizontal on mobile, column on desktop */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.75 }}
              className="grid grid-cols-3 gap-2 sm:gap-3 lg:flex lg:flex-col lg:gap-3"
            >
              {HERO_STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + i * 0.08 }}
                  className="glass-dark rounded-xl px-3 py-3 text-center sm:rounded-2xl sm:px-5 sm:py-4 lg:min-w-[160px] lg:text-left"
                >
                  <div className="font-serif text-xl text-white sm:text-2xl lg:text-3xl">
                    {stat.value}
                  </div>
                  <div className="mt-0.5 text-[9px] uppercase tracking-[0.15em] text-white/60 sm:text-[11px] sm:tracking-[0.2em]">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-4 left-1/2 z-10 hidden -translate-x-1/2 sm:bottom-8 sm:block"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] font-medium uppercase tracking-[0.45em] text-white/50">
            Scroll
          </span>
          <span className="relative block h-10 w-px overflow-hidden rounded-full bg-white/20">
            <motion.span
              className="absolute inset-x-0 top-0 block h-3 w-px rounded-full bg-gradient-to-b from-sand-300 to-sand-500"
              animate={{ y: [0, 28, 0], opacity: [1, 0.15, 1] }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </span>
        </div>
      </motion.div>
    </section>
  );
}
