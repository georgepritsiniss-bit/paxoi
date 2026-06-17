"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import type { CtaContent } from "@/types";

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=2200&q=80";

export default function CallToAction({ content }: { content?: CtaContent }) {
  const { t, locale } = useLanguage();

  const localized = content?.[locale];
  const title = localized?.title || t.home.ctaTitle;
  const body = localized?.body || t.home.ctaBody;
  const image = content?.image || DEFAULT_IMAGE;

  return (
    <section className="container-px mx-auto max-w-7xl pb-24 md:pb-32">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8 }}
        className="group relative overflow-hidden rounded-[2rem] shadow-card-hover ring-1 ring-ink-900/5"
      >
        <div className="relative aspect-[16/9] min-h-[380px] sm:aspect-[16/8] sm:min-h-[440px]">
          <Image
            src={image}
            alt="Infinity pool overlooking the Ionian sea"
            fill
            sizes="100vw"
            className="object-cover transition-transform duration-[2500ms] group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink-900/90 via-ink-900/55 to-ink-900/20" />
          <div className="film-grain" />
        </div>

        <div className="absolute inset-0 flex items-center">
          <div className="p-6 sm:p-10 md:p-16 lg:p-20">
            <div className="max-w-xl md:max-w-2xl">
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="eyebrow-light"
              >
                Your escape awaits
              </motion.span>
              <h3 className="mt-4 font-serif text-3xl font-light leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
                {title}
              </h3>
              <p className="mt-4 max-w-lg text-sm leading-relaxed text-white/80 md:text-base">
                {body}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/villas"
                  className="group/btn inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-ink-900 shadow-glow transition-all hover:-translate-y-0.5 hover:bg-sand-50 hover:shadow-glow-lg"
                >
                  {t.hero.exploreCta}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                </Link>
                <Link href="/contact" className="btn-glass">
                  {t.nav.contact}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
