"use client";

import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X, Expand } from "lucide-react";
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

  const main = images[active];
  const thumbs = images.slice(0, 6);

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
      <div className="aspect-[16/10] w-full rounded-3xl bg-ink-100" aria-hidden />
    );
  }

  return (
    <>
      <div className="grid grid-cols-4 gap-2 md:gap-3">
        <button
          type="button"
          onClick={() => setLightbox(active)}
          className="relative col-span-4 aspect-[16/9] overflow-hidden rounded-3xl bg-ink-100 md:col-span-3 md:row-span-2 md:aspect-auto"
        >
          {main && (
            <Image
              src={main.image_url}
              alt={main.alt || alt}
              fill
              priority
              sizes="(min-width:768px) 66vw, 100vw"
              className="object-cover transition-transform duration-700 hover:scale-[1.02]"
            />
          )}
          <span className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white/85 text-ink-900 shadow backdrop-blur">
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
            className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-ink-100 md:aspect-[5/4]"
          >
            <Image
              src={img.image_url}
              alt={img.alt || alt}
              fill
              sizes="(min-width:768px) 17vw, 25vw"
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
            {i === 3 && images.length > 5 && (
              <span className="absolute inset-0 grid place-items-center bg-ink-900/55 text-sm font-medium text-white">
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
            className="fixed inset-0 z-[100] grid place-items-center bg-ink-900/95 p-4 backdrop-blur-md"
            onClick={() => setLightbox(null)}
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setLightbox(null);
              }}
              className="absolute right-6 top-6 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"
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
              className="absolute left-6 top-1/2 -translate-y-1/2 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"
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
              className="absolute right-6 top-1/2 -translate-y-1/2 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"
              aria-label="Next"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            <motion.div
              key={lightbox}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3 }}
              className="relative h-[80vh] w-full max-w-6xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[lightbox].image_url}
                alt={images[lightbox].alt || alt}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </motion.div>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs text-white/70">
              {lightbox + 1} / {images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
