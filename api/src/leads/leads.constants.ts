export const GOAL_LABELS = {
  imovel: "Imóvel",
  terreno: "Terreno",
  construir: "Construção",
  reformar: "Reforma",
} as const;

export const CREDIT_LIMITS = { min: 50_000, max: 10_000_000 } as const;
export const TERM_LIMITS = { min: 12, max: 240 } as const;

export type ConsortiumGoal = keyof typeof GOAL_LABELS;

export const GOALS = Object.keys(GOAL_LABELS) as ConsortiumGoal[];

export const LEAD_STATUSES = ["NOVO", "EM_ATENDIMENTO", "PROPOSTA", "FECHADO", "PERDIDO"] as const;
export type LeadStatus = (typeof LEAD_STATUSES)[number];

export const DEFAULT_RESPONSIBLE = "Priscila";
