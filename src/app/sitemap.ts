import type { MetadataRoute } from "next";
import { getBlogSlugs } from "@/lib/content";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE_URL;
  return [
    { url: `${base}/`, lastModified: new Date() },
    { url: `${base}/blogs`, lastModified: new Date() },
    ...getBlogSlugs().map((slug) => ({
      url: `${base}/blogs/${slug}` as string,
      lastModified: new Date(),
    })),
  ];
}
