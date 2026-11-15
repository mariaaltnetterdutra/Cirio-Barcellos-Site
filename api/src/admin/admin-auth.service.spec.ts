import { ServiceUnavailableException, UnauthorizedException } from "@nestjs/common";
import type { ConfigService } from "@nestjs/config";
import type { EnvironmentVariables } from "../config/env.validation";
import { AdminAuthService } from "./admin-auth.service";

const PASSWORD = "senha-da-equipe-123";
const SECRET = "segredo-de-teste-com-mais-de-32-caracteres";

function buildService(values: Partial<EnvironmentVariables>): AdminAuthService {
  const config = { get: (key: keyof EnvironmentVariables) => values[key] } as ConfigService<EnvironmentVariables, true>;
  return new AdminAuthService(config);
}

describe("AdminAuthService", () => {
  const service = buildService({ ADMIN_PASSWORD: PASSWORD, ADMIN_TOKEN_SECRET: SECRET });

  it("entrega um token que ele mesmo reconhece quando a senha está certa", () => {
    const session = service.login(PASSWORD);
    expect(service.isTokenValid(session.token)).toBe(true);
    expect(new Date(session.expiraEm).getTime()).toBeGreaterThan(Date.now());
  });

  it("recusa a senha errada", () => {
    expect(() => service.login("senha-errada")).toThrow(UnauthorizedException);
  });

  it("recusa um token vencido", () => {
    const longAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const session = service.login(PASSWORD, longAgo);
    expect(service.isTokenValid(session.token)).toBe(false);
  });

  it("fica desativado sem senha e sem segredo", () => {
    const disabled = buildService({});
    expect(() => disabled.login(PASSWORD)).toThrow(ServiceUnavailableException);
    expect(disabled.isTokenValid("qualquer.coisa")).toBe(false);
  });
});
