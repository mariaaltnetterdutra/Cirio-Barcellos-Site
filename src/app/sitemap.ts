import type { MetadataRoute } from "next";
import { env } from "@/core/config/env";
import { ROUTES } from "@/shared/constants/routes";

const INDEXED_ROUTES = [ROUTES.home, ROUTES.privacidade] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return INDEXED_ROUTES.map((route) => ({ url: `${env.siteUrl}${route === ROUTES.home ? "" : route}` }));
}
