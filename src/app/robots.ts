import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Signed-in and sign-in pages; each also sets noindex.
      disallow: ["/account", "/admin", "/api/", "/auth/", "/details", "/login"],
    },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
