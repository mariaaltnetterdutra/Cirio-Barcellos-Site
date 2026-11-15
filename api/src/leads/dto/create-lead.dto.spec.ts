import "reflect-metadata";
import { plainToInstance } from "class-transformer";
import { validateSync } from "class-validator";
import { CreateLeadDto } from "./create-lead.dto";

const VALID = {
  nome: "  Maria Teste  ",
  whatsapp: "51999998888",
  objetivo: "imovel",
  valorCredito: 300000,
  prazoMeses: 180,
  consentimento: true,
};

function errorsFor(payload: Record<string, unknown>): string[] {
  return validateSync(plainToInstance(CreateLeadDto, payload)).map((error) => error.property);
}

describe("CreateLeadDto", () => {
  it("aceita um pedido válido e tira os espaços do nome", () => {
    const dto = plainToInstance(CreateLeadDto, VALID);
    expect(validateSync(dto)).toHaveLength(0);
    expect(dto.nome).toBe("Maria Teste");
  });

  it("recusa sem consentimento", () => {
    expect(errorsFor({ ...VALID, consentimento: false })).toContain("consentimento");
  });

  it("recusa WhatsApp sem DDD, valor fora do limite e objetivo que não existe", () => {
    expect(errorsFor({ ...VALID, whatsapp: "99998888", valorCredito: 10, objetivo: "carro" })).toEqual(
      expect.arrayContaining(["whatsapp", "valorCredito", "objetivo"]),
    );
  });

  it("aceita pedido sem valor e sem prazo (a pessoa ainda não sabe)", () => {
    const { valorCredito: _valor, prazoMeses: _prazo, ...semValores } = VALID;
    expect(errorsFor(semValores)).toHaveLength(0);
  });
});
