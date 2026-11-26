import type { MailService } from "../mail/mail.service";
import type { CreateLeadDto } from "./dto/create-lead.dto";
import type { LeadsRepository, NewLead } from "./leads.repository";
import { LeadsService } from "./leads.service";
import { PROTOCOL_PATTERN } from "./protocol";
import type { Lead } from "./schemas/lead.schema";

const VALID_DTO: CreateLeadDto = {
  nome: "Maria Teste",
  whatsapp: "51999998888",
  objetivo: "imovel",
  valorCredito: 300_000,
  prazoMeses: 180,
  consentimento: true,
  origem: { pagina: "/", utmSource: "google", gclid: "teste" },
};

function savedLead(data: NewLead): Lead {
  const now = new Date("2026-10-29T12:00:00Z");
  return { ...data, status: "NOVO", responsavel: "Priscila", emailEnviado: false, criadoEm: now, atualizadoEm: now };
}

interface Mocks {
  create: jest.Mock;
  sendNewLead?: jest.Mock;
  markEmailSent?: jest.Mock;
}

function makeService({ create, sendNewLead = jest.fn().mockResolvedValue(false), markEmailSent = jest.fn() }: Mocks) {
  const repository = { create, markEmailSent } as unknown as LeadsRepository;
  const mail = { sendNewLead } as unknown as MailService;
  return new LeadsService(repository, mail);
}

const flushNotification = () => new Promise((resolve) => setImmediate(resolve));

describe("LeadsService", () => {
  it("salva o pedido e devolve o protocolo", async () => {
    const create = jest.fn(async (data: NewLead) => savedLead(data));
    const result = await makeService({ create }).create(VALID_DTO);

    expect(create).toHaveBeenCalledTimes(1);
    expect(result.protocolo).toMatch(PROTOCOL_PATTERN);
    expect(create.mock.calls[0]?.[0]).toMatchObject({ nome: "Maria Teste", origem: { gclid: "teste" } });
  });

  it("não salva quando o campo anti-robô vem preenchido", async () => {
    const create = jest.fn();
    const result = await makeService({ create }).create({ ...VALID_DTO, website: "http://spam" });

    expect(create).not.toHaveBeenCalled();
    expect(result.protocolo).toMatch(PROTOCOL_PATTERN);
  });

  it("tenta outro protocolo quando o sorteado já existe", async () => {
    const duplicate = Object.assign(new Error("duplicate"), { code: 11000 });
    const create = jest
      .fn()
      .mockRejectedValueOnce(duplicate)
      .mockImplementation(async (data: NewLead) => savedLead(data));

    await makeService({ create }).create(VALID_DTO);
    expect(create).toHaveBeenCalledTimes(2);
  });

  it("avisa a equipe e marca o email como enviado", async () => {
    const create = jest.fn(async (data: NewLead) => savedLead(data));
    const sendNewLead = jest.fn().mockResolvedValue(true);
    const markEmailSent = jest.fn();

    const result = await makeService({ create, sendNewLead, markEmailSent }).create(VALID_DTO);
    await flushNotification();

    expect(sendNewLead).toHaveBeenCalledTimes(1);
    expect(markEmailSent).toHaveBeenCalledWith(result.protocolo);
  });

  it("não perde o pedido quando o email falha", async () => {
    const create = jest.fn(async (data: NewLead) => savedLead(data));
    const sendNewLead = jest.fn().mockRejectedValue(new Error("SMTP fora do ar"));
    const markEmailSent = jest.fn();

    const result = await makeService({ create, sendNewLead, markEmailSent }).create(VALID_DTO);
    await flushNotification();

    expect(result.protocolo).toMatch(PROTOCOL_PATTERN);
    expect(markEmailSent).not.toHaveBeenCalled();
  });

  it("não avisa a equipe sobre envio de robô", async () => {
    const sendNewLead = jest.fn();
    await makeService({ create: jest.fn(), sendNewLead }).create({ ...VALID_DTO, website: "http://spam" });
    await flushNotification();

    expect(sendNewLead).not.toHaveBeenCalled();
  });
});
