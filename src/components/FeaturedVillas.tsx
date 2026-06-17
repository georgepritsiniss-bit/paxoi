"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import VillaCard from "./VillaCard";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import type { VillaWithImages } from "@/types";

export default function FeaturedVillas({
  villas,
  favoriteIds,
}: {
  villas: VillaWithImages[];
  favoriteIds: string[];
}) {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-transparent via-sand-100/40 to-transparent py-24 md:py-32">
      <div className="container-px relative mx-auto max-w-7xl">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3"
            >
              <span className="gold-line" />
              <span className="eyebrow">{t.home.featuredTitle}</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-4 h-section max-w-2xl text-balance"
            >
              {t.home.featuredSubtitle}
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link
              href="/villas"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-ink-900 transition-colors hover:text-sand-600"
            >
              View all villas
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {villas.map((v, i) => (
            <VillaCard
              key={v.id}
              villa={v}
              initialFavorited={favoriteIds.includes(v.id)}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
