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
    <section className="container-px mx-auto max-w-7xl pb-20 md:pb-24">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8 }}
        className="relative overflow-hidden rounded-3xl"
      >
        <div className="relative aspect-[16/9] min-h-[360px] sm:aspect-[16/8] sm:min-h-[420px]">
          <Image
            src={image}
            alt="Infinity pool overlooking the Ionian sea"
            fill
            sizes="100vw"
            className="object-cover transition-transform duration-[2000ms] hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink-900/85 via-ink-900/45 to-ink-900/10" />
          <div className="film-grain" />
        </div>
        <div className="absolute inset-0 flex flex-col justify-center p-6 sm:p-8 md:p-16">
          <h3 className="max-w-2xl font-serif text-2xl font-light text-white sm:text-3xl md:text-5xl">
            {title}
          </h3>
          <p className="mt-3 max-w-xl text-sm text-white/85 sm:mt-4 md:text-base">
            {body}
          </p>
          <div className="mt-6 flex flex-wrap gap-3 sm:mt-8">
            <Link
              href="/villas"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-ink-900 transition-all hover:-translate-y-0.5 hover:bg-sand-100 sm:px-7 sm:py-3.5"
            >
              {t.hero.exploreCta}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/50 px-6 py-3 text-sm font-medium text-white transition-all hover:bg-white/10 sm:px-7 sm:py-3.5"
            >
              {t.nav.contact}
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
