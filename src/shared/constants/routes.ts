export const ROUTES = {
  home: "/",
  seguros: "/seguros",
  consorcio: "/consorcio",
  consorcioImobiliario: "/consorcio-imobiliario",
  imobiliaria: "/imobiliaria",
  simulador: "/simular",
  confirmacao: "/simular/confirmacao",
  privacidade: "/politica-de-privacidade",
  painelLogin: "/painel/login",
  painelLeads: "/painel/leads",
} as const;

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES];

/** Âncora do rodapé, que concentra os dados de contato. */
export const CONTACT_ANCHOR = "#contato";

export interface NavItem {
  label: string;
  href: AppRoute | typeof CONTACT_ANCHOR;
}

// Consórcio imobiliário fica fora do menu de propósito: é acessado a partir da página de consórcio.
export const SITE_NAV: readonly NavItem[] = [
  { label: "Sobre", href: ROUTES.home },
  { label: "Seguros", href: ROUTES.seguros },
  { label: "Consórcio", href: ROUTES.consorcio },
  { label: "Imobiliária", href: ROUTES.imobiliaria },
  { label: "Contato", href: CONTACT_ANCHOR },
];
