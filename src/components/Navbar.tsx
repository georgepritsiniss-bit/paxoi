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
    const onScroll = () => setScrolled(window.scrollY > 36);
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

  if (pathname.startsWith("/admin")) return null;

  const overHero = hasDarkHero(pathname) && !scrolled;

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
        "fixed top-0 z-50 w-full transition-all duration-700 ease-out",
        overHero && "bg-gradient-to-b from-ink-900/50 via-ink-900/15 to-transparent",
        !overHero && scrolled && "border-b border-ink-900/[0.06] bg-sand-50/80 shadow-premium backdrop-blur-2xl",
        !overHero && !scrolled && "bg-sand-50/70 backdrop-blur-xl"
      )}
    >
      <div className="container-px mx-auto max-w-7xl">
        <div
          className={cn(
            "flex items-center justify-between transition-all duration-500",
            scrolled ? "h-[4.25rem]" : "h-20"
          )}
        >
          <Link href="/" className="group" aria-label="Paxoi Villas — home">
            <span
              className={cn(
                "font-serif text-[1.65rem] tracking-tight transition-colors duration-500",
                overHero
                  ? "text-white group-hover:text-sand-100"
                  : "text-ink-900 group-hover:text-sand-700"
              )}
            >
              Paxoi
              <span className={cn(overHero ? "text-sand-300" : "text-sand-500")}>
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
                    "relative px-4 py-2 text-[13px] font-medium tracking-wide transition-colors duration-300",
                    overHero
                      ? active
                        ? "text-white"
                        : "text-white/70 hover:text-white"
                      : active
                      ? "text-ink-900"
                      : "text-ink-500 hover:text-ink-900"
                  )}
                >
                  {l.label}
                  {active && (
                    <motion.span
                      layoutId="nav-underline"
                      className={cn(
                        "absolute inset-x-4 -bottom-0.5 h-px",
                        overHero ? "bg-sand-300" : "bg-sand-500"
                      )}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
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
                      ? "text-white/85 hover:bg-white/10 hover:text-white"
                      : "text-ink-600 hover:bg-ink-900/5"
                  )}
                >
                  <Heart className="h-4 w-4" />
                </Link>
                <button
                  onClick={handleLogout}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-[13px] font-medium transition-all",
                    overHero
                      ? "text-white/85 hover:bg-white/10"
                      : "text-ink-600 hover:bg-ink-900/5"
                  )}
                >
                  <LogOut className="h-3.5 w-3.5" />
                  <span className="hidden xl:inline">{t.nav.logout}</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-[13px] font-medium transition-all",
                    overHero
                      ? "text-white/85 hover:bg-white/10"
                      : "text-ink-600 hover:bg-ink-900/5"
                  )}
                >
                  <User className="h-3.5 w-3.5" />
                  <span className="hidden xl:inline">{t.nav.login}</span>
                </Link>
                <Link
                  href="/signup"
                  className={cn(
                    "inline-flex items-center rounded-full px-5 py-2.5 text-[13px] font-medium tracking-wide transition-all duration-500 hover:-translate-y-0.5",
                    overHero
                      ? "bg-white text-ink-900 hover:bg-sand-50"
                      : "bg-ink-900 text-sand-50 hover:bg-ink-800 hover:shadow-premium"
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
            className="glass mx-4 mt-1 overflow-hidden rounded-3xl lg:hidden"
          >
            <div className="flex flex-col p-3">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className={cn(
                    "rounded-2xl px-4 py-3.5 text-[15px] font-medium",
                    pathname === l.href
                      ? "bg-ink-900/[0.04] text-ink-900"
                      : "text-ink-600 hover:bg-ink-900/[0.03]"
                  )}
                >
                  {l.label}
                </Link>
              ))}
              <div className="mt-2 flex items-center justify-between border-t border-ink-900/5 pt-3">
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
                    <Link href="/signup" className="btn-primary !py-2.5 !px-5">
                      {t.nav.signup}
                    </Link>
                  </div>
                )}
              </div>
              <Link
                href="/admin/login"
                className="mt-1 flex items-center gap-2 rounded-2xl px-4 py-3 text-sm text-ink-400"
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
