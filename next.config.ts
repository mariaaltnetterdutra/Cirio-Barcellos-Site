import type { NextConfig } from "next";

const LEGACY_LANDING_PATHS = ["/consorcio", "/consorcio-imobiliario"] as const;

const nextConfig: NextConfig = {
  cacheComponents: true,
  devIndicators: false,
  partialPrefetching: true,
  async redirects() {
    return LEGACY_LANDING_PATHS.map((source) => ({
      source,
      destination: "/",
      permanent: true,
    }));
  },
};

export default nextConfig;
