import { env } from "@/core/config/env";

export type ApiErrorKind = "network" | "timeout" | "rate_limited" | "validation" | "server";

export class ApiError extends Error {
  readonly kind: ApiErrorKind;
  readonly status?: number;

  constructor(kind: ApiErrorKind, message: string, status?: number) {
    super(message);
    this.name = "ApiError";
    this.kind = kind;
    this.status = status;
  }
}

const DEFAULT_TIMEOUT_MS = 10_000;
const HTTP_TOO_MANY_REQUESTS = 429;
const HTTP_CLIENT_ERROR_MIN = 400;
const HTTP_SERVER_ERROR_MIN = 500;

function kindFromStatus(status: number): ApiErrorKind {
  if (status === HTTP_TOO_MANY_REQUESTS) return "rate_limited";
  if (status >= HTTP_CLIENT_ERROR_MIN && status < HTTP_SERVER_ERROR_MIN) return "validation";
  return "server";
}

export async function postJson<TResponse>(
  path: string,
  body: object,
  parse: (data: unknown) => TResponse,
  timeoutMs: number = DEFAULT_TIMEOUT_MS,
): Promise<TResponse> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  let response: Response;
  try {
    response = await fetch(`${env.apiUrl}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
  } catch {
    throw controller.signal.aborted
      ? new ApiError("timeout", "A API demorou demais para responder.")
      : new ApiError("network", "Não foi possível falar com a API.");
  } finally {
    clearTimeout(timer);
  }

  if (!response.ok) {
    throw new ApiError(kindFromStatus(response.status), `A API respondeu ${response.status}.`, response.status);
  }

  try {
    return parse(await response.json());
  } catch {
    throw new ApiError("server", "A resposta da API veio em um formato inesperado.", response.status);
  }
}
