// Valores aceitos nas perguntas de marcar. Mantenha igual a src/features/consortium/options.ts (site).
// Os textos legíveis ficam aqui para o email da equipe (T32) não mostrar "300a500".

export const GOAL_LABELS = {
  imovel: "Comprar um imóvel",
  terreno: "Comprar um terreno",
  construir: "Construir",
  reformar: "Reformar",
  investir: "Investir e ampliar patrimônio",
  outro: "Outro",
} as const;

export const BUDGET_LABELS = {
  ate100: "Até R$ 100 mil",
  "100a300": "R$ 100 mil a R$ 300 mil",
  "300a500": "R$ 300 mil a R$ 500 mil",
  "500a1m": "R$ 500 mil a R$ 1 milhão",
  "1m": "Acima de R$ 1 milhão",
} as const;

export const TIMEFRAME_LABELS = {
  "1ano": "Em até 1 ano",
  "1a3": "De 1 a 3 anos",
  "3a5": "De 3 a 5 anos",
  avaliando: "Ainda estou avaliando",
} as const;

export type ConsortiumGoal = keyof typeof GOAL_LABELS;
export type BudgetRange = keyof typeof BUDGET_LABELS;
export type Timeframe = keyof typeof TIMEFRAME_LABELS;

export const GOALS = Object.keys(GOAL_LABELS) as ConsortiumGoal[];
export const BUDGETS = Object.keys(BUDGET_LABELS) as BudgetRange[];
export const TIMEFRAMES = Object.keys(TIMEFRAME_LABELS) as Timeframe[];

/** Andamento do atendimento (usado no painel da V3). */
export const LEAD_STATUSES = ["NOVO", "EM_ATENDIMENTO", "PROPOSTA", "FECHADO", "PERDIDO"] as const;
export type LeadStatus = (typeof LEAD_STATUSES)[number];

/** Quem atende os pedidos de consórcio. */
export const DEFAULT_RESPONSIBLE = "Priscila";
