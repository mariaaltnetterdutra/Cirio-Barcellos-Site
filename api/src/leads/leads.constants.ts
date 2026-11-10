// Valores aceitos no formulário. Mantenha os objetivos iguais a src/features/consortium/options.ts (site).
// Os textos legíveis ficam aqui para o email da equipe (T32).

export const GOAL_LABELS = {
  imovel: "Imóvel",
  terreno: "Terreno",
  construir: "Construção",
  reformar: "Reforma",
} as const;

// Limites aceitos para o valor do crédito (em reais) e para o prazo do plano (em meses).
export const CREDIT_LIMITS = { min: 50_000, max: 10_000_000 } as const;
export const TERM_LIMITS = { min: 12, max: 240 } as const;

export type ConsortiumGoal = keyof typeof GOAL_LABELS;

export const GOALS = Object.keys(GOAL_LABELS) as ConsortiumGoal[];

/** Andamento do atendimento (usado no painel da V3). */
export const LEAD_STATUSES = ["NOVO", "EM_ATENDIMENTO", "PROPOSTA", "FECHADO", "PERDIDO"] as const;
export type LeadStatus = (typeof LEAD_STATUSES)[number];

/** Quem atende os pedidos de consórcio. */
export const DEFAULT_RESPONSIBLE = "Priscila";
