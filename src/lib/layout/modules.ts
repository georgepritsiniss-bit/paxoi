import type { SiteContentKey } from "@/types";

export type LayoutModuleType =
  | "hero"
  | "about"
  | "featured_villas"
  | "experiences"
  | "cta"
  | "image_slider"
  | "text_block"
  | "faq";

export type LayoutModule = {
  id: string;
  type: LayoutModuleType;
  enabled: boolean;
};

export type HomeLayout = {
  modules: LayoutModule[];
};

export const MODULE_META: Record<
  LayoutModuleType,
  { label: string; description: string; contentKey?: SiteContentKey | string }
> = {
  hero: {
    label: "Hero",
    description: "Full-screen banner with headline and image slider.",
    contentKey: "home_hero",
  },
  about: {
    label: "About",
    description: "Editorial section with image, copy and stats.",
    contentKey: "home_about",
  },
  featured_villas: {
    label: "Featured villas",
    description: "Grid of featured villa cards from your listings.",
  },
  experiences: {
    label: "Experiences",
    description: "Curated experiences grid with images.",
    contentKey: "home_experiences",
  },
  cta: {
    label: "Call to action",
    description: "Banner with booking prompt before the footer.",
    contentKey: "home_cta",
  },
  image_slider: {
    label: "Image slider",
    description: "Standalone photo carousel section.",
    contentKey: "home_slider",
  },
  text_block: {
    label: "Text block",
    description: "Simple heading and body copy section.",
    contentKey: "home_text",
  },
  faq: {
    label: "FAQ preview",
    description: "Accordion of common questions with link to full FAQ.",
    contentKey: "home_faq",
  },
};

export const DEFAULT_HOME_LAYOUT: HomeLayout = {
  modules: [
    { id: "mod-hero", type: "hero", enabled: true },
    { id: "mod-about", type: "about", enabled: true },
    { id: "mod-villas", type: "featured_villas", enabled: true },
    { id: "mod-exp", type: "experiences", enabled: true },
    { id: "mod-cta", type: "cta", enabled: true },
  ],
};

export function normalizeHomeLayout(raw: unknown): HomeLayout {
  if (!raw || typeof raw !== "object") return DEFAULT_HOME_LAYOUT;
  const obj = raw as { modules?: unknown };
  if (!Array.isArray(obj.modules)) return DEFAULT_HOME_LAYOUT;

  const modules: LayoutModule[] = [];
  for (const m of obj.modules) {
    if (!m || typeof m !== "object") continue;
    const item = m as Partial<LayoutModule>;
    if (!item.type || !(item.type in MODULE_META)) continue;
    modules.push({
      id: String(item.id || `mod-${item.type}-${modules.length}`),
      type: item.type as LayoutModuleType,
      enabled: item.enabled !== false,
    });
  }

  return modules.length > 0 ? { modules } : DEFAULT_HOME_LAYOUT;
}

export function createModule(type: LayoutModuleType): LayoutModule {
  return {
    id: `mod-${type}-${Date.now()}`,
    type,
    enabled: true,
  };
}
