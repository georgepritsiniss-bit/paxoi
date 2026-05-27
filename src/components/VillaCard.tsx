"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, BedDouble, Bath, Users } from "lucide-react";
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
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group relative overflow-hidden rounded-3xl bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_30px_-12px_rgba(0,0,0,0.12)] transition-all hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.25)]"
    >
      <Link href={`/villas/${villa.slug}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-ink-100">
          {cover && (
            <Image
              src={cover}
              alt={villa.name}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
              className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-ink-900/40 via-transparent to-transparent" />
          <FavoriteButton villaId={villa.id} initialFavorited={initialFavorited} />
          {villa.price_from != null && (
            <div className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-ink-900 backdrop-blur">
              {t.listing.from} {formatPrice(villa.price_from)} · {t.listing.perNight}
            </div>
          )}
        </div>

        {previewImages.length > 1 && (
          <div className="grid grid-cols-3 gap-1 px-1 pt-1">
            {previewImages.slice(1, 4).map((img) => (
              <div
                key={img.id}
                className="relative aspect-[4/3] overflow-hidden rounded-xl bg-ink-100"
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

        <div className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="font-serif text-2xl font-light text-ink-900">
                {villa.name}
              </h3>
              {villa.tagline && (
                <p className="mt-1 text-sm text-ink-500">{villa.tagline}</p>
              )}
            </div>
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-ink-900 text-sand-50 transition-transform group-hover:rotate-45">
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-ink-500">
            <span className="inline-flex items-center gap-1.5">
              <Users className="h-3.5 w-3.5" /> {villa.capacity} {t.listing.guests}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <BedDouble className="h-3.5 w-3.5" /> {villa.bedrooms}{" "}
              {t.listing.bedrooms}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Bath className="h-3.5 w-3.5" /> {villa.bathrooms}{" "}
              {t.listing.bathrooms}
            </span>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {villa.amenities.slice(0, 5).map((a) => (
              <span
                key={a}
                className="inline-flex items-center gap-1.5 rounded-full bg-sand-100 px-3 py-1 text-xs text-ink-700"
              >
                <AmenityIcon label={a} className="h-3 w-3" />
                {a}
              </span>
            ))}
            {villa.amenities.length > 5 && (
              <span className="rounded-full px-2 py-1 text-xs text-ink-400">
                +{villa.amenities.length - 5}
              </span>
            )}
          </div>

          <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-ink-900">
            <span>{t.listing.viewDetails}</span>
            <span className="h-px w-8 bg-ink-900 transition-all group-hover:w-14" />
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
