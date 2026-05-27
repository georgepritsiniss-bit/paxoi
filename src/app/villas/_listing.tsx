"use client";

import { motion } from "framer-motion";
import VillaCard from "@/components/VillaCard";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import type { VillaWithImages } from "@/types";

export default function VillasListing({
  villas,
  favoriteIds,
}: {
  villas: VillaWithImages[];
  favoriteIds: string[];
}) {
  const { t } = useLanguage();
  return (
    <div className="container-px mx-auto max-w-7xl py-16 md:py-24">
      <motion.span
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="eyebrow"
      >
        Paxos, Greece
      </motion.span>
      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="mt-3 h-display max-w-3xl text-balance"
      >
        {t.listing.title}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="mt-4 max-w-2xl text-ink-500"
      >
        {t.listing.subtitle}
      </motion.p>

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

      {villas.length === 0 && (
        <div className="mt-16 grid place-items-center rounded-3xl border border-dashed border-ink-200 p-16 text-center text-ink-500">
          No villas yet. Run the seed file in Supabase to add three demo villas.
        </div>
      )}
    </div>
  );
}
