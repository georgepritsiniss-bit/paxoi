"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export default function AboutSection() {
  const { t } = useLanguage();
  return (
    <section className="container-px mx-auto max-w-7xl py-24 md:py-32">
      <div className="grid items-center gap-12 md:grid-cols-2 md:gap-20">
        <motion.div
          initial={{ opacity: 0, x: -32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative aspect-[4/5] overflow-hidden rounded-3xl"
        >
          <Image
            src="https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1400&q=80"
            alt="Olive groves above the Ionian sea"
            fill
            sizes="(min-width:768px) 50vw, 100vw"
            className="object-cover"
          />
        </motion.div>

        <div>
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="eyebrow"
          >
            {t.home.aboutEyebrow}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-3 h-section text-balance"
          >
            {t.home.aboutTitle}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-ink-500"
          >
            {t.home.aboutBody}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-8 grid grid-cols-3 gap-4"
          >
            {[
              { k: "3", v: "Private villas" },
              { k: "22", v: "Guests max" },
              { k: "0", v: "Booking fees" },
            ].map((s) => (
              <div key={s.v} className="rounded-2xl bg-sand-100/60 p-4">
                <div className="font-serif text-3xl text-ink-900">{s.k}</div>
                <div className="mt-1 text-xs text-ink-500">{s.v}</div>
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
