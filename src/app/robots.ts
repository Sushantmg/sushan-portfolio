import type { MetadataRoute } from "next";
import { SITE_URL, siteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: siteUrl("/sitemap.xml"),
    // The Host directive takes a bare hostname, not a URL.
    host: new URL(SITE_URL).host,
  };
}
