export interface Env {
  apiUrl: string;
  siteUrl: string;
  useMocks: boolean;
}

const DEV_DEFAULTS: Pick<Env, "apiUrl" | "siteUrl"> = {
  apiUrl: "http://localhost:3001",
  siteUrl: "http://localhost:3000",
};

export const env: Env = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL || DEV_DEFAULTS.apiUrl,
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || DEV_DEFAULTS.siteUrl,
  useMocks:
    process.env.NODE_ENV !== "production" && process.env.NEXT_PUBLIC_USE_MOCKS !== "false",
};
