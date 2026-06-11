import Script from "next/script";

/**
 * Analytics loader. Activates Plausible only when
 * NEXT_PUBLIC_PLAUSIBLE_DOMAIN is set in env.
 *
 * Without the env var this renders nothing — keeping the dev/local
 * pages clean of network requests until a real key is wired.
 */
export default function Analytics() {
  const domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  if (!domain) return null;

  return (
    <Script
      strategy="afterInteractive"
      defer
      data-domain={domain}
      src="https://plausible.io/js/script.js"
    />
  );
}
