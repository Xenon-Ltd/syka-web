import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/business/merchant/registration",
    },
    sitemap: "https://www.sykabank.com/sitemap.xml",
  };
}
