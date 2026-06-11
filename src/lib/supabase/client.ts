import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let cached: SupabaseClient | null = null;

/**
 * Browser-safe Supabase client (anon key).
 *
 * Use this for client-side reads/writes that go through RLS-allowed RPCs.
 * For privileged operations, use `getSupabaseServerClient()` from server.ts.
 */
export function getSupabaseClient(): SupabaseClient {
  if (cached) return cached;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) {
    throw new Error(
      "NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY must be set in .env.local",
    );
  }
  cached = createClient(url, anonKey, {
    auth: { persistSession: false },
  });
  return cached;
}
