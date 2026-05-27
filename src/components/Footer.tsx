"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Instagram, Mail, MapPin } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export default function Footer() {
  const pathname = usePathname();
  const { t } = useLanguage();
  if (pathname.startsWith("/admin")) return null;

  return (
    <footer className="mt-24 border-t border-ink-900/5 bg-ink-900 text-sand-100">
      <div className="container-px mx-auto max-w-7xl py-16">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link href="/" className="font-serif text-3xl tracking-tight">
              Paxoi<span className="text-sand-400">.</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm text-sand-200/70">
              {t.footer.tagline}
            </p>
            <div className="mt-6 flex items-center gap-3 text-sm text-sand-200/70">
              <MapPin className="h-4 w-4" />
              <span>Paxos, Ionian Islands, Greece</span>
            </div>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.25em] text-sand-400">
              {t.footer.explore}
            </h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="/villas" className="hover:text-white">
                  {t.nav.villas}
                </Link>
              </li>
              <li>
                <Link href="/favorites" className="hover:text-white">
                  {t.nav.favorites}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white">
                  {t.nav.contact}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.25em] text-sand-400">
              {t.footer.legal}
            </h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white">
                  {t.footer.terms}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  {t.footer.privacy}
                </a>
              </li>
              <li>
                <Link href="/admin/login" className="hover:text-white">
                  {t.nav.admin}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 md:flex-row">
          <p className="text-xs text-sand-200/50">
            © {new Date().getFullYear()} Paxoi Villas. {t.footer.rights}
          </p>
          <div className="flex items-center gap-4 text-sand-200/70">
            <a href="#" className="hover:text-white" aria-label="Instagram">
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href="mailto:hello@paxoi.example"
              className="hover:text-white"
              aria-label="Email"
            >
              <Mail className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
