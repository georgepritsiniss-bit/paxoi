"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import type { HeroContent } from "@/types";

const DEFAULT_HERO_IMAGE =
  "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?auto=format&fit=crop&w=2400&q=80";

export default function Hero({ content }: { content?: HeroContent }) {
  const { t, locale } = useLanguage();

  const localized = content?.[locale];
  const eyebrow = localized?.eyebrow || t.hero.eyebrow;
  const title = localized?.title || t.hero.title;
  const subtitle = localized?.subtitle || t.hero.subtitle;
  const image = content?.image || DEFAULT_HERO_IMAGE;

  return (
    <section className="relative h-[100svh] min-h-[560px] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={image}
          alt="Luxury villa above the Ionian sea"
          fill
          priority
          sizes="100vw"
          className="object-cover animate-slow-zoom"
        />
        {/* Top scrim — pairs with the translucent navbar so the brand mark
            and links always read crisply against any hero image. */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-ink-900/65 via-ink-900/25 to-transparent" />
        {/* Body / bottom scrim for headline legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ink-900/10 to-ink-900/70" />
        <div className="film-grain" />
      </div>

      <div className="relative z-10 flex h-full items-end pb-20 sm:pb-24 md:pb-32">
        <div className="container-px mx-auto max-w-7xl">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-block rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-[11px] uppercase tracking-[0.3em] text-white backdrop-blur sm:text-xs"
          >
            {eyebrow}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-4xl font-serif text-4xl font-light leading-[1.05] tracking-tight text-white text-balance sm:text-5xl md:text-6xl lg:text-7xl"
          >
            {title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5 }}
            className="mt-5 max-w-2xl text-sm leading-relaxed text-white/85 sm:mt-6 sm:text-base md:text-lg"
          >
            {subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.7 }}
            className="mt-8 flex flex-wrap items-center gap-3 sm:mt-10"
          >
            <Link
              href="/villas"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-ink-900 transition-all hover:bg-sand-100 hover:-translate-y-0.5 sm:px-7 sm:py-3.5"
            >
              {t.hero.exploreCta}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/villas"
              className="inline-flex items-center gap-2 rounded-full border border-white/50 px-6 py-3 text-sm font-medium text-white transition-all hover:border-white hover:bg-white/10 sm:px-7 sm:py-3.5"
            >
              {t.hero.bookCta}
            </Link>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 text-white/70 sm:block"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] uppercase tracking-[0.4em]">Scroll</span>
          <span className="relative block h-10 w-px bg-white/30">
            <motion.span
              className="absolute inset-x-0 top-0 block h-3 w-px bg-white"
              animate={{ y: [0, 28, 0], opacity: [1, 0.2, 1] }}
              transition={{
                duration: 2.2,
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
