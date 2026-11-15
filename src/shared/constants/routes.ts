export const ROUTES = {
  home: "/",
  confirmacao: "/confirmacao",
  privacidade: "/politica-de-privacidade",
  painel: "/painel",
} as const;

export const SECTION_IDS = {
  objetivos: "objetivos",
  planos: "planos",
  comoFunciona: "como-funciona",
  portoBank: "porto-bank",
  especialista: "especialista",
  analise: "analise",
  duvidas: "duvidas",
  contato: "contato",
} as const;

export type SectionId = (typeof SECTION_IDS)[keyof typeof SECTION_IDS];

export type SectionHref = `#${SectionId}`;

export function sectionHref(id: SectionId): SectionHref {
  return `#${id}`;
}

export interface NavItem {
  label: string;
  sectionId: SectionId;
}

export const SITE_NAV: readonly NavItem[] = [
  { label: "Objetivos", sectionId: SECTION_IDS.objetivos },
  { label: "Planos", sectionId: SECTION_IDS.planos },
  { label: "Como funciona", sectionId: SECTION_IDS.comoFunciona },
  { label: "Dúvidas", sectionId: SECTION_IDS.duvidas },
  { label: "Contato", sectionId: SECTION_IDS.contato },
];
