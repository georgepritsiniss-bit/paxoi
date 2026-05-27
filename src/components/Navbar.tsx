"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Heart, User, LogOut, Shield } from "lucide-react";
import { cn } from "@/lib/utils";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import LanguageSwitcher from "./LanguageSwitcher";

/**
 * Routes that render a full-bleed dark hero image directly under the
 * navbar. On these pages we keep the text white (and add a soft scrim)
 * until the user scrolls past the threshold.
 */
function hasDarkHero(pathname: string) {
  return pathname === "/";
}

export default function Navbar() {
  const pathname = usePathname();
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const supabase = createSupabaseBrowserClient();
    supabase.auth.getUser().then(({ data }) => {
      setUserEmail(data.user?.email ?? null);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      setUserEmail(session?.user?.email ?? null);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const onAdmin = pathname.startsWith("/admin");
  if (onAdmin) return null; // Admin layout has its own nav

  const overHero = hasDarkHero(pathname) && !scrolled;

  const links = [
    { href: "/", label: t.nav.home },
    { href: "/villas", label: t.nav.villas },
    { href: "/favorites", label: t.nav.favorites },
    { href: "/contact", label: t.nav.contact },
  ];

  async function handleLogout() {
    const supabase = createSupabaseBrowserClient();
    await supabase.auth.signOut();
    window.location.href = "/";
  }

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-500 ease-out",
        overHero
          ? "bg-gradient-to-b from-ink-900/55 via-ink-900/25 to-transparent"
          : scrolled
          ? "border-b border-ink-900/5 bg-sand-50/85 shadow-[0_2px_20px_-12px_rgba(0,0,0,0.15)] backdrop-blur-xl"
          : "bg-sand-50/70 backdrop-blur-md"
      )}
    >
      <div
        className={cn(
          "container-px mx-auto flex max-w-7xl items-center justify-between transition-all duration-300",
          scrolled ? "h-16" : "h-20"
        )}
      >
        <Link
          href="/"
          className="group flex items-center gap-2"
          aria-label="Paxoi Villas — home"
        >
          <span
            className={cn(
              "font-serif text-2xl tracking-tight transition-colors",
              overHero
                ? "text-white drop-shadow-[0_1px_8px_rgba(0,0,0,0.5)] group-hover:text-sand-100"
                : "text-ink-900 group-hover:text-sand-700"
            )}
          >
            Paxoi
            <span className={overHero ? "text-sand-300" : "text-sand-500"}>
              .
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "relative px-4 py-2 text-sm font-medium transition-colors",
                  overHero
                    ? active
                      ? "text-white"
                      : "text-white/80 hover:text-white"
                    : active
                    ? "text-ink-900"
                    : "text-ink-500 hover:text-ink-900"
                )}
                style={
                  overHero
                    ? { textShadow: "0 1px 12px rgba(0,0,0,0.45)" }
                    : undefined
                }
              >
                {l.label}
                {active && (
                  <motion.span
                    layoutId="nav-underline"
                    transition={{
                      duration: 0.4,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className={cn(
                      "absolute inset-x-3 -bottom-0.5 h-px",
                      overHero ? "bg-white" : "bg-ink-900"
                    )}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <LanguageSwitcher overHero={overHero} />
          {userEmail ? (
            <>
              <Link
                href="/favorites"
                aria-label="Favorites"
                className={cn(
                  "inline-flex h-9 w-9 items-center justify-center rounded-full transition-all",
                  overHero
                    ? "text-white/90 hover:bg-white/10 hover:text-white"
                    : "text-ink-700 hover:bg-ink-900/5"
                )}
              >
                <Heart className="h-4 w-4" />
              </Link>
              <button
                onClick={handleLogout}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all",
                  overHero
                    ? "text-white hover:bg-white/10"
                    : "text-ink-700 hover:bg-ink-900/5"
                )}
              >
                <LogOut className="h-4 w-4" />
                <span>{t.nav.logout}</span>
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className={cn(
                  "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all",
                  overHero
                    ? "text-white hover:bg-white/10"
                    : "text-ink-700 hover:bg-ink-900/5"
                )}
              >
                <User className="h-4 w-4" />
                {t.nav.login}
              </Link>
              <Link
                href="/signup"
                className={cn(
                  "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 ease-out hover:-translate-y-0.5",
                  overHero
                    ? "bg-white text-ink-900 hover:bg-sand-100"
                    : "bg-ink-900 text-sand-50 hover:bg-ink-700 hover:shadow-xl"
                )}
              >
                {t.nav.signup}
              </Link>
            </>
          )}
        </div>

        <button
          className={cn(
            "grid h-10 w-10 place-items-center rounded-full transition-colors md:hidden",
            overHero
              ? "text-white hover:bg-white/10"
              : "text-ink-900 hover:bg-ink-900/5"
          )}
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden border-t border-ink-900/5 bg-sand-50/95 backdrop-blur-xl"
          >
            <div className="container-px mx-auto flex max-w-7xl flex-col py-4">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className={cn(
                    "rounded-xl px-4 py-3 text-base font-medium transition-colors",
                    pathname === l.href
                      ? "bg-ink-900/5 text-ink-900"
                      : "text-ink-700 hover:bg-ink-900/5"
                  )}
                >
                  {l.label}
                </Link>
              ))}
              <div className="mt-3 flex items-center justify-between border-t border-ink-900/5 pt-3">
                <LanguageSwitcher />
                {userEmail ? (
                  <button onClick={handleLogout} className="btn-ghost">
                    <LogOut className="h-4 w-4" />
                    {t.nav.logout}
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <Link href="/login" className="btn-ghost">
                      {t.nav.login}
                    </Link>
                    <Link href="/signup" className="btn-primary">
                      {t.nav.signup}
                    </Link>
                  </div>
                )}
              </div>
              <Link
                href="/admin/login"
                className="mt-2 flex items-center gap-2 rounded-xl px-4 py-3 text-sm text-ink-400 hover:bg-ink-900/5"
              >
                <Shield className="h-4 w-4" />
                {t.nav.admin}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
