import "server-only";
import { createClient } from "@supabase/supabase-js";
import { getSupabasePublicEnv } from "./env";

/**
 * Server-only Supabase client using the service role key.
 * BYPASSES Row Level Security. Use ONLY inside protected admin
 * server actions / route handlers — never expose to the browser.
 */
export function createSupabaseAdminClient() {
  const env = getSupabasePublicEnv();
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  if (!env || !key) {
    throw new Error(
      "Missing Supabase admin env: set NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, and SUPABASE_SERVICE_ROLE_KEY in Vercel / .env.local."
    );
  }
  return createClient(env.url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
