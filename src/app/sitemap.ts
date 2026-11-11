import type { MetadataRoute } from "next";
import { env } from "@/core/config/env";
import { ROUTES } from "@/shared/constants/routes";

// A página de confirmação fica de fora de propósito: ela não deve aparecer no Google.
const INDEXED_ROUTES = [ROUTES.home, ROUTES.privacidade] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return INDEXED_ROUTES.map((route) => ({ url: `${env.siteUrl}${route === ROUTES.home ? "" : route}` }));
}
