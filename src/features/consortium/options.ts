// Opções do card de simulação. O backend valida os mesmos objetivos (api/src/leads/leads.constants.ts).
import type { IconName } from "@/shared/components/ui/Icon/Icon";

export const GOAL_OPTIONS = [
  { value: "imovel", label: "Imóvel", icon: "patrimonio" },
  { value: "terreno", label: "Terreno", icon: "map" },
  { value: "construir", label: "Construção", icon: "build" },
  { value: "reformar", label: "Reforma", icon: "tool" },
] as const satisfies readonly { value: string; label: string; icon: IconName }[];

/** Valores de crédito sugeridos, em reais. */
export const CREDIT_VALUES = [100_000, 150_000, 200_000, 300_000, 400_000, 500_000, 600_000, 800_000, 1_000_000] as const;

export const CUSTOM_CREDIT = "outro";
export const UNKNOWN_CREDIT = "nao-sei";
export const UNKNOWN_TERM = "ajuda";

export const CREDIT_LIMITS = { min: 50_000, max: 10_000_000 } as const;

// TODO: confirmar com o cliente quais prazos (em meses) existem nos grupos de consórcio imobiliário.
export const TERM_MONTHS = [100, 120, 150, 180, 200] as const;
