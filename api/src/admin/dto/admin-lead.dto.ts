import type { ConsortiumGoal, LeadStatus } from "../../leads/leads.constants";
import type { Lead, LeadOrigin } from "../../leads/schemas/lead.schema";

export interface AdminLeadDto {
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

export interface AdminLeadsPageDto {
  itens: AdminLeadDto[];
  total: number;
  pagina: number;
  limite: number;
  totalPaginas: number;
  resumo: StatusSummary;
}

export function toAdminLeadDto(lead: Lead): AdminLeadDto {
  return {
    protocolo: lead.protocolo,
    nome: lead.nome,
    whatsapp: lead.whatsapp,
    objetivo: lead.objetivo,
    valorCredito: lead.valorCredito,
    prazoMeses: lead.prazoMeses,
    origem: lead.origem,
    status: lead.status,
    responsavel: lead.responsavel,
    criadoEm: lead.criadoEm.toISOString(),
  };
}
