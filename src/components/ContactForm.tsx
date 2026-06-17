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
        className="glass grid place-items-center rounded-[1.75rem] p-12 text-center"
      >
        <div className="grid h-16 w-16 place-items-center rounded-full bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <p className="mt-4 text-sm font-medium text-emerald-700">
          {t.contact.success}
        </p>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="glass grid gap-5 rounded-[1.75rem] p-6 shadow-float md:p-8"
    >
      <div className="grid gap-5 md:grid-cols-2">
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
          <input
            id="email"
            name="email"
            type="email"
            required
            className="input"
          />
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
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600 ring-1 ring-red-100">
          {t.contact.error}: {errorMsg}
        </p>
      )}
      <div>
        <button
          type="submit"
          disabled={status === "loading"}
          className="btn-primary w-full sm:w-auto"
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
