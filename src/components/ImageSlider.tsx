"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type TouchEvent,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type SlideImage = {
  url: string;
  alt?: string;
};

type ImageSliderProps = {
  images: SlideImage[];
  /** seconds between slides; 0 disables autoplay */
  autoplay?: number;
  className?: string;
  aspectClass?: string;
  sizes?: string;
  priority?: boolean;
  showArrows?: boolean;
  showDots?: boolean;
  showCounter?: boolean;
  onSlideChange?: (index: number) => void;
  rounded?: string;
};

const SWIPE_THRESHOLD = 48;

export default function ImageSlider({
  images,
  autoplay = 0,
  className,
  aspectClass = "aspect-[16/10]",
  sizes = "100vw",
  priority = false,
  showArrows = true,
  showDots = true,
  showCounter = false,
  onSlideChange,
  rounded = "rounded-[1.75rem]",
}: ImageSliderProps) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const reducedMotion = useRef(false);

  const count = images.length;

  const goTo = useCallback(
    (next: number) => {
      if (count === 0) return;
      const wrapped = ((next % count) + count) % count;
      setIndex(wrapped);
      onSlideChange?.(wrapped);
    },
    [count, onSlideChange]
  );

  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  useEffect(() => {
    reducedMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
  }, []);

  useEffect(() => {
    if (!autoplay || count <= 1 || paused || reducedMotion.current) return;
    const id = window.setInterval(() => {
      setIndex((i) => {
        const nextIdx = (i + 1) % count;
        onSlideChange?.(nextIdx);
        return nextIdx;
      });
    }, autoplay * 1000);
    return () => window.clearInterval(id);
  }, [autoplay, count, paused, onSlideChange]);

  function onTouchStart(e: TouchEvent) {
    touchStart.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
  }

  function onTouchEnd(e: TouchEvent) {
    if (!touchStart.current) return;
    const dx = e.changedTouches[0].clientX - touchStart.current.x;
    const dy = e.changedTouches[0].clientY - touchStart.current.y;
    touchStart.current = null;
    if (Math.abs(dx) < SWIPE_THRESHOLD || Math.abs(dx) < Math.abs(dy)) return;
    if (dx < 0) next();
    else prev();
  }

  if (count === 0) {
    return (
      <div
        className={cn(aspectClass, rounded, "bg-ink-100 ring-1 ring-ink-900/5", className)}
        aria-hidden
      />
    );
  }

  const slide = images[index];

  return (
    <div
      className={cn("group relative overflow-hidden", aspectClass, rounded, className)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      role="region"
      aria-roledescription="carousel"
      aria-label="Image gallery"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={slide.url + index}
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={slide.url}
            alt={slide.alt || `Slide ${index + 1}`}
            fill
            priority={priority && index === 0}
            sizes={sizes}
            className="object-cover"
            draggable={false}
          />
        </motion.div>
      </AnimatePresence>

      {count > 1 && showArrows && (
        <>
          <button
            type="button"
            onClick={prev}
            aria-label="Previous slide"
            className="absolute left-3 top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-white/30 bg-ink-900/40 text-white opacity-0 backdrop-blur transition-all hover:bg-ink-900/60 group-hover:opacity-100 focus:opacity-100 sm:left-4 sm:h-11 sm:w-11"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next slide"
            className="absolute right-3 top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-white/30 bg-ink-900/40 text-white opacity-0 backdrop-blur transition-all hover:bg-ink-900/60 group-hover:opacity-100 focus:opacity-100 sm:right-4 sm:h-11 sm:w-11"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </>
      )}

      {showCounter && count > 1 && (
        <span className="absolute right-4 top-4 z-10 rounded-full border border-white/25 bg-ink-900/50 px-3 py-1 text-xs font-medium text-white backdrop-blur">
          {index + 1} / {count}
        </span>
      )}

      {count > 1 && showDots && (
        <div className="absolute inset-x-0 bottom-3 z-10 flex justify-center gap-1.5 sm:bottom-4">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => goTo(i)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                i === index
                  ? "w-6 bg-white"
                  : "w-1.5 bg-white/45 hover:bg-white/70"
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
