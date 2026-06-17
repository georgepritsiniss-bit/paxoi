"use client";

import { motion } from "framer-motion";
import ImageSlider from "@/components/ImageSlider";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import type { SliderContent } from "@/types";

const DEFAULT_SLIDES = [
  {
    url: "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?auto=format&fit=crop&w=2000&q=80",
    alt: "Villa exterior",
  },
  {
    url: "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=2000&q=80",
    alt: "Infinity pool",
  },
  {
    url: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=2000&q=80",
    alt: "Terrace at sunset",
  },
];

export default function SliderSection({ content }: { content?: SliderContent }) {
  const { locale } = useLanguage();
  const localized = content?.[locale];
  const slides =
    content?.images && content.images.length > 0
      ? content.images
      : DEFAULT_SLIDES;
  const autoplay = content?.autoplay ?? 5;

  return (
    <section className="container-px mx-auto max-w-7xl py-16 md:py-24">
      {(localized?.eyebrow || localized?.title) && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 text-center md:mb-10"
        >
          {localized?.eyebrow && (
            <span className="eyebrow">{localized.eyebrow}</span>
          )}
          {localized?.title && (
            <h2 className="mt-3 h-section">{localized.title}</h2>
          )}
          {localized?.subtitle && (
            <p className="mx-auto mt-3 max-w-xl text-ink-500">
              {localized.subtitle}
            </p>
          )}
        </motion.div>
      )}

      <ImageSlider
        images={slides}
        autoplay={slides.length > 1 ? autoplay : 0}
        aspectClass="aspect-[16/10] sm:aspect-[16/9]"
        sizes="(min-width:768px) 80vw, 100vw"
        showCounter
        className="shadow-card-hover ring-1 ring-ink-900/5"
      />
    </section>
  );
}
