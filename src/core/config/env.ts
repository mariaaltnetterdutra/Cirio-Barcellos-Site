export interface Env {
  apiUrl: string;
  siteUrl: string;
}

const DEV_DEFAULTS: Env = {
  apiUrl: "http://localhost:3001",
  siteUrl: "http://localhost:3000",
};

// Cada variável precisa ser lida pelo nome completo: o Next só embute no bundle do navegador
// referências literais a process.env.NEXT_PUBLIC_*.
export const env: Env = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL || DEV_DEFAULTS.apiUrl,
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || DEV_DEFAULTS.siteUrl,
};
