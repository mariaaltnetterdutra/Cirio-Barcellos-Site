import { plainToInstance } from "class-transformer";
import { validateSync } from "class-validator";
import { CreateLeadDto } from "./create-lead.dto";

const VALID = {
  nome: "  Maria Teste  ",
  whatsapp: "51999998888",
  objetivo: "imovel",
  valor: "300a500",
  prazo: "1a3",
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

  it("recusa WhatsApp sem DDD e opções que não existem", () => {
    expect(errorsFor({ ...VALID, whatsapp: "99998888", valor: "2m" })).toEqual(
      expect.arrayContaining(["whatsapp", "valor"]),
    );
  });
});
