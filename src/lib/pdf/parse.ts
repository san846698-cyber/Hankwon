/**
 * Tiny markdown parser for the chapter bodies that Claude returns.
 *
 * We only support the limited subset the model is told to output:
 *   ## chapter heading
 *   > optional opening quote
 *   plain paragraphs separated by blank lines
 */
export type ParsedChapter = {
  title?: string;
  quote?: string;
  paragraphs: string[];
};

export function parseChapterMarkdown(markdown: string): ParsedChapter {
  const lines = markdown.split(/\r?\n/);
  let title: string | undefined;
  let quote: string | undefined;
  const paragraphs: string[] = [];
  let buffer: string[] = [];

  function flush() {
    if (buffer.length > 0) {
      paragraphs.push(buffer.join(" ").trim());
      buffer = [];
    }
  }

  for (const raw of lines) {
    const line = raw.trim();
    if (!line) {
      flush();
      continue;
    }
    if (line.startsWith("## ")) {
      flush();
      title = line.slice(3).trim();
      continue;
    }
    if (line.startsWith(">")) {
      flush();
      quote = line
        .replace(/^>+\s*/, "")
        .replace(/^["“”]|["“”]$/g, "")
        .trim();
      continue;
    }
    buffer.push(line);
  }
  flush();

  return { title, quote, paragraphs };
}
