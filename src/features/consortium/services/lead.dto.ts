import type { BudgetRange, ConsortiumGoal, Timeframe } from "../types";

// Mesmo formato que a API (api/src/leads/dto) espera e devolve.

export interface LeadOriginDto {
  pagina?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
  gclid?: string;
  referrer?: string;
}

export interface CreateLeadRequestDto {
  nome: string;
  /** Só os números, com DDD. */
  whatsapp: string;
  objetivo: ConsortiumGoal;
  objetivoOutro?: string;
  valor: BudgetRange;
  prazo: Timeframe;
  consentimento: true;
  origem?: LeadOriginDto;
  /** Campo escondido anti-robô: pessoas deixam vazio. */
  website?: string;
}

export interface CreateLeadResponseDto {
  protocolo: string;
  criadoEm: string;
}
