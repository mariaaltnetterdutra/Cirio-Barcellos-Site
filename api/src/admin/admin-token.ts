import { createHmac, timingSafeEqual } from "node:crypto";

interface TokenPayload {
  exp: number;
}

function sign(payload: string, secret: string): string {
  return createHmac("sha256", secret).update(payload).digest("base64url");
}

function isTokenPayload(value: unknown): value is TokenPayload {
  return typeof value === "object" && value !== null && "exp" in value && typeof value.exp === "number";
}

/** Token no formato `dados.assinatura`: guarda só a validade, sem nenhum dado de pessoa. */
export function createAdminToken(secret: string, expiresAtMs: number): string {
  const payload = Buffer.from(JSON.stringify({ exp: expiresAtMs } satisfies TokenPayload)).toString("base64url");
  return `${payload}.${sign(payload, secret)}`;
}

export function isAdminTokenValid(token: string, secret: string, nowMs: number): boolean {
  const [payload, signature, ...extra] = token.split(".");
  if (!payload || !signature || extra.length > 0) return false;

  const expected = Buffer.from(sign(payload, secret));
  const received = Buffer.from(signature);
  if (expected.length !== received.length || !timingSafeEqual(expected, received)) return false;

  try {
    const data: unknown = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    return isTokenPayload(data) && data.exp > nowMs;
  } catch {
    return false;
  }
}
