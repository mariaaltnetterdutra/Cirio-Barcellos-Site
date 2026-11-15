import "reflect-metadata";
import { validateEnvironment } from "./env.validation";

const BASE = {
  NODE_ENV: "development",
  CORS_ORIGIN: "http://localhost:3000",
  MONGODB_URI: "mongodb://127.0.0.1:27017/cirio-barcellos",
};

describe("validateEnvironment", () => {
  it("converte PORT e SMTP_PORT vindos do .env (sempre texto) para número", () => {
    const env = validateEnvironment({ ...BASE, PORT: "3001", SMTP_PORT: "587" });
    expect(env.PORT).toBe(3001);
    expect(env.SMTP_PORT).toBe(587);
  });

  it("usa os padrões quando PORT e SMTP_PORT não são informados", () => {
    const env = validateEnvironment(BASE);
    expect(env.PORT).toBe(3001);
    expect(env.SMTP_PORT).toBe(587);
  });

  it("aceita SMTP vazio em desenvolvimento", () => {
    expect(() => validateEnvironment({ ...BASE, SMTP_HOST: "", SMTP_USER: "" })).not.toThrow();
  });

  it("exige todos os campos de email quando SMTP_HOST é preenchido", () => {
    expect(() => validateEnvironment({ ...BASE, SMTP_HOST: "smtp.exemplo.com" })).toThrow(/SMTP_USER/);
  });

  it("rejeita porta inválida", () => {
    expect(() => validateEnvironment({ ...BASE, PORT: "abc" })).toThrow(/PORT/);
  });
});
