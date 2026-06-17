"use client";

import { useFormStatus } from "react-dom";
import { Loader2, Save } from "lucide-react";
import type { SiteContentKey } from "@/types";

function SubmitBtn({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="btn-primary text-sm">
      {pending ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Save className="h-4 w-4" />
      )}
      {label}
    </button>
  );
}

function Field({
  label,
  name,
  defaultValue = "",
  multiline = false,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  multiline?: boolean;
}) {
  return (
    <div>
      <label className="label">{label}</label>
      {multiline ? (
        <textarea
          name={name}
          defaultValue={defaultValue}
          rows={3}
          className="input resize-y text-sm"
        />
      ) : (
        <input
          name={name}
          defaultValue={defaultValue}
          className="input text-sm"
        />
      )}
    </div>
  );
}

function LocaleBlock({
  locale,
  prefix,
  fields,
  defaults = {},
}: {
  locale: "en" | "gr";
  prefix: string;
  fields: Array<{ key: string; label: string; multiline?: boolean }>;
  defaults?: Record<string, string>;
}) {
  return (
    <fieldset className="rounded-2xl border border-ink-900/5 bg-sand-50/40 p-4">
      <legend className="px-1 text-xs font-semibold uppercase tracking-wider text-ink-500">
        {locale === "en" ? "English" : "Greek"}
      </legend>
      <div className="mt-2 grid gap-3">
        {fields.map((f) => (
          <Field
            key={f.key}
            label={f.label}
            name={`${prefix}_${locale}_${f.key}`}
            defaultValue={defaults[f.key] || ""}
            multiline={f.multiline}
          />
        ))}
      </div>
    </fieldset>
  );
}

/** Build JSON from visual form fields and submit via hidden input */
export function buildContentFromForm(
  formData: FormData,
  shape: "hero" | "about" | "cta" | "slider" | "text" | "experiences" | "faq"
): Record<string, unknown> {
  const g = (k: string) => String(formData.get(k) || "").trim();

  if (shape === "hero" || shape === "cta" || shape === "text") {
    const result: Record<string, unknown> = {
      en: {
        eyebrow: g(`${shape}_en_eyebrow`) || undefined,
        title: g(`${shape}_en_title`) || undefined,
        subtitle: g(`${shape}_en_subtitle`) || undefined,
        body: g(`${shape}_en_body`) || undefined,
      },
      gr: {
        eyebrow: g(`${shape}_gr_eyebrow`) || undefined,
        title: g(`${shape}_gr_title`) || undefined,
        subtitle: g(`${shape}_gr_subtitle`) || undefined,
        body: g(`${shape}_gr_body`) || undefined,
      },
    };
    if (shape === "hero") {
      const urls = g("hero_images")
        .split("\n")
        .map((u) => u.trim())
        .filter(Boolean);
      if (urls.length) {
        result.images = urls.map((url) => ({ url }));
      } else if (g("hero_image")) {
        result.image = g("hero_image");
      }
      const ap = Number(g("hero_autoplay"));
      if (ap > 0) result.autoplay = ap;
    }
    if (shape === "cta" && g("cta_image")) result.image = g("cta_image");
    return result;
  }

  if (shape === "about") {
    const statsRaw = g("about_stats");
    const stats = statsRaw
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const [k, v] = line.split("|").map((s) => s.trim());
        return k && v ? { k, v } : null;
      })
      .filter(Boolean);
    return {
      image: g("about_image") || undefined,
      stats: stats.length ? stats : undefined,
      en: {
        eyebrow: g("about_en_eyebrow") || undefined,
        title: g("about_en_title") || undefined,
        body: g("about_en_body") || undefined,
      },
      gr: {
        eyebrow: g("about_gr_eyebrow") || undefined,
        title: g("about_gr_title") || undefined,
        body: g("about_gr_body") || undefined,
      },
    };
  }

  if (shape === "slider") {
    const urls = g("slider_images")
      .split("\n")
      .map((u) => u.trim())
      .filter(Boolean);
    const ap = Number(g("slider_autoplay"));
    return {
      images: urls.map((url) => ({ url })),
      autoplay: ap > 0 ? ap : 5,
      en: {
        eyebrow: g("slider_en_eyebrow") || undefined,
        title: g("slider_en_title") || undefined,
        subtitle: g("slider_en_subtitle") || undefined,
      },
      gr: {
        eyebrow: g("slider_gr_eyebrow") || undefined,
        title: g("slider_gr_title") || undefined,
        subtitle: g("slider_gr_subtitle") || undefined,
      },
    };
  }

  if (shape === "experiences") {
    const raw = g("experiences_json");
    try {
      const parsed = JSON.parse(raw || "[]");
      return { items: Array.isArray(parsed) ? parsed : [] };
    } catch {
      return { items: [] };
    }
  }

  if (shape === "faq") {
    const raw = g("faq_json");
    try {
      const parsed = JSON.parse(raw || "[]");
      return { items: Array.isArray(parsed) ? parsed : [] };
    } catch {
      return { items: [] };
    }
  }

  return {};
}

export function HeroEditor({
  initial,
  saveAction,
}: {
  initial: Record<string, unknown>;
  saveAction: (fd: FormData) => Promise<void>;
}) {
  const en = (initial.en || {}) as Record<string, string>;
  const gr = (initial.gr || {}) as Record<string, string>;
  const images = (initial.images as Array<{ url: string }>) || [];
  const imageUrls =
    images.length > 0
      ? images.map((i) => i.url).join("\n")
      : String(initial.image || "");

  async function handleSubmit(fd: FormData) {
    const value = buildContentFromForm(fd, "hero");
    const out = new FormData();
    out.set("value", JSON.stringify(value));
    await saveAction(out);
  }

  return (
    <form action={handleSubmit} className="mt-4 grid gap-4">
      <Field label="Hero images (one URL per line — enables slider)" name="hero_images" defaultValue={imageUrls} multiline />
      <Field label="Or single fallback image URL" name="hero_image" defaultValue={String(initial.image || "")} />
      <Field label="Autoplay seconds (0 = off)" name="hero_autoplay" defaultValue={String(initial.autoplay ?? 6)} />
      <div className="grid gap-4 lg:grid-cols-2">
        <fieldset className="rounded-2xl border border-ink-900/5 bg-sand-50/40 p-4">
          <legend className="px-1 text-xs font-semibold uppercase text-ink-500">English</legend>
          <div className="mt-2 grid gap-3">
            <Field label="Eyebrow" name="hero_en_eyebrow" defaultValue={en.eyebrow} />
            <Field label="Title" name="hero_en_title" defaultValue={en.title} />
            <Field label="Subtitle" name="hero_en_subtitle" defaultValue={en.subtitle} multiline />
          </div>
        </fieldset>
        <fieldset className="rounded-2xl border border-ink-900/5 bg-sand-50/40 p-4">
          <legend className="px-1 text-xs font-semibold uppercase text-ink-500">Greek</legend>
          <div className="mt-2 grid gap-3">
            <Field label="Eyebrow" name="hero_gr_eyebrow" defaultValue={gr.eyebrow} />
            <Field label="Title" name="hero_gr_title" defaultValue={gr.title} />
            <Field label="Subtitle" name="hero_gr_subtitle" defaultValue={gr.subtitle} multiline />
          </div>
        </fieldset>
      </div>
      <SubmitBtn label="Save hero" />
    </form>
  );
}

export function AboutEditor({
  initial,
  saveAction,
}: {
  initial: Record<string, unknown>;
  saveAction: (fd: FormData) => Promise<void>;
}) {
  const en = (initial.en || {}) as Record<string, string>;
  const gr = (initial.gr || {}) as Record<string, string>;
  const stats = ((initial.stats as Array<{ k: string; v: string }>) || [])
    .map((s) => `${s.k}|${s.v}`)
    .join("\n");

  async function handleSubmit(fd: FormData) {
    const out = new FormData();
    out.set("value", JSON.stringify(buildContentFromForm(fd, "about")));
    await saveAction(out);
  }

  return (
    <form action={handleSubmit} className="mt-4 grid gap-4">
      <Field label="Image URL" name="about_image" defaultValue={String(initial.image || "")} />
      <Field label="Stats (format: number|label, one per line)" name="about_stats" defaultValue={stats} multiline />
      <div className="grid gap-4 lg:grid-cols-2">
        <LocaleBlock locale="en" prefix="about" defaults={en} fields={[
          { key: "eyebrow", label: "Eyebrow" },
          { key: "title", label: "Title" },
          { key: "body", label: "Body", multiline: true },
        ]} />
        <LocaleBlock locale="gr" prefix="about" defaults={gr} fields={[
          { key: "eyebrow", label: "Eyebrow" },
          { key: "title", label: "Title" },
          { key: "body", label: "Body", multiline: true },
        ]} />
      </div>
      <SubmitBtn label="Save about" />
    </form>
  );
}

export function CtaEditor({
  initial,
  saveAction,
}: {
  initial: Record<string, unknown>;
  saveAction: (fd: FormData) => Promise<void>;
}) {
  const en = (initial.en || {}) as Record<string, string>;
  const gr = (initial.gr || {}) as Record<string, string>;

  async function handleSubmit(fd: FormData) {
    const out = new FormData();
    out.set("value", JSON.stringify(buildContentFromForm(fd, "cta")));
    await saveAction(out);
  }

  return (
    <form action={handleSubmit} className="mt-4 grid gap-4">
      <Field label="Background image URL" name="cta_image" defaultValue={String(initial.image || "")} />
      <div className="grid gap-4 lg:grid-cols-2">
        <fieldset className="rounded-2xl border border-ink-900/5 p-4">
          <legend className="text-xs font-semibold uppercase text-ink-500">English</legend>
          <div className="mt-2 grid gap-3">
            <Field label="Title" name="cta_en_title" defaultValue={en.title} />
            <Field label="Body" name="cta_en_body" defaultValue={en.body} multiline />
          </div>
        </fieldset>
        <fieldset className="rounded-2xl border border-ink-900/5 p-4">
          <legend className="text-xs font-semibold uppercase text-ink-500">Greek</legend>
          <div className="mt-2 grid gap-3">
            <Field label="Title" name="cta_gr_title" defaultValue={gr.title} />
            <Field label="Body" name="cta_gr_body" defaultValue={gr.body} multiline />
          </div>
        </fieldset>
      </div>
      <SubmitBtn label="Save CTA" />
    </form>
  );
}

export function SliderEditor({
  initial,
  saveAction,
}: {
  initial: Record<string, unknown>;
  saveAction: (fd: FormData) => Promise<void>;
}) {
  const en = (initial.en || {}) as Record<string, string>;
  const gr = (initial.gr || {}) as Record<string, string>;
  const images = ((initial.images as Array<{ url: string }>) || [])
    .map((i) => i.url)
    .join("\n");

  async function handleSubmit(fd: FormData) {
    const out = new FormData();
    out.set("value", JSON.stringify(buildContentFromForm(fd, "slider")));
    await saveAction(out);
  }

  return (
    <form action={handleSubmit} className="mt-4 grid gap-4">
      <Field label="Slide URLs (one per line)" name="slider_images" defaultValue={images} multiline />
      <Field label="Autoplay seconds" name="slider_autoplay" defaultValue={String(initial.autoplay ?? 5)} />
      <div className="grid gap-4 lg:grid-cols-2">
        <fieldset className="rounded-2xl border border-ink-900/5 p-4">
          <legend className="text-xs font-semibold uppercase text-ink-500">English</legend>
          <div className="mt-2 grid gap-3">
            <Field label="Eyebrow" name="slider_en_eyebrow" defaultValue={en.eyebrow} />
            <Field label="Title" name="slider_en_title" defaultValue={en.title} />
            <Field label="Subtitle" name="slider_en_subtitle" defaultValue={en.subtitle} />
          </div>
        </fieldset>
        <fieldset className="rounded-2xl border border-ink-900/5 p-4">
          <legend className="text-xs font-semibold uppercase text-ink-500">Greek</legend>
          <div className="mt-2 grid gap-3">
            <Field label="Eyebrow" name="slider_gr_eyebrow" defaultValue={gr.eyebrow} />
            <Field label="Title" name="slider_gr_title" defaultValue={gr.title} />
            <Field label="Subtitle" name="slider_gr_subtitle" defaultValue={gr.subtitle} />
          </div>
        </fieldset>
      </div>
      <SubmitBtn label="Save slider" />
    </form>
  );
}

export function TextEditor({
  initial,
  saveAction,
}: {
  initial: Record<string, unknown>;
  saveAction: (fd: FormData) => Promise<void>;
}) {
  const en = (initial.en || {}) as Record<string, string>;
  const gr = (initial.gr || {}) as Record<string, string>;

  async function handleSubmit(fd: FormData) {
    const out = new FormData();
    out.set("value", JSON.stringify(buildContentFromForm(fd, "text")));
    await saveAction(out);
  }

  return (
    <form action={handleSubmit} className="mt-4 grid gap-4">
      <div className="grid gap-4 lg:grid-cols-2">
        <fieldset className="rounded-2xl border border-ink-900/5 p-4">
          <legend className="text-xs font-semibold uppercase text-ink-500">English</legend>
          <div className="mt-2 grid gap-3">
            <Field label="Eyebrow" name="text_en_eyebrow" defaultValue={en.eyebrow} />
            <Field label="Title" name="text_en_title" defaultValue={en.title} />
            <Field label="Body" name="text_en_body" defaultValue={en.body} multiline />
          </div>
        </fieldset>
        <fieldset className="rounded-2xl border border-ink-900/5 p-4">
          <legend className="text-xs font-semibold uppercase text-ink-500">Greek</legend>
          <div className="mt-2 grid gap-3">
            <Field label="Eyebrow" name="text_gr_eyebrow" defaultValue={gr.eyebrow} />
            <Field label="Title" name="text_gr_title" defaultValue={gr.title} />
            <Field label="Body" name="text_gr_body" defaultValue={gr.body} multiline />
          </div>
        </fieldset>
      </div>
      <SubmitBtn label="Save text block" />
    </form>
  );
}

export function JsonEditor({
  label,
  name,
  initial,
  saveAction,
  shape,
}: {
  label: string;
  name: string;
  initial: Record<string, unknown>;
  saveAction: (fd: FormData) => Promise<void>;
  shape: "experiences" | "faq";
}) {
  const defaultJson = JSON.stringify(
    shape === "experiences" ? initial.items || [] : initial.items || [],
    null,
    2
  );

  async function handleSubmit(fd: FormData) {
    const out = new FormData();
    out.set("value", JSON.stringify(buildContentFromForm(fd, shape)));
    await saveAction(out);
  }

  return (
    <form action={handleSubmit} className="mt-4 grid gap-3">
      <p className="text-xs text-ink-500">{label}</p>
      <textarea
        name={`${shape}_json`}
        defaultValue={defaultJson}
        rows={8}
        className="input resize-y font-mono text-xs"
      />
      <SubmitBtn label={`Save ${shape}`} />
    </form>
  );
}

export type ContentKey = SiteContentKey;
