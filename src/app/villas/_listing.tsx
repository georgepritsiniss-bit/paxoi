"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
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
    <div>
      <div className="relative overflow-hidden bg-gradient-to-b from-sand-100/60 to-transparent pb-12 pt-16 md:pb-16 md:pt-24">
        <div className="orb -right-20 top-0 h-64 w-64 bg-sand-300/20" />
        <div className="container-px relative mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3"
          >
            <span className="gold-line" />
            <span className="eyebrow">Paxos, Greece</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="page-header mt-4 h-display max-w-3xl text-balance"
          >
            {t.listing.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-5 max-w-2xl text-base leading-relaxed text-ink-500 md:text-lg"
          >
            {t.listing.subtitle}
          </motion.p>
        </div>
      </div>

      <div className="container-px mx-auto max-w-7xl pb-20 md:pb-28">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
          <div className="mt-16 grid place-items-center rounded-[1.75rem] border border-dashed border-sand-300 bg-white/50 p-16 text-center">
            <p className="text-ink-500">
              No villas yet. Run the seed file in Supabase to add three demo
              villas.
            </p>
            <Link href="/contact" className="btn-primary mt-6 group">
              Contact us
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
