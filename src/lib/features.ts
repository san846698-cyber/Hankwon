/**
 * Feature flags driven by environment variables.
 *
 * NEXT_PUBLIC_* values are visible to the client; non-public ones are server-only.
 * Each flag is a function so it re-reads at runtime in dev.
 */
export const features = {
  hasSupabase: () =>
    Boolean(
      process.env.NEXT_PUBLIC_SUPABASE_URL &&
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    ),
  hasAnthropic: () => Boolean(process.env.ANTHROPIC_API_KEY),
  hasLemonsqueezy: () =>
    Boolean(
      process.env.LEMONSQUEEZY_API_KEY &&
        process.env.LEMONSQUEEZY_STORE_ID &&
        process.env.LEMONSQUEEZY_VARIANT_ID,
    ),
  hasKakao: () => Boolean(process.env.NEXT_PUBLIC_KAKAO_APP_KEY),
  hasResend: () => Boolean(process.env.RESEND_API_KEY),
} as const;
