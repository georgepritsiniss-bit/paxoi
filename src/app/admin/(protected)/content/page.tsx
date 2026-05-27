import Link from "next/link";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { saveSiteContent, resetSiteContent } from "../../actions";
import ContentEditor from "./_form";
import type { SiteContentKey } from "@/types";

export const dynamic = "force-dynamic";

const SECTIONS: Array<{
  key: SiteContentKey;
  title: string;
  description: string;
  template: Record<string, unknown>;
}> = [
  {
    key: "home_hero",
    title: "Hero",
    description: "Full-bleed hero on the homepage.",
    template: {
      image: "",
      en: { eyebrow: "", title: "", subtitle: "" },
      gr: { eyebrow: "", title: "", subtitle: "" },
    },
  },
  {
    key: "home_about",
    title: "About",
    description: "Editorial section with image, copy and stats.",
    template: {
      image: "",
      stats: [{ k: "", v: "" }],
      en: { eyebrow: "", title: "", body: "" },
      gr: { eyebrow: "", title: "", body: "" },
    },
  },
  {
    key: "home_experiences",
    title: "Experiences",
    description:
      "Grid of curated experiences. Each item has an icon name, image, and bilingual copy.",
    template: {
      items: [
        {
          icon: "Sailboat",
          image: "",
          en: { title: "", body: "" },
          gr: { title: "", body: "" },
        },
      ],
    },
  },
  {
    key: "home_cta",
    title: "Call to action",
    description: "Final banner before the footer.",
    template: {
      image: "",
      en: { title: "", body: "" },
      gr: { title: "", body: "" },
    },
  },
];

export default async function AdminContentPage() {
  const supabase = createSupabaseAdminClient();
  const { data } = await supabase.from("site_content").select("key, value");

  const rows = new Map<string, unknown>();
  for (const r of (data as { key: string; value: unknown }[]) || []) {
    rows.set(r.key, r.value);
  }

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-serif text-3xl text-ink-900">Site content</h1>
          <p className="mt-2 max-w-2xl text-sm text-ink-500">
            Edit the homepage blocks directly. Each section accepts an English
            and Greek version — empty fields fall back to the built-in copy.
            Save publishes changes instantly to{" "}
            <Link href="/" className="underline underline-offset-4">
              the live site
            </Link>
            .
          </p>
        </div>
        <Link
          href="/admin/media"
          className="btn-ghost"
        >
          Open media library →
        </Link>
      </div>

      <div className="mt-8 space-y-6">
        {SECTIONS.map((section) => {
          const current = rows.get(section.key);
          const initial =
            current && typeof current === "object"
              ? (current as Record<string, unknown>)
              : section.template;
          const save = saveSiteContent.bind(null, section.key);
          const reset = resetSiteContent.bind(null, section.key);
          return (
            <ContentEditor
              key={section.key}
              title={section.title}
              description={section.description}
              initial={initial}
              template={section.template}
              saveAction={save}
              resetAction={reset}
              hasOverride={rows.has(section.key)}
            />
          );
        })}
      </div>
    </div>
  );
}
