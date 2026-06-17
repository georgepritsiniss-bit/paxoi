"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2, Sparkles } from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export default function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const router = useRouter();
  const sp = useSearchParams();
  const next = sp.get("next") || "/";
  const { t } = useLanguage();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get("email") || "");
    const password = String(fd.get("password") || "");
    setError(null);
    setInfo(null);
    setLoading(true);
    const supabase = createSupabaseBrowserClient();
    if (mode === "signup") {
      const { error } = await supabase.auth.signUp({ email, password });
      setLoading(false);
      if (error) return setError(error.message);
      setInfo(t.auth.checkInbox);
      return;
    }
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);
    if (error) return setError(error.message);
    router.push(next);
    router.refresh();
  }

  return (
    <div className="container-px mx-auto grid min-h-[80vh] max-w-7xl items-center gap-12 py-12 md:grid-cols-2">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="order-2 md:order-1"
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-sand-200 bg-sand-50 px-3 py-1.5">
          <Sparkles className="h-3.5 w-3.5 text-sand-600" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-sand-600">
            Paxoi Villas
          </span>
        </div>
        <h1 className="mt-4 h-display text-balance">
          {mode === "login" ? t.auth.loginTitle : t.auth.signupTitle}
        </h1>
        <p className="mt-4 max-w-md text-ink-500">
          {mode === "login" ? t.auth.loginSubtitle : t.auth.signupSubtitle}
        </p>

        <form
          onSubmit={onSubmit}
          className="glass mt-10 max-w-md space-y-5 rounded-[1.75rem] p-6 shadow-float md:p-8"
        >
          <div>
            <label className="label" htmlFor="email">
              {t.auth.email}
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="input"
            />
          </div>
          <div>
            <label className="label" htmlFor="password">
              {t.auth.password}
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete={
                mode === "login" ? "current-password" : "new-password"
              }
              required
              minLength={6}
              className="input"
            />
          </div>

          {error && (
            <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600 ring-1 ring-red-100">
              {error}
            </p>
          )}
          {info && (
            <p className="rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700 ring-1 ring-emerald-100">
              {info}
            </p>
          )}

          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            {mode === "login" ? t.auth.submitLogin : t.auth.submitSignup}
          </button>

          <p className="pt-2 text-center text-sm text-ink-500">
            {mode === "login" ? t.auth.noAccount : t.auth.hasAccount}{" "}
            <Link
              className="font-semibold text-ink-900 underline-offset-4 transition-colors hover:text-sand-600 hover:underline"
              href={mode === "login" ? "/signup" : "/login"}
            >
              {mode === "login" ? t.nav.signup : t.nav.login}
            </Link>
          </p>
        </form>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9 }}
        className="order-1 md:order-2"
      >
        <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] shadow-card-hover ring-1 ring-ink-900/5">
          <Image
            src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1600&q=80"
            alt="Pool"
            fill
            sizes="(min-width:768px) 50vw, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-900/60 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 glass-dark rounded-2xl p-5">
            <p className="font-serif text-xl text-white">
              Save your favourite villas
            </p>
            <p className="mt-1 text-sm text-white/65">
              Create an account to bookmark properties and plan your stay.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
