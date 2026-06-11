import {
  Document,
  Font,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import type { GeneratedBook } from "../ai/types";
import { parseChapterMarkdown } from "./parse";

// Pretendard via jsdelivr — same source as the web font, ensures consistent metrics.
Font.register({
  family: "Pretendard",
  fonts: [
    {
      src: "https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/packages/pretendard/dist/web/static/woff/Pretendard-Regular.woff",
      fontWeight: 400,
    },
    {
      src: "https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/packages/pretendard/dist/web/static/woff/Pretendard-SemiBold.woff",
      fontWeight: 600,
    },
    {
      src: "https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/packages/pretendard/dist/web/static/woff/Pretendard-Bold.woff",
      fontWeight: 700,
    },
  ],
});

const styles = StyleSheet.create({
  page: {
    paddingTop: 70,
    paddingBottom: 64,
    paddingHorizontal: 60,
    fontFamily: "Pretendard",
    fontSize: 11,
    lineHeight: 1.85,
    color: "#2C2826",
    backgroundColor: "#FFFFFF",
  },
  pageNumber: {
    position: "absolute",
    bottom: 32,
    left: 0,
    right: 0,
    textAlign: "center",
    fontSize: 9,
    color: "#8B847E",
  },

  cover: {
    paddingTop: 200,
    paddingBottom: 200,
    paddingHorizontal: 60,
    fontFamily: "Pretendard",
    backgroundColor: "#FFFFFF",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  coverLabel: {
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: 6,
    color: "#A67C5A",
    marginBottom: 60,
  },
  coverDivider: {
    width: 36,
    height: 1,
    backgroundColor: "#A67C5A",
    opacity: 0.4,
    marginVertical: 30,
  },
  coverTitle: {
    fontSize: 32,
    fontWeight: 600,
    color: "#2C2826",
    textAlign: "center",
    lineHeight: 1.3,
    marginBottom: 18,
  },
  coverSubtitle: {
    fontSize: 11,
    color: "#5C544F",
    textAlign: "center",
    lineHeight: 1.6,
  },

  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  dedicationText: {
    fontSize: 12,
    color: "#2C2826",
    textAlign: "center",
    lineHeight: 2.2,
    fontStyle: "italic",
    fontWeight: 400,
    paddingHorizontal: 40,
  },

  tocTitle: {
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: 6,
    color: "#A67C5A",
    textAlign: "center",
    marginBottom: 56,
  },
  tocRow: {
    flexDirection: "row",
    alignItems: "baseline",
    marginBottom: 10,
    paddingHorizontal: 24,
  },
  tocChapterNum: {
    fontSize: 11,
    fontWeight: 600,
    color: "#A67C5A",
    width: 50,
  },
  tocDots: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: "#E8DBC9",
    borderBottomStyle: "dotted",
    marginHorizontal: 8,
    transform: "translateY(-3px)",
  },
  tocChapterName: {
    fontSize: 11,
    color: "#2C2826",
  },

  chapterIntro: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  chapterIntroNum: {
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: 6,
    color: "#A67C5A",
    marginBottom: 30,
  },
  chapterIntroDivider: {
    width: 50,
    height: 1,
    backgroundColor: "#A67C5A",
    opacity: 0.4,
    marginBottom: 30,
  },
  chapterIntroName: {
    fontSize: 26,
    fontWeight: 600,
    color: "#2C2826",
    textAlign: "center",
  },

  chapterQuote: {
    fontSize: 11,
    color: "#A67C5A",
    fontStyle: "italic",
    textAlign: "center",
    marginBottom: 28,
    paddingHorizontal: 30,
    lineHeight: 1.7,
  },
  paragraph: {
    fontSize: 11,
    color: "#2C2826",
    marginBottom: 12,
    textAlign: "justify",
    lineHeight: 1.85,
  },

  closingText: {
    fontSize: 11,
    color: "#5C544F",
    textAlign: "center",
    lineHeight: 2.2,
    fontStyle: "italic",
    paddingHorizontal: 40,
  },
});

function CoverPage({ book }: { book: GeneratedBook }) {
  return (
    <Page size="A5" style={styles.cover}>
      <Text style={styles.coverLabel}>한 권</Text>
      <View style={styles.coverDivider} />
      <Text style={styles.coverTitle}>{book.title}</Text>
      <View style={styles.coverDivider} />
      <Text style={styles.coverSubtitle}>{book.subtitle}</Text>
    </Page>
  );
}

function DedicationPage({ text }: { text: string }) {
  return (
    <Page size="A5" style={styles.page}>
      <View style={styles.centered}>
        <Text style={styles.dedicationText}>{text}</Text>
      </View>
    </Page>
  );
}

function TableOfContentsPage({ book }: { book: GeneratedBook }) {
  return (
    <Page size="A5" style={styles.page}>
      <Text style={styles.tocTitle}>차례</Text>
      <View>
        {book.chapters.map((c) => (
          <View key={c.index} style={styles.tocRow}>
            <Text style={styles.tocChapterNum}>{c.index}장</Text>
            <View style={styles.tocDots} />
            <Text style={styles.tocChapterName}>{c.name}</Text>
          </View>
        ))}
      </View>
    </Page>
  );
}

function ChapterIntroPage({
  index,
  name,
}: {
  index: number;
  name: string;
}) {
  return (
    <Page size="A5" style={styles.page}>
      <View style={styles.chapterIntro}>
        <Text style={styles.chapterIntroNum}>{index}장</Text>
        <View style={styles.chapterIntroDivider} />
        <Text style={styles.chapterIntroName}>{name}</Text>
      </View>
    </Page>
  );
}

function ChapterBodyPage({
  pageNumber,
  quote,
  paragraphs,
}: {
  pageNumber: number;
  quote?: string;
  paragraphs: string[];
}) {
  return (
    <Page size="A5" style={styles.page}>
      {quote && <Text style={styles.chapterQuote}>“{quote}”</Text>}
      {paragraphs.map((p, i) => (
        <Text key={i} style={styles.paragraph}>
          {p}
        </Text>
      ))}
      <Text style={styles.pageNumber}>— {pageNumber} —</Text>
    </Page>
  );
}

function ClosingPage({ text }: { text: string }) {
  return (
    <Page size="A5" style={styles.page}>
      <View style={styles.centered}>
        <Text style={styles.closingText}>{text}</Text>
      </View>
    </Page>
  );
}

export function BookDocument({ book }: { book: GeneratedBook }) {
  let pageNumber = 1;
  return (
    <Document
      title={book.title}
      author="한권"
      subject={book.subtitle}
      creator="한권 (hankwon.com)"
    >
      <CoverPage book={book} />
      {book.dedication && <DedicationPage text={book.dedication} />}
      <TableOfContentsPage book={book} />
      {book.chapters.map((c) => {
        const parsed = parseChapterMarkdown(c.bodyMarkdown);
        const introPage = (
          <ChapterIntroPage key={`${c.index}-intro`} index={c.index} name={c.name} />
        );
        const bodyPage = (
          <ChapterBodyPage
            key={`${c.index}-body`}
            pageNumber={pageNumber++}
            quote={parsed.quote}
            paragraphs={parsed.paragraphs}
          />
        );
        return [introPage, bodyPage];
      })}
      {book.closing && <ClosingPage text={book.closing} />}
    </Document>
  );
}
