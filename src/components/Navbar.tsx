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
    const onScroll = () => setScrolled(window.scrollY > 40);
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
  if (onAdmin) return null;

  const overHero = hasDarkHero(pathname) && !scrolled;
  const floating = scrolled && !overHero;

  const links = [
    { href: "/", label: t.nav.home },
    { href: "/villas", label: t.nav.villas },
    { href: "/about", label: t.nav.about },
    { href: "/experiences", label: t.nav.experiences },
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
        overHero && "bg-gradient-to-b from-ink-900/60 via-ink-900/20 to-transparent",
        !overHero && !floating && "bg-sand-50/80 backdrop-blur-xl",
        floating && "py-3"
      )}
    >
      <div
        className={cn(
          "container-px mx-auto transition-all duration-500",
          floating ? "max-w-5xl" : "max-w-7xl"
        )}
      >
        <div
          className={cn(
            "flex items-center justify-between transition-all duration-500",
            floating
              ? "glass h-14 rounded-full px-2 shadow-float sm:px-4"
              : scrolled
              ? "h-16 border-b border-ink-900/5"
              : "h-20"
          )}
        >
          <Link
            href="/"
            className="group flex items-center gap-2 pl-2 sm:pl-0"
            aria-label="Paxoi Villas — home"
          >
            <span
              className={cn(
                "font-serif text-2xl tracking-tight transition-colors lg:text-[1.65rem]",
                overHero
                  ? "text-white drop-shadow-[0_1px_12px_rgba(0,0,0,0.5)] group-hover:text-sand-100"
                  : "text-ink-900 group-hover:text-sand-700"
              )}
            >
              Paxoi
              <span
                className={cn(
                  "bg-gradient-to-r from-sand-400 to-sand-600 bg-clip-text",
                  overHero ? "text-sand-300" : "text-transparent"
                )}
              >
                .
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-0.5 lg:flex">
            {links.map((l) => {
              const active = pathname === l.href;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={cn(
                    "relative rounded-full px-4 py-2 text-sm font-medium transition-all duration-300",
                    overHero
                      ? active
                        ? "text-white"
                        : "text-white/75 hover:bg-white/10 hover:text-white"
                      : active
                      ? "bg-ink-900/5 text-ink-900"
                      : "text-ink-500 hover:bg-ink-900/5 hover:text-ink-900"
                  )}
                  style={
                    overHero
                      ? { textShadow: "0 1px 12px rgba(0,0,0,0.45)" }
                      : undefined
                  }
                >
                  {l.label}
                  {active && !floating && (
                    <motion.span
                      layoutId="nav-underline"
                      transition={{
                        duration: 0.4,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className={cn(
                        "absolute inset-x-3 -bottom-0.5 h-px",
                        overHero ? "bg-sand-300" : "bg-sand-500"
                      )}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
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
                  <span className="hidden lg:inline">{t.nav.logout}</span>
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
                  <span className="hidden lg:inline">{t.nav.login}</span>
                </Link>
                <Link
                  href="/signup"
                  className={cn(
                    "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 ease-out hover:-translate-y-0.5",
                    overHero
                      ? "bg-white text-ink-900 shadow-glow hover:bg-sand-50"
                      : "bg-ink-900 text-sand-50 hover:bg-ink-800 hover:shadow-glow"
                  )}
                >
                  {t.nav.signup}
                </Link>
              </>
            )}
          </div>

          <button
            className={cn(
              "grid h-10 w-10 place-items-center rounded-full transition-colors lg:hidden",
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
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="glass mx-4 mt-2 overflow-hidden rounded-3xl lg:hidden"
          >
            <div className="container-px mx-auto flex max-w-7xl flex-col py-4">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className={cn(
                    "rounded-2xl px-4 py-3.5 text-base font-medium transition-colors",
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
                className="mt-2 flex items-center gap-2 rounded-2xl px-4 py-3 text-sm text-ink-400 hover:bg-ink-900/5"
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
