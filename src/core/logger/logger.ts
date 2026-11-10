const isDevelopment = process.env.NODE_ENV === "development";

export function info(...args: unknown[]): void {
  if (isDevelopment) console.info(...args);
}

export function warn(...args: unknown[]): void {
  if (isDevelopment) console.warn(...args);
}

export function error(...args: unknown[]): void {
  if (isDevelopment) console.error(...args);
}
