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
  const previewImages = villa.images.slice(0, 3);

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative overflow-hidden rounded-[1.75rem] bg-white shadow-card ring-1 ring-ink-900/[0.04] card-lift"
    >
      <Link href={`/villas/${villa.slug}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-ink-100">
          {cover && (
            <Image
              src={cover}
              alt={villa.name}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
              loading={index < 3 ? "eager" : "lazy"}
              className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-110"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-ink-900/70 via-ink-900/10 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />
          <FavoriteButton
            villaId={villa.id}
            initialFavorited={initialFavorited}
          />

          {villa.location && (
            <div className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/15 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-xl">
              <MapPin className="h-3 w-3" />
              {villa.location}
            </div>
          )}

          {villa.price_from != null && (
            <div className="absolute bottom-4 left-4 inline-flex items-baseline gap-1.5 rounded-full border border-white/30 bg-white/95 px-4 py-2 text-xs font-medium text-ink-900 shadow-float backdrop-blur">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-ink-400">
                {t.listing.from}
              </span>
              <span className="font-serif text-base">
                {formatPrice(villa.price_from)}
              </span>
              <span className="text-[10px] text-ink-400">
                /{t.listing.perNight}
              </span>
            </div>
          )}
        </div>

        {previewImages.length > 1 && (
          <div className="grid grid-cols-3 gap-1.5 p-1.5">
            {previewImages.slice(1, 4).map((img) => (
              <div
                key={img.id}
                className="relative aspect-[4/3] overflow-hidden rounded-xl bg-ink-100 ring-1 ring-ink-900/5"
              >
                <Image
                  src={img.image_url}
                  alt={img.alt || villa.name}
                  fill
                  sizes="(min-width: 1024px) 16vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            ))}
          </div>
        )}

        <div className="p-6 md:p-7">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="font-serif text-2xl font-light text-ink-900 transition-colors group-hover:text-sand-700 md:text-[1.65rem]">
                {villa.name}
              </h3>
              {villa.tagline && (
                <p className="mt-1.5 text-sm text-ink-500">{villa.tagline}</p>
              )}
            </div>
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-ink-900 text-sand-50 shadow-sm transition-all duration-300 group-hover:rotate-45 group-hover:bg-sand-600 group-hover:shadow-glow">
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-4 border-t border-ink-900/5 pt-5 text-xs font-medium text-ink-500">
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

          <div className="mt-5 flex flex-wrap gap-2">
            {villa.amenities.slice(0, 5).map((a) => (
              <span
                key={a}
                className="inline-flex items-center gap-1.5 rounded-full border border-sand-200/80 bg-sand-50/80 px-3 py-1 text-xs text-ink-700"
              >
                <AmenityIcon label={a} className="h-3 w-3 text-sand-600" />
                {a}
              </span>
            ))}
            {villa.amenities.length > 5 && (
              <span className="rounded-full px-2 py-1 text-xs text-ink-400">
                +{villa.amenities.length - 5}
              </span>
            )}
          </div>

          <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-ink-900">
            <span>{t.listing.viewDetails}</span>
            <span className="h-px w-8 bg-gradient-to-r from-sand-500 to-sand-400 transition-all group-hover:w-16" />
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
