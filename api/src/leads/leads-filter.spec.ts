import { buildLeadFilter, buildSearchFilter } from "./leads-filter";

describe("filtros dos pedidos", () => {
  it("não filtra nada quando não há busca, objetivo nem status", () => {
    expect(buildLeadFilter({})).toEqual({});
  });

  it("filtra por status e objetivo", () => {
    expect(buildLeadFilter({ status: "NOVO", objetivo: "terreno" })).toEqual({ objetivo: "terreno", status: "NOVO" });
  });

  it("a base dos contadores não inclui o status", () => {
    expect(buildSearchFilter({ objetivo: "imovel" })).toEqual({ objetivo: "imovel" });
  });

  it("busca por nome ou protocolo quando o texto tem letras", () => {
    expect(buildLeadFilter({ busca: "Maria" })).toEqual({
      $or: [
        { nome: { $regex: "Maria", $options: "i" } },
        { protocolo: { $regex: "Maria", $options: "i" } },
      ],
    });
  });

  it("busca por WhatsApp quando o texto parece telefone, ignorando a máscara", () => {
    expect(buildLeadFilter({ busca: "(51) 9 9324" })).toEqual({
      $or: [{ whatsapp: { $regex: "5199324" } }, { protocolo: { $regex: "\\(51\\) 9 9324", $options: "i" } }],
    });
  });

  it("não deixa o texto digitado virar uma expressão do banco", () => {
    const filter = buildLeadFilter({ busca: ".*(" });
    expect(JSON.stringify(filter)).toContain("\\\\.\\\\*\\\\(");
  });
});
