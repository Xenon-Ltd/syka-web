import type { MetadataRoute } from "next";

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
  ];
}
