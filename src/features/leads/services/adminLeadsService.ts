import { getJson, patchJson } from "@/core/api/httpClient";
import { PAGE_SIZE } from "../content";
import type { AdminLead, LeadStatus, LeadsPage, LeadsQuery } from "../types";
import { parseLead, parseLeadsPage } from "./parseLeadsPage";

const LEADS_PATH = "/admin/leads";

function buildQueryString({ busca, status, objetivo, pagina }: LeadsQuery): string {
  const params = new URLSearchParams({ pagina: String(pagina), limite: String(PAGE_SIZE) });
  if (busca) params.set("busca", busca);
  if (status) params.set("status", status);
  if (objetivo) params.set("objetivo", objetivo);
  return params.toString();
}

export function fetchLeads(query: LeadsQuery, token: string): Promise<LeadsPage> {
  return getJson(`${LEADS_PATH}?${buildQueryString(query)}`, parseLeadsPage, token);
}

export function updateLeadStatus(protocol: string, status: LeadStatus, token: string): Promise<AdminLead> {
  return patchJson(`${LEADS_PATH}/${encodeURIComponent(protocol)}`, { status }, parseLead, token);
}
