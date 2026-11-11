import { GOAL_LABELS } from "../leads/leads.constants";
import type { Lead } from "../leads/schemas/lead.schema";

// Texto do aviso interno para a equipe. Não é enviado ao cliente: o contato com ele é sempre humano.
const COUNTRY_CODE = "55";
const TIME_ZONE = "America/Sao_Paulo";

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  maximumFractionDigits: 0,
});
const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
  dateStyle: "short",
  timeStyle: "short",
  timeZone: TIME_ZONE,
});

export interface LeadEmail {
  subject: string;
  text: string;
}

/** (51) 9 9999-8888 para 11 dígitos e (51) 9999-8888 para 10. */
export function formatWhatsApp(digits: string): string {
  const area = digits.slice(0, 2);
  const rest = digits.slice(2);
  const splitAt = rest.length - 4;
  const prefix = rest.length === 9 ? `${rest.slice(0, 1)} ${rest.slice(1, splitAt)}` : rest.slice(0, splitAt);
  return `(${area}) ${prefix}-${rest.slice(splitAt)}`;
}

function creditLabel(lead: Lead): string {
  return lead.valorCredito ? currencyFormatter.format(lead.valorCredito) : "ainda não sabe";
}

function termLabel(lead: Lead): string {
  return lead.prazoMeses ? `${lead.prazoMeses} meses` : "quer ajuda para escolher";
}

function firstName(name: string): string {
  return name.trim().split(/\s+/)[0] ?? name;
}

export function buildWhatsAppLink(lead: Lead): string {
  const message = `Olá, ${firstName(lead.nome)}! Aqui é da Círio & Barcellos. Recebi seu pedido de simulação (protocolo ${lead.protocolo}). Podemos conversar?`;
  return `https://wa.me/${COUNTRY_CODE}${lead.whatsapp}?text=${encodeURIComponent(message)}`;
}

function originLines(lead: Lead): string[] {
  const origin = lead.origem;
  const entries: [string, string | undefined][] = [
    ["Página", origin.pagina],
    ["Fonte (utm_source)", origin.utmSource],
    ["Meio (utm_medium)", origin.utmMedium],
    ["Campanha (utm_campaign)", origin.utmCampaign],
    ["Termo (utm_term)", origin.utmTerm],
    ["Conteúdo (utm_content)", origin.utmContent],
    ["Google Ads (gclid)", origin.gclid],
    ["Veio de", origin.referrer],
  ];
  return entries.filter(([, value]) => Boolean(value)).map(([label, value]) => `${label}: ${value}`);
}

export function buildLeadEmail(lead: Lead): LeadEmail {
  const goal = GOAL_LABELS[lead.objetivo];
  const subject = `Novo pedido ${lead.protocolo}: ${goal}, ${creditLabel(lead)}`;

  const lines = [
    `Novo pedido de simulação, protocolo ${lead.protocolo}`,
    "",
    `Nome: ${lead.nome}`,
    `WhatsApp: ${formatWhatsApp(lead.whatsapp)}`,
    `Chamar agora: ${buildWhatsAppLink(lead)}`,
    "",
    `Objetivo: ${goal}`,
    `Valor do crédito: ${creditLabel(lead)}`,
    `Prazo: ${termLabel(lead)}`,
    `Recebido em: ${dateFormatter.format(lead.criadoEm)}`,
    "",
    "Origem do pedido:",
    ...(originLines(lead).length > 0 ? originLines(lead) : ["acesso direto, sem campanha"]),
  ];

  return { subject, text: lines.join("\n") };
}
