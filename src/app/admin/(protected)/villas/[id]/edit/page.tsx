import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, Trash2, Plus, ExternalLink, Image as ImgIcon } from "lucide-react";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import VillaForm from "../../_form";
import {
  updateVilla,
  deleteVilla,
  addImageUrl,
  uploadImageFile,
  deleteImage,
  addUnavailableRange,
  deleteUnavailableRange,
} from "../../../../actions";

export const dynamic = "force-dynamic";

export default async function EditVillaPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = createSupabaseAdminClient();
  const { data: villa } = await supabase
    .from("villas")
    .select("*")
    .eq("id", params.id)
    .maybeSingle();
  if (!villa) notFound();

  const { data: images } = await supabase
    .from("villa_images")
    .select("*")
    .eq("villa_id", params.id)
    .order("position", { ascending: true });

  const { data: unavailable } = await supabase
    .from("villa_unavailable_dates")
    .select("*")
    .eq("villa_id", params.id)
    .order("start_date", { ascending: true });

  const update = updateVilla.bind(null, params.id);
  const remove = deleteVilla.bind(null, params.id);
  const addUrl = addImageUrl.bind(null, params.id);
  const uploadFile = uploadImageFile.bind(null, params.id);
  const addRange = addUnavailableRange.bind(null, params.id);

  return (
    <div>
      <Link
        href="/admin/villas"
        className="inline-flex items-center gap-2 text-sm text-ink-500 hover:text-ink-900"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to villas
      </Link>

      <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl text-ink-900">{villa.name}</h1>
          <Link
            href={`/villas/${villa.slug}`}
            target="_blank"
            className="mt-1 inline-flex items-center gap-1.5 text-xs text-ink-500 hover:text-ink-900"
          >
            View public page <ExternalLink className="h-3 w-3" />
          </Link>
        </div>
        <form action={remove}>
          <button className="inline-flex items-center gap-2 rounded-full border border-red-200 px-4 py-2 text-sm text-red-600 hover:bg-red-50">
            <Trash2 className="h-4 w-4" />
            Delete villa
          </button>
        </form>
      </div>

      <div className="mt-8 rounded-2xl border border-ink-900/5 bg-white p-6 md:p-8">
        <h2 className="font-serif text-xl text-ink-900">Details</h2>
        <div className="mt-6">
          <VillaForm villa={villa} action={update} submitLabel="Save changes" />
        </div>
      </div>

      <div className="mt-8 rounded-2xl border border-ink-900/5 bg-white p-6 md:p-8">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-xl text-ink-900">Gallery</h2>
          <span className="text-xs text-ink-400">
            {images?.length || 0} images
          </span>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {(images || []).map((img) => (
            <div
              key={img.id}
              className="group relative overflow-hidden rounded-2xl bg-ink-100"
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={img.image_url}
                  alt={img.alt || ""}
                  fill
                  sizes="(min-width:1024px) 25vw, 50vw"
                  className="object-cover"
                />
              </div>
              <form
                action={deleteImage.bind(null, img.id, params.id)}
                className="absolute inset-x-2 bottom-2 opacity-0 transition group-hover:opacity-100"
              >
                <button className="inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs text-red-600 backdrop-blur">
                  <Trash2 className="h-3 w-3" />
                  Remove
                </button>
              </form>
            </div>
          ))}
          {(!images || images.length === 0) && (
            <div className="col-span-full grid place-items-center rounded-2xl border border-dashed border-ink-200 p-10 text-sm text-ink-400">
              No gallery images yet.
            </div>
          )}
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <form action={uploadFile} className="rounded-2xl bg-sand-100/40 p-5">
            <div className="flex items-center gap-2 text-sm font-medium text-ink-900">
              <ImgIcon className="h-4 w-4" />
              Upload image
            </div>
            <p className="mt-1 text-xs text-ink-500">
              Files go to Supabase Storage (bucket: villa-images).
            </p>
            <input
              type="file"
              name="file"
              accept="image/*"
              required
              className="mt-4 block w-full text-sm text-ink-700 file:mr-3 file:cursor-pointer file:rounded-full file:border-0 file:bg-ink-900 file:px-4 file:py-2 file:text-xs file:text-sand-50 hover:file:bg-ink-700"
            />
            <button className="btn-primary mt-4 w-full">
              <Plus className="h-4 w-4" /> Upload
            </button>
          </form>

          <form action={addUrl} className="rounded-2xl bg-sand-100/40 p-5">
            <div className="text-sm font-medium text-ink-900">Add image by URL</div>
            <p className="mt-1 text-xs text-ink-500">
              Useful for Unsplash or your own CDN.
            </p>
            <input
              name="image_url"
              required
              placeholder="https://..."
              className="input mt-4"
            />
            <input
              name="alt"
              placeholder="Alt text (optional)"
              className="input mt-2"
            />
            <button className="btn-primary mt-4 w-full">
              <Plus className="h-4 w-4" /> Add image
            </button>
          </form>
        </div>
      </div>

      <div className="mt-8 rounded-2xl border border-ink-900/5 bg-white p-6 md:p-8">
        <h2 className="font-serif text-xl text-ink-900">
          Unavailable dates
        </h2>
        <p className="mt-1 text-sm text-ink-500">
          Mark date ranges when the villa is already booked. They appear in red
          on the public calendar.
        </p>

        <form action={addRange} className="mt-6 grid gap-3 md:grid-cols-4">
          <div>
            <label className="label">Start</label>
            <input
              type="date"
              name="start_date"
              required
              className="input"
            />
          </div>
          <div>
            <label className="label">End</label>
            <input type="date" name="end_date" required className="input" />
          </div>
          <div className="md:col-span-1">
            <label className="label">Note</label>
            <input name="note" className="input" placeholder="Booked" />
          </div>
          <div className="flex items-end">
            <button className="btn-primary w-full">
              <Plus className="h-4 w-4" />
              Add
            </button>
          </div>
        </form>

        <div className="mt-6 divide-y divide-ink-900/5 rounded-xl border border-ink-900/5">
          {(unavailable || []).map((r) => (
            <div
              key={r.id}
              className="flex items-center justify-between p-3 text-sm"
            >
              <div>
                <span className="font-medium text-ink-900">
                  {r.start_date} → {r.end_date}
                </span>
                {r.note && (
                  <span className="ml-2 text-xs text-ink-500">{r.note}</span>
                )}
              </div>
              <form action={deleteUnavailableRange.bind(null, r.id, params.id)}>
                <button className="text-xs text-red-600 hover:underline">
                  Remove
                </button>
              </form>
            </div>
          ))}
          {(!unavailable || unavailable.length === 0) && (
            <div className="p-6 text-center text-sm text-ink-400">
              No unavailable date ranges yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
