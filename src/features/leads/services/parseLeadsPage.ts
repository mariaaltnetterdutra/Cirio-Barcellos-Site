import { GOAL_OPTIONS } from "@/features/consortium/options";
import type { ConsortiumGoal } from "@/features/consortium/types";
import {
  LEAD_STATUSES,
  type AdminLead,
  type LeadOrigin,
  type LeadStatus,
  type LeadsPage,
  type StatusSummary,
} from "../types";

type UnknownRecord = Record<string, unknown>;

function isRecord(value: unknown): value is UnknownRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isLeadStatus(value: unknown): value is LeadStatus {
  return LEAD_STATUSES.some((status) => status === value);
}

function isGoal(value: unknown): value is ConsortiumGoal {
  return GOAL_OPTIONS.some((goal) => goal.value === value);
}

function optionalString(record: UnknownRecord, key: string): string | undefined {
  const value = record[key];
  return typeof value === "string" ? value : undefined;
}

function optionalNumber(record: UnknownRecord, key: string): number | undefined {
  const value = record[key];
  return typeof value === "number" ? value : undefined;
}

function requiredNumber(record: UnknownRecord, key: string): number {
  const value = optionalNumber(record, key);
  if (value === undefined) throw new Error(`Campo ${key} ausente.`);
  return value;
}

function requiredString(record: UnknownRecord, key: string): string {
  const value = optionalString(record, key);
  if (value === undefined) throw new Error(`Campo ${key} ausente.`);
  return value;
}

function parseOrigin(value: unknown): LeadOrigin {
  if (!isRecord(value)) return {};
  return {
    pagina: optionalString(value, "pagina"),
    utmSource: optionalString(value, "utmSource"),
    utmMedium: optionalString(value, "utmMedium"),
    utmCampaign: optionalString(value, "utmCampaign"),
    utmTerm: optionalString(value, "utmTerm"),
    utmContent: optionalString(value, "utmContent"),
    gclid: optionalString(value, "gclid"),
    referrer: optionalString(value, "referrer"),
  };
}

export function parseLead(data: unknown): AdminLead {
  if (!isRecord(data) || !isGoal(data.objetivo) || !isLeadStatus(data.status)) {
    throw new Error("Pedido em formato inesperado.");
  }
  return {
    protocolo: requiredString(data, "protocolo"),
    nome: requiredString(data, "nome"),
    whatsapp: requiredString(data, "whatsapp"),
    objetivo: data.objetivo,
    valorCredito: optionalNumber(data, "valorCredito"),
    prazoMeses: optionalNumber(data, "prazoMeses"),
    origem: parseOrigin(data.origem),
    status: data.status,
    responsavel: requiredString(data, "responsavel"),
    criadoEm: requiredString(data, "criadoEm"),
  };
}

function parseSummary(value: unknown): StatusSummary {
  if (!isRecord(value)) throw new Error("Resumo em formato inesperado.");
  return {
    NOVO: requiredNumber(value, "NOVO"),
    EM_ATENDIMENTO: requiredNumber(value, "EM_ATENDIMENTO"),
    PROPOSTA: requiredNumber(value, "PROPOSTA"),
    FECHADO: requiredNumber(value, "FECHADO"),
    PERDIDO: requiredNumber(value, "PERDIDO"),
  };
}

export function parseLeadsPage(data: unknown): LeadsPage {
  if (!isRecord(data) || !Array.isArray(data.itens)) throw new Error("Lista em formato inesperado.");
  return {
    itens: data.itens.map(parseLead),
    total: requiredNumber(data, "total"),
    pagina: requiredNumber(data, "pagina"),
    limite: requiredNumber(data, "limite"),
    totalPaginas: requiredNumber(data, "totalPaginas"),
    resumo: parseSummary(data.resumo),
  };
}
