import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { createSupabaseServerClient } from "./server";
import { getSupabasePublicEnv } from "./env";
import type { Villa, VillaImage, VillaWithImages, UnavailableDate } from "@/types";

/**
 * Cookie-less client for public reads (generateStaticParams, ISR).
 * Returns null when env vars are missing (e.g. Vercel build before env is set).
 */
function publicClient(): SupabaseClient | null {
  const env = getSupabasePublicEnv();
  if (!env) return null;
  return createClient(env.url, env.anonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export async function getAllVillas(): Promise<VillaWithImages[]> {
  const supabase = publicClient();
  if (!supabase) return [];

  const { data: villas, error } = await supabase
    .from("villas")
    .select("*")
    .order("featured", { ascending: false })
    .order("created_at", { ascending: true });

  if (error || !villas) return [];

  const ids = villas.map((v) => v.id);
  if (ids.length === 0) {
    return (villas as Villa[]).map((v) => ({ ...v, images: [] }));
  }

  const { data: images } = await supabase
    .from("villa_images")
    .select("*")
    .in("villa_id", ids)
    .order("position", { ascending: true });

  return (villas as Villa[]).map((v) => ({
    ...v,
    images: ((images as VillaImage[]) || []).filter((i) => i.villa_id === v.id),
  }));
}

export async function getFeaturedVillas(limit = 3): Promise<VillaWithImages[]> {
  const all = await getAllVillas();
  return all.filter((v) => v.featured).slice(0, limit);
}

export async function getVillaBySlug(
  slug: string
): Promise<VillaWithImages | null> {
  const supabase = publicClient();
  if (!supabase) return null;

  const { data: villa, error } = await supabase
    .from("villas")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error || !villa) return null;

  const { data: images } = await supabase
    .from("villa_images")
    .select("*")
    .eq("villa_id", villa.id)
    .order("position", { ascending: true });

  return { ...(villa as Villa), images: (images as VillaImage[]) || [] };
}

export async function getVillaById(id: string): Promise<VillaWithImages | null> {
  const supabase = publicClient();
  if (!supabase) return null;

  const { data: villa } = await supabase
    .from("villas")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (!villa) return null;
  const { data: images } = await supabase
    .from("villa_images")
    .select("*")
    .eq("villa_id", id)
    .order("position", { ascending: true });
  return { ...(villa as Villa), images: (images as VillaImage[]) || [] };
}

export async function getUnavailableDates(
  villaId: string
): Promise<UnavailableDate[]> {
  const supabase = publicClient();
  if (!supabase) return [];

  const { data } = await supabase
    .from("villa_unavailable_dates")
    .select("*")
    .eq("villa_id", villaId)
    .gte("end_date", new Date().toISOString().slice(0, 10))
    .order("start_date", { ascending: true });
  return (data as UnavailableDate[]) || [];
}

export async function getUserFavoriteIds(): Promise<string[]> {
  if (!getSupabasePublicEnv()) return [];

  try {
    const supabase = createSupabaseServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return [];
    const { data } = await supabase
      .from("favorites")
      .select("villa_id")
      .eq("user_id", user.id);
    return (data || []).map((r: { villa_id: string }) => r.villa_id);
  } catch {
    // cookies() unavailable during static generation, or auth not configured
    return [];
  }
}
