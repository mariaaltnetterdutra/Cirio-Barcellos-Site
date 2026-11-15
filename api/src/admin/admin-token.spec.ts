import { createAdminToken, isAdminTokenValid } from "./admin-token";

const SECRET = "segredo-de-teste-com-mais-de-32-caracteres";
const NOW = 1_800_000_000_000;

describe("token do painel", () => {
  it("aceita um token válido e ainda dentro do prazo", () => {
    const token = createAdminToken(SECRET, NOW + 1000);
    expect(isAdminTokenValid(token, SECRET, NOW)).toBe(true);
  });

  it("recusa um token vencido", () => {
    const token = createAdminToken(SECRET, NOW - 1);
    expect(isAdminTokenValid(token, SECRET, NOW)).toBe(false);
  });

  it("recusa um token assinado com outro segredo", () => {
    const token = createAdminToken("outro-segredo-com-mais-de-32-caracteres!", NOW + 1000);
    expect(isAdminTokenValid(token, SECRET, NOW)).toBe(false);
  });

  it("recusa um token com a validade adulterada", () => {
    const [, signature] = createAdminToken(SECRET, NOW + 1000).split(".");
    const forged = Buffer.from(JSON.stringify({ exp: NOW + 999_999_999 })).toString("base64url");
    expect(isAdminTokenValid(`${forged}.${signature}`, SECRET, NOW)).toBe(false);
  });

  it.each(["", "abc", "a.b.c", ".", "a."])("recusa o texto malformado %p", (token) => {
    expect(isAdminTokenValid(token, SECRET, NOW)).toBe(false);
  });
});
