// Guarda de onde o visitante veio (anúncio, busca, link) para o pedido chegar à equipe com a origem.
// Regra do primeiro toque: a primeira origem útil da visita vale até a aba fechar. Fica só no navegador
// (sessionStorage) e só vai para a API junto com o pedido.
const STORAGE_KEY = "cb:origem";
// Mesmo limite que a API aceita em cada campo de origem.
const MAX_LENGTH = 200;

export interface Attribution {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
  gclid?: string;
  /** Site de onde a pessoa veio, sem parâmetros. */
  referrer?: string;
}

const QUERY_PARAMS = {
  utm_source: "utmSource",
  utm_medium: "utmMedium",
  utm_campaign: "utmCampaign",
  utm_term: "utmTerm",
  utm_content: "utmContent",
  gclid: "gclid",
} as const satisfies Record<string, keyof Attribution>;

const FIELDS: readonly (keyof Attribution)[] = [...Object.values(QUERY_PARAMS), "referrer"];

function clean(value: string | null | undefined): string | undefined {
  const trimmed = value?.trim().slice(0, MAX_LENGTH);
  return trimmed || undefined;
}

function externalReferrer(): string | undefined {
  if (!document.referrer) return undefined;
  try {
    const url = new URL(document.referrer);
    if (url.host === window.location.host) return undefined;
    return clean(`${url.origin}${url.pathname}`);
  } catch {
    return undefined;
  }
}

function readCurrentVisit(): Attribution {
  const params = new URLSearchParams(window.location.search);
  const attribution: Attribution = { referrer: externalReferrer() };
  for (const [param, field] of Object.entries(QUERY_PARAMS)) {
    attribution[field] = clean(params.get(param));
  }
  return attribution;
}

function hasAnyValue(attribution: Attribution): boolean {
  return FIELDS.some((field) => attribution[field] !== undefined);
}

function parseStored(raw: string | null): Attribution {
  if (!raw) return {};
  try {
    const data: unknown = JSON.parse(raw);
    if (typeof data !== "object" || data === null) return {};
    const record: Record<string, unknown> = { ...data };
    const attribution: Attribution = {};
    for (const field of FIELDS) {
      const value = record[field];
      if (typeof value === "string") attribution[field] = clean(value);
    }
    return attribution;
  } catch {
    return {};
  }
}

function readStored(): Attribution {
  try {
    return parseStored(sessionStorage.getItem(STORAGE_KEY));
  } catch {
    return {};
  }
}

/** Chamada ao abrir a página: só guarda se ainda não há origem e se esta visita trouxe alguma. */
export function captureAttribution(): void {
  if (hasAnyValue(readStored())) return;
  const current = readCurrentVisit();
  if (!hasAnyValue(current)) return;
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(current));
  } catch {
    // Armazenamento bloqueado: o pedido segue sem origem, o que não impede o envio.
  }
}

/** Origem guardada nesta aba (vazia quando a pessoa chegou direto). */
export function readAttribution(): Attribution {
  return readStored();
}
