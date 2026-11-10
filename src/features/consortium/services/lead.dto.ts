import type { ConsortiumGoal } from "../types";

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
  /** Em reais; ausente quando a pessoa ainda não sabe. */
  valorCredito?: number;
  /** Em meses; ausente quando a pessoa quer ajuda para escolher. */
  prazoMeses?: number;
  consentimento: true;
  origem?: LeadOriginDto;
  /** Campo escondido anti-robô: pessoas deixam vazio. */
  website?: string;
}

export interface CreateLeadResponseDto {
  protocolo: string;
  criadoEm: string;
}
