// Excludes 0/O/1/l/I to avoid carbon-paper confusion when shared in chat.
const ALPHABET = "abcdefghjkmnpqrstuvwxyz23456789";

/**
 * Short URL-safe slug for response sharing (default 8 chars → ~10^12 space).
 * Uses crypto.getRandomValues for entropy.
 */
export function generateSlug(length = 8): string {
  const bytes = new Uint8Array(length);
  if (typeof crypto !== "undefined" && crypto.getRandomValues) {
    crypto.getRandomValues(bytes);
  } else {
    for (let i = 0; i < length; i++) bytes[i] = Math.floor(Math.random() * 256);
  }
  let result = "";
  for (let i = 0; i < length; i++) {
    result += ALPHABET[bytes[i] % ALPHABET.length];
  }
  return result;
}
