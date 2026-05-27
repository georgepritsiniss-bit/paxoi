"use client";

import { motion } from "framer-motion";
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
    <section className="container-px mx-auto max-w-7xl py-24 md:py-32">
      <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="eyebrow"
          >
            {t.home.featuredTitle}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-3 h-section max-w-2xl text-balance"
          >
            {t.home.featuredSubtitle}
          </motion.h2>
        </div>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {villas.map((v, i) => (
          <VillaCard
            key={v.id}
            villa={v}
            initialFavorited={favoriteIds.includes(v.id)}
            index={i}
          />
        ))}
      </div>
    </section>
  );
}
