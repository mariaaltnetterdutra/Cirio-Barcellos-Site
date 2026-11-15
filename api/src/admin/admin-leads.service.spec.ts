import { NotFoundException } from "@nestjs/common";
import type { LeadsRepository } from "../leads/leads.repository";
import type { Lead } from "../leads/schemas/lead.schema";
import { AdminLeadsService } from "./admin-leads.service";
import { ListLeadsQueryDto } from "./dto/list-leads-query.dto";

const LEAD: Lead = {
  protocolo: "CB-2026-ABCDE",
  nome: "Maria Teste",
  whatsapp: "51999998888",
  objetivo: "imovel",
  valorCredito: 300000,
  prazoMeses: 180,
  origem: { utmSource: "google" },
  consentimentoEm: new Date("2026-11-01T10:00:00Z"),
  status: "NOVO",
  responsavel: "Priscila",
  emailEnviado: false,
  criadoEm: new Date("2026-11-01T10:00:00Z"),
  atualizadoEm: new Date("2026-11-01T10:00:00Z"),
};

const SUMMARY = { NOVO: 1, EM_ATENDIMENTO: 0, PROPOSTA: 0, FECHADO: 0, PERDIDO: 0 };

function buildRepository(overrides: Partial<Record<keyof LeadsRepository, jest.Mock>> = {}) {
  return {
    findPage: jest.fn().mockResolvedValue([LEAD]),
    count: jest.fn().mockResolvedValue(45),
    countByStatus: jest.fn().mockResolvedValue(SUMMARY),
    updateStatus: jest.fn().mockResolvedValue({ ...LEAD, status: "PROPOSTA" }),
    ...overrides,
  };
}

function query(values: Partial<ListLeadsQueryDto> = {}): ListLeadsQueryDto {
  return Object.assign(new ListLeadsQueryDto(), values);
}

describe("AdminLeadsService", () => {
  it("monta a página com total, número de páginas e resumo por status", async () => {
    const repository = buildRepository();
    const service = new AdminLeadsService(repository as unknown as LeadsRepository);

    const page = await service.list(query({ pagina: 2 }));

    expect(repository.findPage).toHaveBeenCalledWith({}, 20, 20);
    expect(page).toMatchObject({ total: 45, pagina: 2, limite: 20, totalPaginas: 3, resumo: SUMMARY });
    expect(page.itens[0]).toMatchObject({ protocolo: "CB-2026-ABCDE", criadoEm: "2026-11-01T10:00:00.000Z" });
    expect(page.itens[0]).not.toHaveProperty("consentimentoEm");
  });

  it("os contadores ignoram o filtro de status", async () => {
    const repository = buildRepository();
    const service = new AdminLeadsService(repository as unknown as LeadsRepository);

    await service.list(query({ status: "FECHADO", objetivo: "terreno" }));

    expect(repository.findPage).toHaveBeenCalledWith({ objetivo: "terreno", status: "FECHADO" }, 0, 20);
    expect(repository.countByStatus).toHaveBeenCalledWith({ objetivo: "terreno" });
  });

  it("devolve pelo menos uma página mesmo sem pedidos", async () => {
    const repository = buildRepository({ findPage: jest.fn().mockResolvedValue([]), count: jest.fn().mockResolvedValue(0) });
    const page = await new AdminLeadsService(repository as unknown as LeadsRepository).list(query());
    expect(page.totalPaginas).toBe(1);
  });

  it("atualiza o status de um pedido existente", async () => {
    const repository = buildRepository();
    const service = new AdminLeadsService(repository as unknown as LeadsRepository);
    await expect(service.updateStatus("CB-2026-ABCDE", "PROPOSTA")).resolves.toMatchObject({ status: "PROPOSTA" });
  });

  it("devolve não encontrado para pedido inexistente ou protocolo malformado", async () => {
    const repository = buildRepository({ updateStatus: jest.fn().mockResolvedValue(null) });
    const service = new AdminLeadsService(repository as unknown as LeadsRepository);

    await expect(service.updateStatus("CB-2026-ABCDE", "FECHADO")).rejects.toThrow(NotFoundException);
    await expect(service.updateStatus("{$ne:1}", "FECHADO")).rejects.toThrow(NotFoundException);
    expect(repository.updateStatus).toHaveBeenCalledTimes(1);
  });
});
