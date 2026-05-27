"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export default function CallToAction() {
  const { t } = useLanguage();
  return (
    <section className="container-px mx-auto max-w-7xl pb-24">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8 }}
        className="relative overflow-hidden rounded-3xl"
      >
        <div className="relative aspect-[16/8] min-h-[420px]">
          <Image
            src="https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=2200&q=80"
            alt="Infinity pool overlooking the Ionian sea"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink-900/70 via-ink-900/40 to-ink-900/10" />
        </div>
        <div className="absolute inset-0 flex flex-col justify-center p-8 md:p-16">
          <h3 className="max-w-2xl font-serif text-3xl font-light text-white md:text-5xl">
            {t.home.ctaTitle}
          </h3>
          <p className="mt-4 max-w-xl text-sm text-white/80 md:text-base">
            {t.home.ctaBody}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/villas"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-medium text-ink-900 transition-all hover:-translate-y-0.5 hover:bg-sand-100"
            >
              {t.hero.exploreCta}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/50 px-7 py-3.5 text-sm font-medium text-white transition-all hover:bg-white/10"
            >
              {t.nav.contact}
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
