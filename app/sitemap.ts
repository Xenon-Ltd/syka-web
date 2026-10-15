import type { MetadataRoute } from "next";
import { SUPPORT_SEARCH_INDEX, SUPPORT_CATEGORIES } from "@/lib/support-content";
import { developerCanonical, developerPageMetadata, productCanonical, productPageMetadata } from "@/lib/page-metadata";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.sykabank.com";
  const lastModified = new Date();

  return [
    { url: baseUrl, lastModified, changeFrequency: "monthly", priority: 1 },
    {
      url: `${baseUrl}/business`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...[
      "privacy-policy",
      "terms-and-conditions",
      "cookies",
      "data-security",
    ].map((path) => ({
      url: `${baseUrl}/${path}`,
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
    ...[...Object.keys(productPageMetadata).map(productCanonical), ...Object.keys(developerPageMetadata).map(developerCanonical)].map((path) => ({
      url: `${baseUrl}${path}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...["/support", ...SUPPORT_CATEGORIES.map(({ slug }) => `/support/${slug}`), ...SUPPORT_SEARCH_INDEX.map(({ href }) => href)].map((path) => ({
      url: `${baseUrl}${path}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: path === "/support" ? 0.7 : 0.4,
    })),
  ];
}
