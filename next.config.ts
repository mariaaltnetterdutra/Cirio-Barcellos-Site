import type { NextConfig } from "next";

// Endereços usados no protótipo e em anúncios antigos. Na V1 a landing de consórcio é a raiz.
const LEGACY_LANDING_PATHS = ["/consorcio", "/consorcio-imobiliario"] as const;

const nextConfig: NextConfig = {
  cacheComponents: true,
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
