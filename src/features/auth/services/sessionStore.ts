const STORAGE_KEY = "cb:painel";

export interface AdminSession {
  token: string;
  expiraEm: string;
}

const listeners = new Set<() => void>();
let memorySession: AdminSession | null = null;

function isAdminSession(value: unknown): value is AdminSession {
  return (
    typeof value === "object" &&
    value !== null &&
    "token" in value &&
    typeof value.token === "string" &&
    "expiraEm" in value &&
    typeof value.expiraEm === "string"
  );
}

function readStored(): AdminSession | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const data: unknown = JSON.parse(raw);
    return isAdminSession(data) ? data : null;
  } catch {
    return null;
  }
}

function isExpired(session: AdminSession): boolean {
  return Date.parse(session.expiraEm) <= Date.now();
}

function notify(): void {
  listeners.forEach((listener) => listener());
}

export function subscribeSession(listener: () => void): () => void {
  listeners.add(listener);
  window.addEventListener("storage", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

export function getSessionToken(): string | null {
  const session = memorySession ?? readStored();
  return session && !isExpired(session) ? session.token : null;
}

export function saveSession(session: AdminSession): void {
  memorySession = session;
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  } catch {
  }
  notify();
}

export function clearSession(): void {
  memorySession = null;
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch {
  }
  notify();
}
