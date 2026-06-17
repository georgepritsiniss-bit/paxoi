"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import {
  ChevronDown,
  ChevronUp,
  Eye,
  EyeOff,
  GripVertical,
  Loader2,
  Save,
  Trash2,
} from "lucide-react";
import { saveHomeLayout } from "../../actions";
import {
  MODULE_META,
  createModule,
  normalizeHomeLayout,
  type HomeLayout,
  type LayoutModule,
  type LayoutModuleType,
} from "@/lib/layout/modules";
import { cn } from "@/lib/utils";
import {
  HeroEditor,
  AboutEditor,
  CtaEditor,
  SliderEditor,
  TextEditor,
  JsonEditor,
} from "./_editors";
import type { SiteContentKey } from "@/types";

const ADDABLE: LayoutModuleType[] = [
  "hero",
  "about",
  "featured_villas",
  "experiences",
  "cta",
  "image_slider",
  "text_block",
  "faq",
];

export default function LayoutBuilder({
  initialLayout,
  content,
  saveContentAction,
}: {
  initialLayout: HomeLayout;
  content: Record<string, Record<string, unknown>>;
  saveContentAction: (key: SiteContentKey, fd: FormData) => Promise<void>;
}) {
  const [layout, setLayout] = useState<HomeLayout>(
    normalizeHomeLayout(initialLayout)
  );
  const [expanded, setExpanded] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);

  function moveModule(index: number, dir: -1 | 1) {
    const next = [...layout.modules];
    const target = index + dir;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    setLayout({ modules: next });
    setSaved(false);
  }

  function toggleModule(id: string) {
    setLayout({
      modules: layout.modules.map((m) =>
        m.id === id ? { ...m, enabled: !m.enabled } : m
      ),
    });
    setSaved(false);
  }

  function removeModule(id: string) {
    setLayout({ modules: layout.modules.filter((m) => m.id !== id) });
    setSaved(false);
  }

  function addModule(type: LayoutModuleType) {
    setLayout({ modules: [...layout.modules, createModule(type)] });
    setSaved(false);
  }

  function saveLayout() {
    startTransition(async () => {
      const fd = new FormData();
      fd.set("layout", JSON.stringify(layout));
      await saveHomeLayout(fd);
      setSaved(true);
    });
  }

  function contentFor(type: LayoutModuleType): Record<string, unknown> {
    const key = MODULE_META[type].contentKey;
    if (!key) return {};
    return content[key] || {};
  }

  function bindSave(key: SiteContentKey) {
    return (fd: FormData) => saveContentAction(key, fd);
  }

  function renderEditor(mod: LayoutModule) {
    const data = contentFor(mod.type);
    switch (mod.type) {
      case "hero":
        return (
          <HeroEditor initial={data} saveAction={bindSave("home_hero")} />
        );
      case "about":
        return (
          <AboutEditor initial={data} saveAction={bindSave("home_about")} />
        );
      case "experiences":
        return (
          <JsonEditor
            label="Experience items JSON (icon, image, en, gr per item)"
            name="experiences"
            initial={data}
            saveAction={bindSave("home_experiences")}
            shape="experiences"
          />
        );
      case "cta":
        return <CtaEditor initial={data} saveAction={bindSave("home_cta")} />;
      case "image_slider":
        return (
          <SliderEditor initial={data} saveAction={bindSave("home_slider")} />
        );
      case "text_block":
        return (
          <TextEditor initial={data} saveAction={bindSave("home_text")} />
        );
      case "faq":
        return (
          <JsonEditor
            label='FAQ items JSON: [{ "en": { "q": "...", "a": "..." }, "gr": {...} }]'
            name="faq"
            initial={data}
            saveAction={bindSave("home_faq")}
            shape="faq"
          />
        );
      case "featured_villas":
        return (
          <p className="mt-4 text-sm text-ink-500">
            Featured villas are pulled automatically from listings marked
            &quot;Featured&quot; in{" "}
            <Link href="/admin/villas" className="underline">
              Villas
            </Link>
            .
          </p>
        );
      default:
        return null;
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <select
            className="input w-auto text-sm"
            defaultValue=""
            onChange={(e) => {
              const v = e.target.value as LayoutModuleType;
              if (v) {
                addModule(v);
                e.target.value = "";
              }
            }}
          >
            <option value="" disabled>
              + Add module
            </option>
            {ADDABLE.map((t) => (
              <option key={t} value={t}>
                {MODULE_META[t].label}
              </option>
            ))}
          </select>
        </div>
        <button
          type="button"
          onClick={saveLayout}
          disabled={pending}
          className="btn-primary"
        >
          {pending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          {saved ? "Saved!" : "Save page layout"}
        </button>
      </div>

      <div className="space-y-3">
        {layout.modules.map((mod, index) => {
          const meta = MODULE_META[mod.type];
          const isOpen = expanded === mod.id;
          return (
            <div
              key={mod.id}
              className={cn(
                "overflow-hidden rounded-2xl border bg-white transition-all",
                mod.enabled
                  ? "border-ink-900/5"
                  : "border-dashed border-ink-200 opacity-60"
              )}
            >
              <div className="flex items-center gap-2 p-4 sm:p-5">
                <GripVertical className="hidden h-4 w-4 shrink-0 text-ink-300 sm:block" />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-medium text-ink-900">
                      {meta.label}
                    </span>
                    <span className="rounded-full bg-sand-100 px-2 py-0.5 text-[10px] uppercase tracking-wider text-sand-700">
                      {mod.type}
                    </span>
                    {!mod.enabled && (
                      <span className="text-xs text-ink-400">Hidden</span>
                    )}
                  </div>
                  <p className="mt-0.5 truncate text-xs text-ink-500">
                    {meta.description}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-1">
                  <button
                    type="button"
                    onClick={() => moveModule(index, -1)}
                    disabled={index === 0}
                    className="grid h-8 w-8 place-items-center rounded-lg text-ink-500 hover:bg-ink-900/5 disabled:opacity-30"
                    aria-label="Move up"
                  >
                    <ChevronUp className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => moveModule(index, 1)}
                    disabled={index === layout.modules.length - 1}
                    className="grid h-8 w-8 place-items-center rounded-lg text-ink-500 hover:bg-ink-900/5 disabled:opacity-30"
                    aria-label="Move down"
                  >
                    <ChevronDown className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleModule(mod.id)}
                    className="grid h-8 w-8 place-items-center rounded-lg text-ink-500 hover:bg-ink-900/5"
                    aria-label={mod.enabled ? "Hide module" : "Show module"}
                  >
                    {mod.enabled ? (
                      <Eye className="h-4 w-4" />
                    ) : (
                      <EyeOff className="h-4 w-4" />
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => removeModule(mod.id)}
                    className="grid h-8 w-8 place-items-center rounded-lg text-red-500 hover:bg-red-50"
                    aria-label="Remove module"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setExpanded(isOpen ? null : mod.id)}
                    className="rounded-lg px-3 py-1.5 text-xs font-medium text-ink-700 hover:bg-ink-900/5"
                  >
                    {isOpen ? "Close" : "Edit"}
                  </button>
                </div>
              </div>

              {isOpen && (
                <div className="border-t border-ink-900/5 bg-sand-50/30 p-4 sm:p-5">
                  {renderEditor(mod)}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {layout.modules.length === 0 && (
        <div className="rounded-2xl border border-dashed border-ink-200 p-12 text-center text-sm text-ink-500">
          No modules yet. Add one above to build your homepage.
        </div>
      )}

      <p className="text-xs text-ink-400">
        Tip: upload images in{" "}
        <Link href="/admin/media" className="underline">
          Media library
        </Link>
        , copy the URL, then paste into module fields.{" "}
        <Link href="/" className="underline" target="_blank">
          Preview live site →
        </Link>
      </p>
    </div>
  );
}
