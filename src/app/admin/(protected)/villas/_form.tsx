"use client";

import { useFormStatus } from "react-dom";
import Link from "next/link";
import { ExternalLink, Loader2 } from "lucide-react";
import type { Villa } from "@/types";

function Submit({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="btn-primary">
      {pending && <Loader2 className="h-4 w-4 animate-spin" />}
      {label}
    </button>
  );
}

export default function VillaForm({
  villa,
  action,
  submitLabel,
}: {
  villa?: Villa;
  action: (formData: FormData) => Promise<void> | void;
  submitLabel: string;
}) {
  return (
    <form action={action as unknown as (fd: FormData) => void} className="grid gap-5">
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label className="label">Name</label>
          <input
            className="input"
            name="name"
            defaultValue={villa?.name || ""}
            required
          />
        </div>
        <div>
          <label className="label">Slug (URL)</label>
          <input
            className="input"
            name="slug"
            defaultValue={villa?.slug || ""}
            placeholder="auto from name if empty"
          />
        </div>
      </div>

      <div>
        <label className="label">Tagline</label>
        <input
          className="input"
          name="tagline"
          defaultValue={villa?.tagline || ""}
          placeholder="One short line shown under the title"
        />
      </div>

      <div>
        <label className="label">Description</label>
        <textarea
          className="input resize-y"
          name="description"
          rows={6}
          defaultValue={villa?.description || ""}
          required
        />
      </div>

      <div className="grid gap-5 md:grid-cols-4">
        <div>
          <label className="label">Capacity</label>
          <input
            type="number"
            min={1}
            className="input"
            name="capacity"
            defaultValue={villa?.capacity ?? 2}
          />
        </div>
        <div>
          <label className="label">Bedrooms</label>
          <input
            type="number"
            min={0}
            className="input"
            name="bedrooms"
            defaultValue={villa?.bedrooms ?? 1}
          />
        </div>
        <div>
          <label className="label">Bathrooms</label>
          <input
            type="number"
            min={0}
            className="input"
            name="bathrooms"
            defaultValue={villa?.bathrooms ?? 1}
          />
        </div>
        <div>
          <label className="label">Size (m²)</label>
          <input
            type="number"
            min={0}
            className="input"
            name="size_sqm"
            defaultValue={villa?.size_sqm ?? ""}
          />
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        <div>
          <label className="label">Price from (€)</label>
          <input
            type="number"
            min={0}
            className="input"
            name="price_from"
            defaultValue={villa?.price_from ?? ""}
          />
        </div>
        <div>
          <label className="label">Booking.com URL</label>
          <input
            className="input"
            name="booking_url"
            defaultValue={villa?.booking_url || ""}
            placeholder="https://www.booking.com/..."
          />
        </div>
        <div>
          <label className="label">Airbnb URL</label>
          <input
            className="input"
            name="airbnb_url"
            defaultValue={villa?.airbnb_url || ""}
            placeholder="https://www.airbnb.com/..."
          />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label className="label mb-0">Hero image URL</label>
          <Link
            href="/admin/media"
            target="_blank"
            className="inline-flex items-center gap-1 text-[11px] text-ink-500 hover:text-ink-900"
          >
            Pick from media library
            <ExternalLink className="h-3 w-3" />
          </Link>
        </div>
        <input
          className="input mt-1.5"
          name="hero_image"
          defaultValue={villa?.hero_image || ""}
          placeholder="https://..."
        />
        <p className="mt-1 text-xs text-ink-400">
          Used as the cover image. You can also upload gallery images below
          after saving.
        </p>
      </div>

      <div>
        <label className="label">Amenities</label>
        <textarea
          className="input resize-y"
          name="amenities"
          rows={3}
          defaultValue={(villa?.amenities || []).join(", ")}
          placeholder="Pool, Wi-Fi, Air conditioning, Sea view ..."
        />
        <p className="mt-1 text-xs text-ink-400">
          Comma or newline separated. Icons are auto-matched.
        </p>
      </div>

      <div className="flex flex-wrap gap-6">
        <label className="inline-flex items-center gap-3 text-sm text-ink-700">
          <input
            type="checkbox"
            name="featured"
            defaultChecked={villa?.featured ?? false}
            className="h-4 w-4 rounded border-ink-300 text-ink-900"
          />
          Featured on homepage
        </label>
        <label className="inline-flex items-center gap-3 text-sm text-ink-700">
          <input
            type="checkbox"
            name="is_available"
            defaultChecked={villa?.is_available ?? true}
            className="h-4 w-4 rounded border-ink-300 text-ink-900"
          />
          Visible on website
        </label>
      </div>

      <div className="pt-2">
        <Submit label={submitLabel} />
      </div>
    </form>
  );
}
