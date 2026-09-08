"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import ImageSlider from "@/components/ImageSlider";
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

  const slides =
    content?.images && content.images.length > 0
      ? content.images
      : [{ url: content?.image || DEFAULT_HERO_IMAGE, alt: "Luxury villa" }];

  const autoplay = content?.autoplay ?? 7;

  return (
    <section className="relative h-[100svh] min-h-[560px] w-full overflow-hidden sm:min-h-[640px]">
      <div className="absolute inset-0">
        <ImageSlider
          images={slides}
          autoplay={slides.length > 1 ? autoplay : 0}
          aspectClass="h-full min-h-[560px] sm:min-h-[640px]"
          className="h-full w-full !rounded-none"
          rounded="rounded-none"
          sizes="100vw"
          priority
          showArrows={slides.length > 1}
          showDots={slides.length > 1}
          showCounter={false}
        />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(22,20,18,0.25)_70%,rgba(22,20,18,0.7)_100%)]" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/30 to-ink-900/20" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-ink-900/50 to-transparent" />
        <div className="film-grain" />
      </div>

      <div className="relative z-10 flex h-full items-end pb-16 sm:pb-20 md:pb-28">
        <div className="container-px mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.15 }}
              className="flex items-center gap-4"
            >
              <span className="h-px w-8 bg-sand-300/80 sm:w-12" />
              <span className="text-[10px] font-medium uppercase tracking-luxury text-sand-200/90 sm:text-[11px]">
                {eyebrow}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="mt-5 font-serif text-[2.4rem] font-normal leading-[1.05] tracking-[-0.02em] text-white text-balance sm:mt-7 sm:text-5xl md:text-6xl lg:text-7xl"
            >
              {title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.45 }}
              className="mt-5 max-w-lg text-sm font-light leading-relaxed text-white/75 sm:mt-6 sm:text-base md:text-lg"
            >
              {subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.6 }}
              className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:items-center"
            >
              <Link
                href="/villas"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-8 py-3.5 text-[13px] font-medium tracking-wide text-ink-900 shadow-premium transition-all duration-500 hover:-translate-y-0.5 hover:bg-sand-50 sm:w-auto"
              >
                {t.hero.exploreCta}
                <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
              </Link>
              <Link href="/contact" className="btn-glass w-full justify-center sm:w-auto">
                {t.hero.bookCta}
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="mt-12 hidden items-center gap-8 border-t border-white/15 pt-8 sm:flex md:mt-16"
          >
            {[
              { k: "03", v: "Private villas" },
              { k: "1962", v: "Established spirit" },
              { k: "∞", v: "Ionian horizon" },
            ].map((item) => (
              <div key={item.v} className="min-w-[120px]">
                <div className="font-serif text-2xl text-white/95 md:text-3xl">
                  {item.k}
                </div>
                <div className="mt-1 text-[10px] uppercase tracking-[0.22em] text-white/45">
                  {item.v}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
