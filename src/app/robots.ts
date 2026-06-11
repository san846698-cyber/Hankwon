import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/sample", "/about", "/faq", "/terms", "/privacy"],
        disallow: ["/q/", "/done", "/buy", "/book/", "/thanks"],
      },
    ],
    sitemap: "https://hankwon.com/sitemap.xml",
  };
}
