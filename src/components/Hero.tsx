"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?auto=format&fit=crop&w=2400&q=80";

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative h-[100svh] min-h-[640px] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={HERO_IMAGE}
          alt="Luxury villa above the Ionian sea"
          fill
          priority
          sizes="100vw"
          className="object-cover animate-slow-zoom"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-900/30 via-ink-900/10 to-ink-900/70" />
      </div>

      <div className="relative z-10 flex h-full items-end pb-24 md:pb-32">
        <div className="container-px mx-auto max-w-7xl">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-block rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs uppercase tracking-[0.3em] text-white backdrop-blur"
          >
            {t.hero.eyebrow}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-4xl font-serif text-5xl font-light leading-[1.05] tracking-tight text-white text-balance md:text-6xl lg:text-7xl"
          >
            {t.hero.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5 }}
            className="mt-6 max-w-2xl text-base leading-relaxed text-white/85 md:text-lg"
          >
            {t.hero.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.7 }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <Link
              href="/villas"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-medium text-ink-900 transition-all hover:bg-sand-100 hover:-translate-y-0.5"
            >
              {t.hero.exploreCta}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/villas"
              className="inline-flex items-center gap-2 rounded-full border border-white/50 px-7 py-3.5 text-sm font-medium text-white transition-all hover:border-white hover:bg-white/10"
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
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-white/70"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
          <span className="h-10 w-px bg-white/40">
            <span className="block h-3 w-px animate-pulse bg-white" />
          </span>
        </div>
      </motion.div>
    </section>
  );
}
