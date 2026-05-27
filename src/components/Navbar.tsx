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

export default function Navbar() {
  const pathname = usePathname();
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
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

  if (onAdmin) return null; // Admin layout has its own nav

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "bg-sand-50/85 backdrop-blur-xl border-b border-ink-900/5 shadow-[0_2px_20px_-12px_rgba(0,0,0,0.1)]"
          : "bg-transparent"
      )}
    >
      <div className="container-px mx-auto flex h-20 max-w-7xl items-center justify-between">
        <Link href="/" className="group flex items-center gap-2">
          <span className="font-serif text-2xl tracking-tight text-ink-900 transition-colors group-hover:text-sand-700">
            Paxoi<span className="text-sand-500">.</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "relative px-4 py-2 text-sm font-medium transition-colors",
                pathname === l.href
                  ? "text-ink-900"
                  : "text-ink-500 hover:text-ink-900"
              )}
            >
              {l.label}
              {pathname === l.href && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute inset-x-3 -bottom-0.5 h-px bg-ink-900"
                />
              )}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <LanguageSwitcher />
          {userEmail ? (
            <>
              <Link
                href="/favorites"
                className="btn-ghost"
                aria-label="Favorites"
              >
                <Heart className="h-4 w-4" />
              </Link>
              <button onClick={handleLogout} className="btn-ghost">
                <LogOut className="h-4 w-4" />
                <span>{t.nav.logout}</span>
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="btn-ghost">
                <User className="h-4 w-4" />
                {t.nav.login}
              </Link>
              <Link href="/signup" className="btn-primary">
                {t.nav.signup}
              </Link>
            </>
          )}
        </div>

        <button
          className="md:hidden rounded-full p-2 text-ink-900"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
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
                className="mt-2 flex items-center gap-2 rounded-xl px-4 py-3 text-sm text-ink-400"
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
