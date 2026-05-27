"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { randomUUID } from "crypto";
import {
  checkAdminCredentials,
  clearAdminCookie,
  createAdminToken,
  isAdminFromCookies,
  setAdminCookie,
} from "@/lib/admin-auth";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { slugify } from "@/lib/utils";

function requireAdmin() {
  if (!isAdminFromCookies()) {
    throw new Error("Unauthorized");
  }
}

export async function loginAdmin(_state: unknown, formData: FormData) {
  const username = String(formData.get("username") || "");
  const password = String(formData.get("password") || "");
  if (!checkAdminCredentials(username, password)) {
    return { error: "Invalid credentials" };
  }
  setAdminCookie(createAdminToken(username));
  redirect("/admin");
}

export async function logoutAdmin() {
  clearAdminCookie();
  redirect("/admin/login");
}

function parseAmenities(raw: string): string[] {
  return raw
    .split(/[\n,]+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

export async function createVilla(formData: FormData) {
  requireAdmin();
  const supabase = createSupabaseAdminClient();
  const name = String(formData.get("name") || "").trim();
  if (!name) throw new Error("Name is required");

  const slug =
    String(formData.get("slug") || "").trim() || slugify(name);
  const description = String(formData.get("description") || "");
  const tagline = String(formData.get("tagline") || "") || null;
  const capacity = Number(formData.get("capacity") || 2);
  const bedrooms = Number(formData.get("bedrooms") || 1);
  const bathrooms = Number(formData.get("bathrooms") || 1);
  const size_sqm = formData.get("size_sqm")
    ? Number(formData.get("size_sqm"))
    : null;
  const price_from = formData.get("price_from")
    ? Number(formData.get("price_from"))
    : null;
  const booking_url = String(formData.get("booking_url") || "") || null;
  const airbnb_url = String(formData.get("airbnb_url") || "") || null;
  const hero_image = String(formData.get("hero_image") || "") || null;
  const amenities = parseAmenities(String(formData.get("amenities") || ""));
  const featured = formData.get("featured") === "on";
  const is_available = formData.get("is_available") !== null;

  const { data, error } = await supabase
    .from("villas")
    .insert({
      slug,
      name,
      description,
      tagline,
      capacity,
      bedrooms,
      bathrooms,
      size_sqm,
      price_from,
      booking_url,
      airbnb_url,
      hero_image,
      amenities,
      featured,
      is_available,
    })
    .select("id, slug")
    .single();
  if (error) throw new Error(error.message);

  revalidatePath("/");
  revalidatePath("/villas");
  revalidatePath("/admin/villas");
  redirect(`/admin/villas/${data.id}/edit`);
}

export async function updateVilla(id: string, formData: FormData) {
  requireAdmin();
  const supabase = createSupabaseAdminClient();
  const update = {
    name: String(formData.get("name") || ""),
    slug: String(formData.get("slug") || ""),
    description: String(formData.get("description") || ""),
    tagline: String(formData.get("tagline") || "") || null,
    capacity: Number(formData.get("capacity") || 2),
    bedrooms: Number(formData.get("bedrooms") || 1),
    bathrooms: Number(formData.get("bathrooms") || 1),
    size_sqm: formData.get("size_sqm")
      ? Number(formData.get("size_sqm"))
      : null,
    price_from: formData.get("price_from")
      ? Number(formData.get("price_from"))
      : null,
    booking_url: String(formData.get("booking_url") || "") || null,
    airbnb_url: String(formData.get("airbnb_url") || "") || null,
    hero_image: String(formData.get("hero_image") || "") || null,
    amenities: parseAmenities(String(formData.get("amenities") || "")),
    featured: formData.get("featured") === "on",
    is_available: formData.get("is_available") === "on",
  };
  const { error } = await supabase.from("villas").update(update).eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/");
  revalidatePath("/villas");
  revalidatePath(`/villas/${update.slug}`);
  revalidatePath("/admin/villas");
}

export async function deleteVilla(id: string) {
  requireAdmin();
  const supabase = createSupabaseAdminClient();
  const { error } = await supabase.from("villas").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/");
  revalidatePath("/villas");
  revalidatePath("/admin/villas");
  redirect("/admin/villas");
}

export async function addImageUrl(villaId: string, formData: FormData) {
  requireAdmin();
  const supabase = createSupabaseAdminClient();
  const image_url = String(formData.get("image_url") || "").trim();
  const alt = String(formData.get("alt") || "") || null;
  if (!image_url) return;
  const { error } = await supabase.from("villa_images").insert({
    villa_id: villaId,
    image_url,
    alt,
  });
  if (error) throw new Error(error.message);
  revalidatePath(`/admin/villas/${villaId}/edit`);
}

export async function uploadImageFile(villaId: string, formData: FormData) {
  requireAdmin();
  const supabase = createSupabaseAdminClient();
  const file = formData.get("file") as File | null;
  if (!file || file.size === 0) return;

  const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const path = `${villaId}/${randomUUID()}.${ext}`;
  const bytes = new Uint8Array(await file.arrayBuffer());

  const { error: upErr } = await supabase.storage
    .from("villa-images")
    .upload(path, bytes, {
      contentType: file.type || "image/jpeg",
      cacheControl: "31536000",
      upsert: false,
    });
  if (upErr) throw new Error(upErr.message);

  const { data: pub } = supabase.storage
    .from("villa-images")
    .getPublicUrl(path);

  const { error: dbErr } = await supabase.from("villa_images").insert({
    villa_id: villaId,
    image_url: pub.publicUrl,
    alt: file.name,
  });
  if (dbErr) throw new Error(dbErr.message);

  revalidatePath(`/admin/villas/${villaId}/edit`);
}

export async function deleteImage(imageId: string, villaId: string) {
  requireAdmin();
  const supabase = createSupabaseAdminClient();
  const { error } = await supabase
    .from("villa_images")
    .delete()
    .eq("id", imageId);
  if (error) throw new Error(error.message);
  revalidatePath(`/admin/villas/${villaId}/edit`);
}

export async function addUnavailableRange(villaId: string, formData: FormData) {
  requireAdmin();
  const supabase = createSupabaseAdminClient();
  const start_date = String(formData.get("start_date") || "");
  const end_date = String(formData.get("end_date") || "");
  const note = String(formData.get("note") || "") || null;
  if (!start_date || !end_date) return;
  const { error } = await supabase.from("villa_unavailable_dates").insert({
    villa_id: villaId,
    start_date,
    end_date,
    note,
  });
  if (error) throw new Error(error.message);
  revalidatePath(`/villas`);
  revalidatePath(`/admin/villas/${villaId}/edit`);
}

export async function deleteUnavailableRange(
  rangeId: string,
  villaId: string
) {
  requireAdmin();
  const supabase = createSupabaseAdminClient();
  const { error } = await supabase
    .from("villa_unavailable_dates")
    .delete()
    .eq("id", rangeId);
  if (error) throw new Error(error.message);
  revalidatePath(`/admin/villas/${villaId}/edit`);
}

// ============================================================
//  Site content (CMS)
// ============================================================

const VALID_CONTENT_KEYS = new Set([
  "home_hero",
  "home_about",
  "home_experiences",
  "home_cta",
]);

/**
 * Generic upsert for a site_content row. The form posts a single JSON blob
 * under the `value` field; we parse, validate it is a plain object, and
 * write it. The component-side fallback guarantees that any malformed or
 * partial row still degrades gracefully on the public site.
 */
export async function saveSiteContent(key: string, formData: FormData) {
  requireAdmin();
  if (!VALID_CONTENT_KEYS.has(key)) throw new Error("Unknown content key");

  const raw = String(formData.get("value") || "").trim();
  let parsed: unknown = {};
  if (raw) {
    try {
      parsed = JSON.parse(raw);
    } catch (e) {
      throw new Error(
        "Invalid JSON for content block: " + (e as Error).message
      );
    }
  }
  if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
    throw new Error("Content value must be a JSON object.");
  }

  const supabase = createSupabaseAdminClient();
  const { error } = await supabase
    .from("site_content")
    .upsert({ key, value: parsed }, { onConflict: "key" });
  if (error) throw new Error(error.message);

  revalidatePath("/");
  revalidatePath("/admin/content");
}

export async function resetSiteContent(key: string) {
  requireAdmin();
  if (!VALID_CONTENT_KEYS.has(key)) throw new Error("Unknown content key");
  const supabase = createSupabaseAdminClient();
  const { error } = await supabase
    .from("site_content")
    .delete()
    .eq("key", key);
  if (error) throw new Error(error.message);
  revalidatePath("/");
  revalidatePath("/admin/content");
}

// ============================================================
//  Media library
// ============================================================

function fileExt(name: string) {
  const dot = name.lastIndexOf(".");
  if (dot < 0) return "jpg";
  return name.slice(dot + 1).toLowerCase().replace(/[^a-z0-9]/g, "") || "jpg";
}

export async function uploadMediaFile(formData: FormData) {
  requireAdmin();
  const supabase = createSupabaseAdminClient();
  const file = formData.get("file") as File | null;
  const alt = String(formData.get("alt") || "") || null;
  if (!file || file.size === 0) return;

  const path = `media/${randomUUID()}.${fileExt(file.name)}`;
  const bytes = new Uint8Array(await file.arrayBuffer());

  const { error: upErr } = await supabase.storage
    .from("villa-images")
    .upload(path, bytes, {
      contentType: file.type || "image/jpeg",
      cacheControl: "31536000",
      upsert: false,
    });
  if (upErr) throw new Error(upErr.message);

  const { data: pub } = supabase.storage
    .from("villa-images")
    .getPublicUrl(path);

  const { error: dbErr } = await supabase.from("media_library").insert({
    url: pub.publicUrl,
    alt: alt || file.name,
    kind: "image",
    storage_path: path,
  });
  if (dbErr) throw new Error(dbErr.message);

  revalidatePath("/admin/media");
}

export async function addMediaUrl(formData: FormData) {
  requireAdmin();
  const url = String(formData.get("url") || "").trim();
  const alt = String(formData.get("alt") || "") || null;
  if (!url) return;

  const supabase = createSupabaseAdminClient();
  const { error } = await supabase.from("media_library").insert({
    url,
    alt,
    kind: "image",
    storage_path: null,
  });
  if (error) throw new Error(error.message);

  revalidatePath("/admin/media");
}

export async function deleteMediaItem(id: string) {
  requireAdmin();
  const supabase = createSupabaseAdminClient();

  // Find storage_path so we can also clean up the bucket for uploaded files.
  const { data: row } = await supabase
    .from("media_library")
    .select("storage_path")
    .eq("id", id)
    .maybeSingle();

  const { error } = await supabase.from("media_library").delete().eq("id", id);
  if (error) throw new Error(error.message);

  if (row?.storage_path) {
    await supabase.storage.from("villa-images").remove([row.storage_path]);
  }

  revalidatePath("/admin/media");
}
