const STORAGE_KEY = "cb:ultimo-pedido";

export interface LastLead {
  protocol: string;
  firstName: string;
  whatsapp: string;
  goalLabel: string;
  creditLabel: string;
  termLabel: string;
}

export function saveLastLead(lead: LastLead): void {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(lead));
  } catch {
    // Navegador bloqueou o armazenamento: a confirmação mostra a versão genérica.
  }
}

export function readLastLeadRaw(): string | null {
  try {
    return sessionStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function isLastLead(data: unknown): data is LastLead {
  if (typeof data !== "object" || data === null) return false;
  const record: Record<string, unknown> = { ...data };
  const fields = ["protocol", "firstName", "whatsapp", "goalLabel", "creditLabel", "termLabel"];
  return fields.every((field) => typeof record[field] === "string");
}

export function parseLastLead(raw: string | null): LastLead | null {
  if (!raw) return null;
  try {
    const data: unknown = JSON.parse(raw);
    return isLastLead(data) ? data : null;
  } catch {
    return null;
  }
}
