import "server-only";
import { renderToBuffer } from "@react-pdf/renderer";
import type { GeneratedBook } from "../ai/types";
import { BookDocument } from "./Book";

/**
 * Render a generated book to a PDF Buffer (server-side).
 * Designed to be called from API routes / webhook handlers.
 *
 * Note: Pretendard fonts are fetched from jsdelivr at render time.
 * In production with cold starts, pre-warm or self-host the fonts to remove
 * 200~400ms of cold-path latency.
 */
export async function renderBookToPdf(book: GeneratedBook): Promise<Buffer> {
  return renderToBuffer(<BookDocument book={book} />);
}
