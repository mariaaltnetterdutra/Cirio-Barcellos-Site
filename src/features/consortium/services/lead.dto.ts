import type { ConsortiumGoal } from "../types";

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
  whatsapp: string;
  objetivo: ConsortiumGoal;
  valorCredito?: number;
  prazoMeses?: number;
  consentimento: true;
  origem?: LeadOriginDto;
  website?: string;
}

export interface CreateLeadResponseDto {
  protocolo: string;
  criadoEm: string;
}
