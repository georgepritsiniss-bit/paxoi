import Link from "next/link";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { saveSiteContent } from "../../actions";
import LayoutBuilder from "./_builder";
import {
  DEFAULT_HOME_LAYOUT,
  normalizeHomeLayout,
} from "@/lib/layout/modules";
import type { SiteContentKey } from "@/types";

export const dynamic = "force-dynamic";

export default async function AdminLayoutPage() {
  const supabase = createSupabaseAdminClient();
  const { data } = await supabase.from("site_content").select("key, value");

  const content: Record<string, Record<string, unknown>> = {};
  let layoutRaw: unknown = null;

  for (const row of (data as { key: string; value: unknown }[]) || []) {
    if (row.key === "home_layout") {
      layoutRaw = row.value;
    } else if (row.value && typeof row.value === "object") {
      content[row.key] = row.value as Record<string, unknown>;
    }
  }

  const initialLayout = normalizeHomeLayout(layoutRaw ?? DEFAULT_HOME_LAYOUT);

  async function saveContent(key: SiteContentKey, formData: FormData) {
    "use server";
    await saveSiteContent(key, formData);
  }

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-serif text-3xl text-ink-900">Page builder</h1>
          <p className="mt-2 max-w-2xl text-sm text-ink-500">
            Arrange homepage modules, show or hide sections, and edit each
            block&apos;s content — no code required.
          </p>
        </div>
        <Link href="/admin/pages" className="btn-secondary text-sm">
          Other pages →
        </Link>
      </div>

      <div className="mt-8">
        <LayoutBuilder
          initialLayout={initialLayout}
          content={content}
          saveContentAction={saveContent}
        />
      </div>
    </div>
  );
}
