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
    <section className="relative overflow-hidden bg-ink-900 text-sand-50">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sand-400/40 to-transparent" />
      <div className="orb left-1/4 top-0 h-96 w-96 bg-sand-500/8" />
      <div className="orb right-0 bottom-0 h-80 w-80 bg-sea-500/6" />

      <div className="container-px relative mx-auto max-w-7xl py-24 md:py-32 lg:py-40">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3"
          >
            <span className="h-px w-12 bg-gradient-to-r from-sand-400 to-sand-600" />
            <span className="eyebrow-light">{t.home.experiencesTitle}</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mt-4 font-serif text-3xl font-light leading-tight md:text-4xl lg:text-5xl"
          >
            {t.home.experiencesTitle}
          </motion.h2>
        </div>

        <div className="mt-14 grid gap-4 sm:gap-5 md:mt-16 md:grid-cols-2">
          {items.map((it, i) => {
            const Icon = ICONS[it.icon || "Sparkles"] || Sparkles;
            const title =
              (locale === "gr" ? it.gr?.title : it.en?.title) ||
              it.en?.title ||
              "";
            const body =
              (locale === "gr" ? it.gr?.body : it.en?.body) ||
              it.en?.body ||
              "";
            const isLarge = i === 0 || i === 3;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, delay: i * 0.08 }}
                className={`group relative overflow-hidden rounded-[1.75rem] ring-1 ring-white/10 transition-all duration-500 hover:ring-sand-400/30 hover:shadow-glow ${isLarge ? "md:row-span-1" : ""}`}
              >
                <div className={`relative ${isLarge ? "aspect-[16/11]" : "aspect-[16/10]"}`}>
                  {it.image && (
                    <Image
                      src={it.image}
                      alt={title}
                      fill
                      sizes="(min-width:768px) 50vw, 100vw"
                      className="object-cover transition-transform duration-[1800ms] group-hover:scale-110"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/50 to-ink-900/10 transition-opacity duration-500 group-hover:via-ink-900/40" />
                </div>

                <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-8">
                  <div className="flex items-start justify-between">
                    <span className="font-serif text-5xl font-light text-white/10 transition-colors group-hover:text-white/20">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-white/10 backdrop-blur-xl transition-all duration-300 group-hover:border-sand-400/40 group-hover:bg-white/20">
                      <Icon className="h-4 w-4" />
                    </span>
                  </div>

                  <div>
                    <h3 className="font-serif text-xl font-light sm:text-2xl lg:text-3xl">
                      {title}
                    </h3>
                    <p className="mt-2 max-w-md text-sm leading-relaxed text-sand-200/75 transition-colors group-hover:text-sand-100/90">
                      {body}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
