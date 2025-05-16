import type { MetadataRoute } from "next";

import { env } from "@/constants/env";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/private/",
    },
    sitemap: `${env.CLIENT_URL}/sitemap.xml`,
  };
}
