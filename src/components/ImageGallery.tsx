"use client";

import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X, Expand } from "lucide-react";
import ImageSlider from "@/components/ImageSlider";
import type { VillaImage } from "@/types";

export default function ImageGallery({
  images,
  alt,
}: {
  images: VillaImage[];
  alt: string;
}) {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);

  const slides = images.map((img) => ({
    url: img.image_url,
    alt: img.alt || alt,
  }));

  const next = useCallback(
    () => setLightbox((i) => (i == null ? null : (i + 1) % images.length)),
    [images.length]
  );
  const prev = useCallback(
    () =>
      setLightbox((i) =>
        i == null ? null : (i - 1 + images.length) % images.length
      ),
    [images.length]
  );

  useEffect(() => {
    if (lightbox == null) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    }
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [lightbox, next, prev]);

  if (!images.length) {
    return (
      <div
        className="aspect-[16/10] w-full rounded-[1.75rem] bg-ink-100 ring-1 ring-ink-900/5"
        aria-hidden
      />
    );
  }

  const thumbs = images.slice(0, 6);

  return (
    <>
      {/* Mobile: full-width swipe slider */}
      <div className="md:hidden">
        <ImageSlider
          images={slides}
          autoplay={0}
          aspectClass="aspect-[4/3]"
          sizes="100vw"
          priority
          showCounter
          onSlideChange={setActive}
        />
        <button
          type="button"
          onClick={() => setLightbox(active)}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-full border border-ink-900/10 bg-white py-2.5 text-sm font-medium text-ink-700"
        >
          <Expand className="h-4 w-4" />
          View fullscreen
        </button>
      </div>

      {/* Desktop: bento grid */}
      <div className="hidden grid-cols-4 gap-2 md:grid md:gap-3">
        <button
          type="button"
          onClick={() => setLightbox(active)}
          className="group relative col-span-3 row-span-2 aspect-[16/10] overflow-hidden rounded-[1.75rem] bg-ink-100 ring-1 ring-ink-900/5"
        >
          <Image
            src={images[active].image_url}
            alt={images[active].alt || alt}
            fill
            priority
            sizes="66vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
          <span className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full border border-white/30 bg-white/90 text-ink-900 shadow-float backdrop-blur transition-transform group-hover:scale-105">
            <Expand className="h-4 w-4" />
          </span>
        </button>

        {thumbs.slice(0, 4).map((img, i) => (
          <button
            key={img.id}
            type="button"
            onClick={() => {
              setActive(i);
              setLightbox(i);
            }}
            className={`group relative aspect-[5/4] overflow-hidden rounded-2xl bg-ink-100 ring-2 transition-all ${
              active === i ? "ring-sand-400" : "ring-ink-900/5 hover:ring-sand-300/50"
            }`}
          >
            <Image
              src={img.image_url}
              alt={img.alt || alt}
              fill
              sizes="17vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {i === 3 && images.length > 5 && (
              <span className="absolute inset-0 grid place-items-center bg-ink-900/60 text-sm font-semibold text-white backdrop-blur-sm">
                +{images.length - 4} more
              </span>
            )}
          </button>
        ))}
      </div>

      <AnimatePresence>
        {lightbox != null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-ink-900/95 backdrop-blur-md"
            onClick={() => setLightbox(null)}
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setLightbox(null);
              }}
              className="absolute right-4 top-4 z-10 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:right-6 sm:top-6"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              className="absolute left-3 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:left-6"
              aria-label="Previous"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              className="absolute right-3 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:right-6"
              aria-label="Next"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            <div
              className="flex h-full items-center justify-center p-4 pt-16 sm:p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                key={lightbox}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3 }}
                className="relative h-[70vh] w-full max-w-6xl sm:h-[80vh]"
              >
                <Image
                  src={images[lightbox].image_url}
                  alt={images[lightbox].alt || alt}
                  fill
                  sizes="100vw"
                  className="object-contain"
                />
              </motion.div>
            </div>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-white/70 sm:bottom-6">
              {lightbox + 1} / {images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
