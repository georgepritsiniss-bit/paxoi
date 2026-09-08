"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, BedDouble, Bath, Users, MapPin } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { formatPrice } from "@/lib/utils";
import type { VillaWithImages } from "@/types";
import AmenityIcon from "./AmenityIcon";
import FavoriteButton from "./FavoriteButton";

export default function VillaCard({
  villa,
  initialFavorited = false,
  index = 0,
}: {
  villa: VillaWithImages;
  initialFavorited?: boolean;
  index?: number;
}) {
  const { t } = useLanguage();
  const cover = villa.hero_image || villa.images[0]?.image_url;

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{
        duration: 0.7,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative overflow-hidden rounded-[1.5rem] bg-white shadow-card ring-1 ring-ink-900/[0.05] card-lift"
    >
      <Link href={`/villas/${villa.slug}`} className="block">
        <div className="relative aspect-[5/4] overflow-hidden bg-ink-100">
          {cover && (
            <Image
              src={cover}
              alt={villa.name}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
              loading={index < 3 ? "eager" : "lazy"}
              className="object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-[1.06]"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-ink-900/50 via-transparent to-transparent opacity-80" />
          <FavoriteButton
            villaId={villa.id}
            initialFavorited={initialFavorited}
          />

          {villa.location && (
            <div className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.16em] text-white backdrop-blur-xl">
              <MapPin className="h-3 w-3 opacity-80" />
              {villa.location}
            </div>
          )}

          {villa.price_from != null && (
            <div className="absolute bottom-4 left-4 inline-flex items-baseline gap-1.5 rounded-full border border-white/40 bg-white/95 px-3.5 py-2 text-xs text-ink-900 shadow-float backdrop-blur">
              <span className="text-[9px] uppercase tracking-[0.16em] text-ink-400">
                {t.listing.from}
              </span>
              <span className="font-serif text-[15px]">
                {formatPrice(villa.price_from)}
              </span>
              <span className="text-[10px] text-ink-400">
                /{t.listing.perNight}
              </span>
            </div>
          )}
        </div>

        <div className="p-6 md:p-7">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="font-serif text-[1.65rem] leading-tight tracking-tight text-ink-900 transition-colors group-hover:text-sand-700">
                {villa.name}
              </h3>
              {villa.tagline && (
                <p className="mt-2 text-sm font-light leading-relaxed text-ink-500">
                  {villa.tagline}
                </p>
              )}
            </div>
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-ink-900 text-sand-50 transition-all duration-500 group-hover:rotate-45 group-hover:bg-sand-600">
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-ink-900/[0.06] pt-5 text-[12px] text-ink-500">
            <span className="inline-flex items-center gap-1.5">
              <Users className="h-3.5 w-3.5 text-sand-600" /> {villa.capacity}{" "}
              {t.listing.guests}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <BedDouble className="h-3.5 w-3.5 text-sand-600" />{" "}
              {villa.bedrooms} {t.listing.bedrooms}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Bath className="h-3.5 w-3.5 text-sand-600" /> {villa.bathrooms}{" "}
              {t.listing.bathrooms}
            </span>
          </div>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {villa.amenities.slice(0, 4).map((a) => (
              <span
                key={a}
                className="inline-flex items-center gap-1.5 rounded-full bg-sand-100/80 px-2.5 py-1 text-[11px] text-ink-600"
              >
                <AmenityIcon label={a} className="h-3 w-3 text-sand-600" />
                {a}
              </span>
            ))}
          </div>

          <div className="mt-6 inline-flex items-center gap-2.5 text-[13px] font-medium text-ink-900">
            <span>{t.listing.viewDetails}</span>
            <span className="h-px w-8 bg-gradient-to-r from-sand-500 to-sand-300 transition-all duration-500 group-hover:w-14" />
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
