import type { CreateLeadDto } from "./dto/create-lead.dto";
import type { LeadsRepository, NewLead } from "./leads.repository";
import { LeadsService } from "./leads.service";
import { PROTOCOL_PATTERN } from "./protocol";
import type { Lead } from "./schemas/lead.schema";

const VALID_DTO: CreateLeadDto = {
  nome: "Maria Teste",
  whatsapp: "51999998888",
  objetivo: "imovel",
  valor: "300a500",
  prazo: "1a3",
  consentimento: true,
  origem: { pagina: "/", utmSource: "google", gclid: "teste" },
};

function savedLead(data: NewLead): Lead {
  const now = new Date("2026-10-29T12:00:00Z");
  return { ...data, status: "NOVO", responsavel: "Priscila", emailEnviado: false, criadoEm: now, atualizadoEm: now };
}

function makeService(create: jest.Mock) {
  const repository = { create } as unknown as LeadsRepository; // dublê só com o método usado
  return new LeadsService(repository);
}

describe("LeadsService", () => {
  it("salva o pedido e devolve o protocolo", async () => {
    const create = jest.fn(async (data: NewLead) => savedLead(data));
    const result = await makeService(create).create(VALID_DTO);

    expect(create).toHaveBeenCalledTimes(1);
    expect(result.protocolo).toMatch(PROTOCOL_PATTERN);
    expect(create.mock.calls[0]?.[0]).toMatchObject({ nome: "Maria Teste", origem: { gclid: "teste" } });
  });

  it("não salva quando o campo anti-robô vem preenchido", async () => {
    const create = jest.fn();
    const result = await makeService(create).create({ ...VALID_DTO, website: "http://spam" });

    expect(create).not.toHaveBeenCalled();
    expect(result.protocolo).toMatch(PROTOCOL_PATTERN);
  });

  it("tenta outro protocolo quando o sorteado já existe", async () => {
    const duplicate = Object.assign(new Error("duplicate"), { code: 11000 });
    const create = jest
      .fn()
      .mockRejectedValueOnce(duplicate)
      .mockImplementation(async (data: NewLead) => savedLead(data));

    await makeService(create).create(VALID_DTO);
    expect(create).toHaveBeenCalledTimes(2);
  });
});
