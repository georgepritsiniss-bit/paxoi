import Link from "next/link";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { saveSiteContent, resetSiteContent } from "../../actions";
import ContentEditor from "../content/_form";

export const dynamic = "force-dynamic";

const PAGE_SECTIONS = [
  {
    key: "page_about" as const,
    title: "About page",
    description: "Content for /about — hero image and bilingual copy.",
    template: {
      image: "",
      en: { eyebrow: "", title: "", body: "" },
      gr: { eyebrow: "", title: "", body: "" },
    },
    href: "/about",
  },
  {
    key: "page_faq" as const,
    title: "FAQ page",
    description: "Full FAQ list shown on /faq.",
    template: {
      items: [{ en: { q: "", a: "" }, gr: { q: "", a: "" } }],
    },
    href: "/faq",
  },
];

export default async function AdminPagesPage() {
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
          <h1 className="font-serif text-3xl text-ink-900">Site pages</h1>
          <p className="mt-2 max-w-2xl text-sm text-ink-500">
            Edit standalone pages. The homepage is built in{" "}
            <Link href="/admin/layout" className="underline">
              Page builder
            </Link>
            .
          </p>
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { href: "/about", label: "About" },
          { href: "/experiences", label: "Experiences" },
          { href: "/faq", label: "FAQ" },
          { href: "/contact", label: "Contact" },
          { href: "/villas", label: "Villas listing" },
          { href: "/privacy", label: "Privacy" },
          { href: "/terms", label: "Terms" },
        ].map((p) => (
          <Link
            key={p.href}
            href={p.href}
            target="_blank"
            className="rounded-2xl border border-ink-900/5 bg-white p-4 text-sm font-medium text-ink-900 transition-all hover:-translate-y-0.5 hover:shadow-md"
          >
            Preview {p.label} →
          </Link>
        ))}
      </div>

      <div className="mt-10 space-y-6">
        {PAGE_SECTIONS.map((section) => {
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
              description={`${section.description} Live: ${section.href}`}
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
