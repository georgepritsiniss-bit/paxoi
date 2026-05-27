"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Waves, Wine, UtensilsCrossed, Sailboat } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

const items = [
  {
    icon: Sailboat,
    title: { en: "Private boat days", gr: "Ιδιωτικές ημέρες με σκάφος" },
    body: {
      en: "Charter a wooden caïque and trace the hidden coves of Antipaxos.",
      gr: "Νοικιάστε καΐκι και ανακαλύψτε τους κρυφούς όρμους του Αντίπαξου.",
    },
    image:
      "https://images.unsplash.com/photo-1502209524164-acea936639a2?auto=format&fit=crop&w=1200&q=80",
  },
  {
    icon: UtensilsCrossed,
    title: { en: "Private chef dinners", gr: "Δείπνα με ιδιωτικό σεφ" },
    body: {
      en: "Slow tasting menus served at home, in pyjamas if you wish.",
      gr: "Αργά μενού δοκιμασίας σερβιρισμένα στο σπίτι, με ησυχία.",
    },
    image:
      "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=1200&q=80",
  },
  {
    icon: Waves,
    title: { en: "Sunset swims", gr: "Βουτιές στο ηλιοβασίλεμα" },
    body: {
      en: "Cliff steps lead straight to a private patch of Ionian blue.",
      gr: "Σκαλιά στον βράχο οδηγούν σε μια ιδιωτική γωνιά γαλάζιου.",
    },
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
  },
  {
    icon: Wine,
    title: { en: "Local wine tastings", gr: "Γευσιγνωσίες κρασιού" },
    body: {
      en: "Sip native Ionian varietals on the veranda as the sun melts.",
      gr: "Δοκιμάστε ιόνια κρασιά στη βεράντα την ώρα του δειλινού.",
    },
    image:
      "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=80",
  },
];

export default function Experiences() {
  const { t, locale } = useLanguage();
  return (
    <section className="bg-ink-900 text-sand-50">
      <div className="container-px mx-auto max-w-7xl py-24 md:py-32">
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

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {items.map((it, i) => {
            const Icon = it.icon;
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
                  <Image
                    src={it.image}
                    alt={it.title[locale]}
                    fill
                    sizes="(min-width:768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-[1500ms] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/40 to-transparent" />
                </div>
                <div className="absolute inset-0 flex flex-col justify-end p-8">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-white/15 backdrop-blur">
                    <Icon className="h-4 w-4" />
                  </span>
                  <h3 className="mt-4 font-serif text-2xl font-light">
                    {it.title[locale]}
                  </h3>
                  <p className="mt-2 max-w-md text-sm text-sand-200/80">
                    {it.body[locale]}
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
