import { env } from "@/core/config/env";

export type ApiErrorKind = "network" | "timeout" | "rate_limited" | "unauthorized" | "validation" | "server";

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
const HTTP_UNAUTHORIZED = 401;
const HTTP_TOO_MANY_REQUESTS = 429;
const HTTP_CLIENT_ERROR_MIN = 400;
const HTTP_SERVER_ERROR_MIN = 500;

function kindFromStatus(status: number): ApiErrorKind {
  if (status === HTTP_UNAUTHORIZED) return "unauthorized";
  if (status === HTTP_TOO_MANY_REQUESTS) return "rate_limited";
  if (status >= HTTP_CLIENT_ERROR_MIN && status < HTTP_SERVER_ERROR_MIN) return "validation";
  return "server";
}

interface RequestOptions<TResponse> {
  method: "GET" | "POST" | "PATCH";
  path: string;
  parse: (data: unknown) => TResponse;
  body?: object;
  token?: string;
  timeoutMs?: number;
}

async function requestJson<TResponse>({
  method,
  path,
  parse,
  body,
  token,
  timeoutMs = DEFAULT_TIMEOUT_MS,
}: RequestOptions<TResponse>): Promise<TResponse> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  const headers: Record<string, string> = {};
  if (body) headers["Content-Type"] = "application/json";
  if (token) headers.Authorization = `Bearer ${token}`;

  let response: Response;
  try {
    response = await fetch(`${env.apiUrl}${path}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
      cache: "no-store",
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

export function postJson<TResponse>(
  path: string,
  body: object,
  parse: (data: unknown) => TResponse,
  timeoutMs?: number,
): Promise<TResponse> {
  return requestJson({ method: "POST", path, body, parse, timeoutMs });
}

export function getJson<TResponse>(
  path: string,
  parse: (data: unknown) => TResponse,
  token?: string,
): Promise<TResponse> {
  return requestJson({ method: "GET", path, parse, token });
}

export function patchJson<TResponse>(
  path: string,
  body: object,
  parse: (data: unknown) => TResponse,
  token?: string,
): Promise<TResponse> {
  return requestJson({ method: "PATCH", path, body, parse, token });
}
