import type { FilterQuery } from "mongoose";
import type { ConsortiumGoal, LeadStatus } from "./leads.constants";
import type { Lead } from "./schemas/lead.schema";

export interface LeadSearch {
  busca?: string;
  objetivo?: ConsortiumGoal;
}

export interface LeadFilters extends LeadSearch {
  status?: LeadStatus;
}

const MIN_PHONE_DIGITS = 3;
const PHONE_LIKE = /^[\d\s()+-]+$/;

function escapeRegex(text: string): RegExp["source"] {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function searchClause(busca: string): FilterQuery<Lead> {
  const digits = busca.replace(/\D/g, "");
  const byProtocol = { protocolo: { $regex: escapeRegex(busca), $options: "i" } };

  if (PHONE_LIKE.test(busca) && digits.length >= MIN_PHONE_DIGITS) {
    return { $or: [{ whatsapp: { $regex: digits } }, byProtocol] };
  }
  return { $or: [{ nome: { $regex: escapeRegex(busca), $options: "i" } }, byProtocol] };
}

/** Busca e objetivo, sem o status: é a base para contar quantos pedidos há em cada status. */
export function buildSearchFilter({ busca, objetivo }: LeadSearch): FilterQuery<Lead> {
  return {
    ...(busca ? searchClause(busca) : {}),
    ...(objetivo ? { objetivo } : {}),
  };
}

export function buildLeadFilter({ status, ...search }: LeadFilters): FilterQuery<Lead> {
  return { ...buildSearchFilter(search), ...(status ? { status } : {}) };
}
