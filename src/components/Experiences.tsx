"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Waves,
  Wine,
  UtensilsCrossed,
  Sailboat,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import type { ExperiencesContent, ExperienceItem } from "@/types";

const ICONS: Record<string, LucideIcon> = {
  Sailboat,
  UtensilsCrossed,
  Waves,
  Wine,
  Sparkles,
};

const DEFAULT_ITEMS: ExperienceItem[] = [
  {
    icon: "Sailboat",
    image:
      "https://images.unsplash.com/photo-1502209524164-acea936639a2?auto=format&fit=crop&w=1200&q=80",
    en: {
      title: "Private boat days",
      body: "Charter a wooden caïque and trace the hidden coves of Antipaxos.",
    },
    gr: {
      title: "Ιδιωτικές ημέρες με σκάφος",
      body: "Νοικιάστε καΐκι και ανακαλύψτε τους κρυφούς όρμους του Αντίπαξου.",
    },
  },
  {
    icon: "UtensilsCrossed",
    image:
      "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=1200&q=80",
    en: {
      title: "Private chef dinners",
      body: "Slow tasting menus served at home, in pyjamas if you wish.",
    },
    gr: {
      title: "Δείπνα με ιδιωτικό σεφ",
      body: "Αργά μενού δοκιμασίας σερβιρισμένα στο σπίτι, με ησυχία.",
    },
  },
  {
    icon: "Waves",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    en: {
      title: "Sunset swims",
      body: "Cliff steps lead straight to a private patch of Ionian blue.",
    },
    gr: {
      title: "Βουτιές στο ηλιοβασίλεμα",
      body: "Σκαλιά στον βράχο οδηγούν σε μια ιδιωτική γωνιά γαλάζιου.",
    },
  },
  {
    icon: "Wine",
    image:
      "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=80",
    en: {
      title: "Local wine tastings",
      body: "Sip native Ionian varietals on the veranda as the sun melts.",
    },
    gr: {
      title: "Γευσιγνωσίες κρασιού",
      body: "Δοκιμάστε ιόνια κρασιά στη βεράντα την ώρα του δειλινού.",
    },
  },
];

export default function Experiences({
  content,
}: {
  content?: ExperiencesContent;
}) {
  const { t, locale } = useLanguage();
  const items =
    content?.items && content.items.length > 0 ? content.items : DEFAULT_ITEMS;

  return (
    <section className="bg-ink-900 text-sand-50">
      <div className="container-px mx-auto max-w-7xl py-20 md:py-28 lg:py-32">
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs uppercase tracking-[0.25em] text-sand-400"
        >
          {t.home.experiencesTitle}
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-3 max-w-3xl font-serif text-3xl font-light leading-tight md:text-4xl"
        >
          {t.home.experiencesTitle}
        </motion.h2>

        <div className="mt-12 grid gap-5 sm:gap-6 md:mt-14 md:grid-cols-2">
          {items.map((it, i) => {
            const Icon = ICONS[it.icon || "Sparkles"] || Sparkles;
            const title =
              (locale === "gr" ? it.gr?.title : it.en?.title) ||
              it.en?.title ||
              "";
            const body =
              (locale === "gr" ? it.gr?.body : it.en?.body) || it.en?.body || "";
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                className="group relative overflow-hidden rounded-3xl"
              >
                <div className="relative aspect-[16/10]">
                  {it.image && (
                    <Image
                      src={it.image}
                      alt={title}
                      fill
                      sizes="(min-width:768px) 50vw, 100vw"
                      className="object-cover transition-transform duration-[1500ms] group-hover:scale-105"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/40 to-transparent" />
                </div>
                <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-white/15 backdrop-blur">
                    <Icon className="h-4 w-4" />
                  </span>
                  <h3 className="mt-3 font-serif text-xl font-light sm:mt-4 sm:text-2xl">
                    {title}
                  </h3>
                  <p className="mt-2 max-w-md text-sm text-sand-200/80">
                    {body}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
