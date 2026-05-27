"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2, Send, CheckCircle2 } from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export default function ContactForm({ villaId }: { villaId?: string }) {
  const { t } = useLanguage();
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    setStatus("loading");
    setErrorMsg(null);
    const supabase = createSupabaseBrowserClient();
    const { error } = await supabase.from("contact_messages").insert({
      name: String(fd.get("name") || ""),
      email: String(fd.get("email") || ""),
      phone: (fd.get("phone") && String(fd.get("phone"))) || null,
      message: String(fd.get("message") || ""),
      villa_id: villaId || null,
    });
    if (error) {
      setStatus("error");
      setErrorMsg(error.message);
      return;
    }
    setStatus("success");
    form.reset();
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid place-items-center rounded-3xl border border-emerald-200 bg-emerald-50 p-10 text-center text-emerald-700"
      >
        <CheckCircle2 className="h-10 w-10" />
        <p className="mt-3 text-sm">{t.contact.success}</p>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="grid gap-4 rounded-3xl border border-ink-900/5 bg-white p-6 md:p-8"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="label" htmlFor="name">
            {t.contact.name}
          </label>
          <input id="name" name="name" required className="input" />
        </div>
        <div>
          <label className="label" htmlFor="email">
            {t.contact.email}
          </label>
          <input id="email" name="email" type="email" required className="input" />
        </div>
      </div>
      <div>
        <label className="label" htmlFor="phone">
          {t.contact.phone}
        </label>
        <input id="phone" name="phone" className="input" />
      </div>
      <div>
        <label className="label" htmlFor="message">
          {t.contact.message}
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="input resize-none"
        />
      </div>
      {errorMsg && (
        <p className="text-sm text-red-600">{t.contact.error}: {errorMsg}</p>
      )}
      <div>
        <button
          type="submit"
          disabled={status === "loading"}
          className="btn-primary"
        >
          {status === "loading" ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
          {t.contact.submit}
        </button>
      </div>
    </form>
  );
}
