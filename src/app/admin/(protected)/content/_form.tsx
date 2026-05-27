"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import {
  ChevronDown,
  Loader2,
  RotateCcw,
  Save,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

function Submit({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="btn-primary">
      {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
      {label}
    </button>
  );
}

function isPlainObject(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

export default function ContentEditor({
  title,
  description,
  initial,
  template,
  saveAction,
  resetAction,
  hasOverride,
}: {
  title: string;
  description: string;
  initial: Record<string, unknown>;
  template: Record<string, unknown>;
  saveAction: (formData: FormData) => Promise<void> | void;
  resetAction: () => Promise<void> | void;
  hasOverride: boolean;
}) {
  const [open, setOpen] = useState(false);
  const initialJson = useMemo(
    () => JSON.stringify(initial, null, 2),
    [initial]
  );
  const [text, setText] = useState(initialJson);
  const [error, setError] = useState<string | null>(null);
  const textRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setText(initialJson);
  }, [initialJson]);

  function handleChange(v: string) {
    setText(v);
    if (!v.trim()) {
      setError(null);
      return;
    }
    try {
      const parsed = JSON.parse(v);
      if (!isPlainObject(parsed)) {
        setError("Top-level value must be an object.");
      } else {
        setError(null);
      }
    } catch (e) {
      setError((e as Error).message);
    }
  }

  function loadTemplate() {
    const next = JSON.stringify(template, null, 2);
    setText(next);
    setError(null);
    if (textRef.current) textRef.current.focus();
  }

  return (
    <section className="rounded-3xl border border-ink-900/5 bg-white">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-start justify-between gap-3 p-5 text-left sm:p-6"
      >
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-serif text-xl text-ink-900">{title}</h2>
            {hasOverride ? (
              <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] uppercase tracking-wider text-emerald-700">
                custom
              </span>
            ) : (
              <span className="rounded-full bg-sand-100 px-2 py-0.5 text-[10px] uppercase tracking-wider text-sand-700">
                default
              </span>
            )}
          </div>
          <p className="mt-1 text-sm text-ink-500">{description}</p>
        </div>
        <ChevronDown
          className={cn(
            "h-5 w-5 shrink-0 text-ink-400 transition-transform",
            open && "rotate-180"
          )}
        />
      </button>

      {open && (
        <div className="border-t border-ink-900/5 p-5 sm:p-6">
          <form action={saveAction}>
            <input type="hidden" name="value" value={text} />
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-xs text-ink-500">
                Edit the JSON below. Both <code className="rounded bg-sand-100 px-1 py-0.5">en</code>{" "}
                and <code className="rounded bg-sand-100 px-1 py-0.5">gr</code> blocks are optional —
                empty fields fall back to the default translations.
              </p>
              <button
                type="button"
                onClick={loadTemplate}
                className="inline-flex items-center gap-1.5 rounded-full bg-sand-100 px-3 py-1 text-xs text-ink-700 hover:bg-sand-200"
              >
                <Sparkles className="h-3 w-3" />
                Load empty template
              </button>
            </div>

            <textarea
              ref={textRef}
              value={text}
              onChange={(e) => handleChange(e.target.value)}
              spellCheck={false}
              className="mt-4 block h-72 w-full resize-y rounded-2xl border border-ink-200 bg-sand-50/40 p-4 font-mono text-xs leading-relaxed text-ink-900 outline-none transition-all focus:border-ink-900 focus:ring-2 focus:ring-ink-900/10"
            />

            {error && (
              <p className="mt-2 text-xs text-red-600">JSON error: {error}</p>
            )}

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <Submit label="Save changes" />
              {hasOverride && (
                <button
                  type="submit"
                  formAction={resetAction}
                  className="inline-flex items-center gap-2 rounded-full border border-ink-200 px-5 py-2.5 text-sm text-ink-600 transition-all hover:border-red-200 hover:bg-red-50 hover:text-red-700"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  Reset to default
                </button>
              )}
            </div>
          </form>
        </div>
      )}
    </section>
  );
}
