import type { MetadataRoute } from "next";
import { MILESTONES } from "@/data/milestones";
import { FOR_PAGES } from "@/data/for-pages";
import { COMPARISONS } from "@/data/comparisons";

const BASE = "https://hankwon.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const core: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/sample`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/faq`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  const occasions: MetadataRoute.Sitemap = [
    { url: `${BASE}/occasions/parents-day`, lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    { url: `${BASE}/occasions/chuseok`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    ...MILESTONES.map((m) => ({
      url: `${BASE}/occasions/milestone/${m.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    })),
  ];

  const guides: MetadataRoute.Sitemap = [
    { url: `${BASE}/guides/questions-for-parents`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE}/guides/listening-to-parents`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/guides/memoir-writing`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
  ];

  const forPages: MetadataRoute.Sitemap = FOR_PAGES.map((p) => ({
    url: `${BASE}/for/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  const vsPages: MetadataRoute.Sitemap = COMPARISONS.map((c) => ({
    url: `${BASE}/vs/${c.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  return [...core, ...occasions, ...guides, ...forPages, ...vsPages];
}
