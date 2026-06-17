"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Instagram, Mail, MapPin, ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export default function Footer() {
  const pathname = usePathname();
  const { t } = useLanguage();
  if (pathname.startsWith("/admin")) return null;

  return (
    <footer className="relative mt-32 overflow-hidden bg-ink-900 text-sand-100">
      {/* Top gradient accent */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sand-400/60 to-transparent" />
      <div className="orb -left-32 top-0 h-80 w-80 bg-sand-500/10" />
      <div className="orb -right-20 bottom-0 h-64 w-64 bg-sea-500/8" />

      <div className="container-px relative mx-auto max-w-7xl py-20 md:py-24">
        <div className="mx-auto mb-14 flex max-w-md items-center gap-4 text-sand-400/50">
          <span className="h-px flex-1 bg-gradient-to-r from-transparent to-sand-400/30" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.45em]">
            Paxoi · Greece
          </span>
          <span className="h-px flex-1 bg-gradient-to-l from-transparent to-sand-400/30" />
        </div>

        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <Link
              href="/"
              className="group inline-flex items-center gap-1 font-serif text-4xl tracking-tight"
            >
              Paxoi
              <span className="text-gradient-gold">.</span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-sand-200/65">
              {t.footer.tagline}
            </p>
            <div className="mt-6 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-sand-200/70 backdrop-blur">
              <MapPin className="h-4 w-4 text-sand-400" />
              <span>Paxos, Ionian Islands, Greece</span>
            </div>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.28em] text-sand-400">
              {t.footer.explore}
            </h4>
            <ul className="mt-5 space-y-3">
              {[
                { href: "/villas", label: t.nav.villas },
                { href: "/about", label: t.nav.about },
                { href: "/experiences", label: t.nav.experiences },
                { href: "/faq", label: t.nav.faq },
                { href: "/contact", label: t.nav.contact },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group inline-flex items-center gap-1.5 text-sm text-sand-200/70 transition-colors hover:text-white"
                  >
                    {item.label}
                    <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-60" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.28em] text-sand-400">
              {t.footer.legal}
            </h4>
            <ul className="mt-5 space-y-3 text-sm text-sand-200/70">
              <li>
                <Link href="/terms" className="transition-colors hover:text-white">
                  {t.footer.terms}
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="transition-colors hover:text-white">
                  {t.footer.privacy}
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/login"
                  className="transition-colors hover:text-white"
                >
                  {t.nav.admin}
                </Link>
              </li>
            </ul>

            <div className="mt-8 flex items-center gap-3">
              <a
                href="#"
                className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 text-sand-200/70 transition-all hover:border-sand-400/30 hover:bg-white/10 hover:text-white"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="mailto:hello@paxoi.example"
                className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 text-sand-200/70 transition-all hover:border-sand-400/30 hover:bg-white/10 hover:text-white"
                aria-label="Email"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 md:flex-row">
          <p className="text-xs text-sand-200/40">
            © {new Date().getFullYear()} Paxoi Villas. {t.footer.rights}
          </p>
          <p className="text-xs text-sand-200/30">
            Crafted for the Ionian coast
          </p>
        </div>
      </div>
    </footer>
  );
}
