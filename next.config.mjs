const LEGACY_LANDING_PATHS = ["/consorcio", "/consorcio-imobiliario"];

/** @type {import("next").NextConfig} */
const nextConfig = {
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
