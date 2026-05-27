import "server-only";
import { createClient } from "@supabase/supabase-js";
import { getSupabasePublicEnv } from "./env";

/**
 * Detects the most common .env mistake: pasting the publishable / anon key
 * (safe for the browser) into the SUPABASE_SERVICE_ROLE_KEY slot. The two
 * keys look similar in dashboards but only the service-role key can write
 * past Row Level Security and Storage bucket policies.
 */
function looksLikePublishableKey(key: string): boolean {
  return (
    key.startsWith("sb_publishable_") ||
    key.startsWith("sbp_") ||
    key.startsWith("eyJ_publishable_")
  );
}

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

  if (key === env.anonKey || looksLikePublishableKey(key)) {
    throw new Error(
      "SUPABASE_SERVICE_ROLE_KEY is set to the publishable / anon key. " +
        "Open Supabase → Project Settings → API → API keys, copy the " +
        "`service_role` secret (starts with `sb_secret_` or a long `eyJ…` JWT) " +
        "into .env.local, and restart the dev server. Uploads and admin " +
        "writes need this key to bypass Row Level Security."
    );
  }

  return createClient(env.url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
