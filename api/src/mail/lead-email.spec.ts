import type { Lead } from "../leads/schemas/lead.schema";
import { buildLeadEmail, buildWhatsAppLink, formatWhatsApp } from "./lead-email";

const BASE_LEAD: Lead = {
  protocolo: "CB-2026-7K4QZ",
  nome: "Maria da Silva",
  whatsapp: "51999998888",
  objetivo: "imovel",
  valorCredito: 300_000,
  prazoMeses: 180,
  origem: {},
  consentimentoEm: new Date("2026-10-29T12:00:00Z"),
  status: "NOVO",
  responsavel: "Priscila",
  emailEnviado: false,
  criadoEm: new Date("2026-10-29T12:00:00Z"),
  atualizadoEm: new Date("2026-10-29T12:00:00Z"),
};

describe("formatWhatsApp", () => {
  it("formata celular com 11 dígitos", () => {
    expect(formatWhatsApp("51999998888")).toBe("(51) 9 9999-8888");
  });

  it("formata telefone com 10 dígitos", () => {
    expect(formatWhatsApp("5133334444")).toBe("(51) 3333-4444");
  });
});

describe("buildWhatsAppLink", () => {
  it("abre a conversa com o cliente, com o DDI do Brasil e a mensagem pronta", () => {
    const link = buildWhatsAppLink(BASE_LEAD);
    expect(link.startsWith("https://wa.me/5551999998888?text=")).toBe(true);
    const message = decodeURIComponent(link.split("?text=")[1] ?? "");
    expect(message).toContain("Maria");
    expect(message).toContain("CB-2026-7K4QZ");
  });
});

describe("buildLeadEmail", () => {
  it("põe o protocolo, o objetivo e o valor no assunto, sem o nome do cliente", () => {
    const { subject } = buildLeadEmail(BASE_LEAD);
    expect(subject).toContain("CB-2026-7K4QZ");
    expect(subject).toContain("Imóvel");
    expect(subject).toContain("300.000");
    expect(subject).not.toContain("Maria");
  });

  it("lista as respostas e o link para chamar o cliente", () => {
    const { text } = buildLeadEmail(BASE_LEAD);
    expect(text).toContain("Nome: Maria da Silva");
    expect(text).toContain("WhatsApp: (51) 9 9999-8888");
    expect(text).toContain("Prazo: 180 meses");
    expect(text).toContain("https://wa.me/5551999998888");
  });

  it("explica quando o cliente ainda não sabe o valor nem o prazo", () => {
    const { subject, text } = buildLeadEmail({ ...BASE_LEAD, valorCredito: undefined, prazoMeses: undefined });
    expect(subject).toContain("ainda não sabe");
    expect(text).toContain("Prazo: quer ajuda para escolher");
  });

  it("mostra a origem do anúncio e avisa quando o acesso foi direto", () => {
    const withOrigin = buildLeadEmail({ ...BASE_LEAD, origem: { utmSource: "google", gclid: "abc123" } });
    expect(withOrigin.text).toContain("Fonte (utm_source): google");
    expect(withOrigin.text).toContain("Google Ads (gclid): abc123");

    const direct = buildLeadEmail(BASE_LEAD);
    expect(direct.text).toContain("acesso direto, sem campanha");
  });
});
