export type GeneratedChapter = {
  index: number;
  name: string;
  bodyMarkdown: string;
};

export type GeneratedBook = {
  title: string;
  subtitle: string;
  dedication?: string;
  chapters: GeneratedChapter[];
  closing?: string;
};

export type GenerateInput = {
  toLabel: string;
  childName?: string;
  answers: Record<string, string>;
  mode?: "self" | "other";
  style?: "simple" | "rich";
  introData?: {
    historicalEvents?: string[];
    [key: string]: unknown;
  };
};
