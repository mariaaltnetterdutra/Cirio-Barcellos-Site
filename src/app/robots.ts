import type { MetadataRoute } from "next";
import { env } from "@/core/config/env";
import { ROUTES } from "@/shared/constants/routes";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: [ROUTES.confirmacao, ROUTES.painel] },
    sitemap: `${env.siteUrl}/sitemap.xml`,
  };
}
