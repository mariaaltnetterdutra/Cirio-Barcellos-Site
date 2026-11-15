import { postJson } from "@/core/api/httpClient";
import type { AdminSession } from "./sessionStore";

const LOGIN_PATH = "/admin/login";

function parseSession(data: unknown): AdminSession {
  if (
    typeof data === "object" &&
    data !== null &&
    "token" in data &&
    typeof data.token === "string" &&
    "expiraEm" in data &&
    typeof data.expiraEm === "string"
  ) {
    return { token: data.token, expiraEm: data.expiraEm };
  }
  throw new Error("Resposta sem token.");
}

export function login(password: string): Promise<AdminSession> {
  return postJson(LOGIN_PATH, { senha: password }, parseSession);
}
