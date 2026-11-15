import type { ConsortiumGoal } from "@/features/consortium/types";

export const LEAD_STATUSES = ["NOVO", "EM_ATENDIMENTO", "PROPOSTA", "FECHADO", "PERDIDO"] as const;
export type LeadStatus = (typeof LEAD_STATUSES)[number];

export interface LeadOrigin {
  pagina?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
  gclid?: string;
  referrer?: string;
}

export interface AdminLead {
  protocolo: string;
  nome: string;
  whatsapp: string;
  objetivo: ConsortiumGoal;
  valorCredito?: number;
  prazoMeses?: number;
  origem: LeadOrigin;
  status: LeadStatus;
  responsavel: string;
  criadoEm: string;
}

export type StatusSummary = Record<LeadStatus, number>;

export interface LeadsPage {
  itens: AdminLead[];
  total: number;
  pagina: number;
  limite: number;
  totalPaginas: number;
  resumo: StatusSummary;
}

export interface LeadsQuery {
  busca: string;
  status?: LeadStatus;
  objetivo?: ConsortiumGoal;
  pagina: number;
}
