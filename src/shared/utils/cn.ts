type ClassValue = string | false | null | undefined;

/** Junta classes CSS, ignorando valores vazios (útil para classes condicionais). */
export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(" ");
}
