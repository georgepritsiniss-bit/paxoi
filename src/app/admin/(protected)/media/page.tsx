import Link from "next/link";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import MediaCard from "./_card";
import { AddUrlForm, UploadFileForm } from "./_upload-forms";
import type { MediaItem } from "@/types";

export const dynamic = "force-dynamic";

export default async function MediaLibraryPage() {
  const supabase = createSupabaseAdminClient();
  const { data } = await supabase
    .from("media_library")
    .select("*")
    .order("created_at", { ascending: false });
  const items: MediaItem[] = (data as MediaItem[]) || [];

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-serif text-3xl text-ink-900">Media library</h1>
          <p className="mt-2 max-w-2xl text-sm text-ink-500">
            A reusable catalogue of images you can reference from anywhere on
            the site. Upload your own files or save a URL from Unsplash / your
            CDN — then copy the URL into any villa, hero or experience block.
          </p>
        </div>
        <Link href="/admin/content" className="btn-ghost">
          ← Back to content
        </Link>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <UploadFileForm />
        <AddUrlForm />
      </div>

      <div className="mt-10 flex items-center justify-between">
        <h2 className="font-serif text-xl text-ink-900">
          All assets <span className="ml-2 text-sm text-ink-400">({items.length})</span>
        </h2>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((m) => (
          <MediaCard key={m.id} item={m} />
        ))}
        {items.length === 0 && (
          <div className="col-span-full grid place-items-center rounded-2xl border border-dashed border-ink-200 p-12 text-center text-sm text-ink-400">
            Your media library is empty. Upload your first image above.
          </div>
        )}
      </div>
    </div>
  );
}
