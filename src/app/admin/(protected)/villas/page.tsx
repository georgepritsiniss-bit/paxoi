import Link from "next/link";
import Image from "next/image";
import { Plus, Pencil } from "lucide-react";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

export default async function AdminVillasPage() {
  const supabase = createSupabaseAdminClient();
  const { data: villas } = await supabase
    .from("villas")
    .select("id, name, slug, hero_image, featured, is_available, price_from")
    .order("created_at", { ascending: true });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-3xl text-ink-900">Villas</h1>
        <Link href="/admin/villas/new" className="btn-primary">
          <Plus className="h-4 w-4" />
          New villa
        </Link>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {(villas || []).map((v) => (
          <Link
            key={v.id}
            href={`/admin/villas/${v.id}/edit`}
            className="group overflow-hidden rounded-2xl border border-ink-900/5 bg-white transition-all hover:-translate-y-0.5 hover:shadow-xl"
          >
            <div className="relative aspect-[16/10] bg-ink-100">
              {v.hero_image && (
                <Image
                  src={v.hero_image}
                  alt={v.name}
                  fill
                  sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw"
                  className="object-cover"
                />
              )}
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="font-medium text-ink-900">{v.name}</div>
                  <div className="text-xs text-ink-500">{v.slug}</div>
                </div>
                <Pencil className="h-4 w-4 text-ink-400 transition-colors group-hover:text-ink-900" />
              </div>
              <div className="mt-3 flex items-center gap-2 text-xs">
                {v.featured && (
                  <span className="rounded-full bg-sand-100 px-2 py-0.5 text-sand-700">
                    Featured
                  </span>
                )}
                <span
                  className={
                    v.is_available
                      ? "rounded-full bg-emerald-50 px-2 py-0.5 text-emerald-700"
                      : "rounded-full bg-red-50 px-2 py-0.5 text-red-700"
                  }
                >
                  {v.is_available ? "Available" : "Hidden"}
                </span>
              </div>
            </div>
          </Link>
        ))}
        {(!villas || villas.length === 0) && (
          <div className="col-span-full grid place-items-center rounded-2xl border border-dashed border-ink-200 p-12 text-center text-ink-500">
            No villas yet.{" "}
            <Link
              href="/admin/villas/new"
              className="ml-2 underline underline-offset-4"
            >
              Create the first one
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
