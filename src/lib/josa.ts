export function josa(word: string, pair: "이가" | "은는" | "을를"): string {
  if (!word) return pair[0];
  const last = word.charCodeAt(word.length - 1);
  if (last < 0xac00 || last > 0xd7a3) return pair[0];
  const hasJong = (last - 0xac00) % 28 !== 0;
  return hasJong ? pair[0] : pair[1];
}
