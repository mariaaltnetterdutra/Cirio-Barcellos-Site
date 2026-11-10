import { postJson } from "@/core/api/httpClient";
import { env } from "@/core/config/env";
import type { ValidLeadForm } from "../validation/validateLeadForm";
import type { CreateLeadRequestDto, CreateLeadResponseDto } from "./lead.dto";

const LEADS_PATH = "/leads";
const MOCK_DELAY_MS = 800;
// Mesmo alfabeto da API: sem 0, 1, I e O, que se confundem quando o protocolo é lido em voz alta.
const PROTOCOL_ALPHABET = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";
const PROTOCOL_SUFFIX_LENGTH = 5;

export function buildCreateLeadRequest(form: ValidLeadForm): CreateLeadRequestDto {
  return {
    nome: form.name,
    whatsapp: form.whatsapp,
    objetivo: form.goal,
    valorCredito: form.creditValue,
    prazoMeses: form.termMonths,
    consentimento: true,
    origem: { pagina: window.location.pathname },
    website: form.website || undefined,
  };
}

function parseCreateLeadResponse(data: unknown): CreateLeadResponseDto {
  if (
    typeof data === "object" &&
    data !== null &&
    "protocolo" in data &&
    typeof data.protocolo === "string" &&
    "criadoEm" in data &&
    typeof data.criadoEm === "string"
  ) {
    return { protocolo: data.protocolo, criadoEm: data.criadoEm };
  }
  throw new Error("Resposta sem protocolo.");
}

function buildMockProtocol(): string {
  const suffix = Array.from(
    { length: PROTOCOL_SUFFIX_LENGTH },
    () => PROTOCOL_ALPHABET[Math.floor(Math.random() * PROTOCOL_ALPHABET.length)],
  ).join("");
  return `CB-${new Date().getFullYear()}-${suffix}`;
}

async function createMockLead(): Promise<CreateLeadResponseDto> {
  await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY_MS));
  return { protocolo: buildMockProtocol(), criadoEm: new Date().toISOString() };
}

/** Com NEXT_PUBLIC_USE_MOCKS ligado (só fora de produção), simula o envio sem precisar da API. */
export function createLead(request: CreateLeadRequestDto): Promise<CreateLeadResponseDto> {
  if (env.useMocks) return createMockLead();
  return postJson(LEADS_PATH, request, parseCreateLeadResponse);
}
