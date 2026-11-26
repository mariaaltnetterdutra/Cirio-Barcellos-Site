import { COMPANY_COUNTRY_CODE } from "@/shared/constants/company";
import { formatCreditValue } from "@/shared/utils/currency";
import { LEADS_CONTENT } from "../content";
import type { AdminLead } from "../types";

const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
  dateStyle: "short",
  timeStyle: "short",
  timeZone: "America/Sao_Paulo",
});

export function formatDateTime(iso: string): string {
  return dateFormatter.format(new Date(iso));
}

export function formatCredit(value: number | undefined): string {
  return value === undefined ? LEADS_CONTENT.item.undefinedValue : formatCreditValue(value);
}

export function formatTerm(months: number | undefined): string {
  return months === undefined ? LEADS_CONTENT.item.undefinedValue : LEADS_CONTENT.item.months(months);
}

export function firstName(fullName: string): string {
  return fullName.trim().split(/\s+/)[0] ?? fullName;
}

export function buildLeadWhatsAppUrl(lead: AdminLead): string {
  const message = LEADS_CONTENT.item.whatsappMessage(firstName(lead.nome), lead.protocolo);
  return `https://wa.me/${COMPANY_COUNTRY_CODE}${lead.whatsapp}?text=${encodeURIComponent(message)}`;
}
