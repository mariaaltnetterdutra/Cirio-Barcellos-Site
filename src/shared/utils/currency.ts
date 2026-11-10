const thousandsFormatter = new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 0 });

export function onlyCurrencyDigits(value: string): string {
  return value.replace(/\D/g, "").slice(0, 9);
}

export function formatThousands(digits: string): string {
  return digits ? thousandsFormatter.format(Number(digits)) : "";
}

export function formatCreditValue(value: number): string {
  if (value >= 1_000_000 && value % 1_000_000 === 0) {
    const millions = value / 1_000_000;
    return `R$ ${millions} ${millions === 1 ? "milhão" : "milhões"}`;
  }
  if (value % 1000 === 0 && value < 1_000_000) return `R$ ${value / 1000} mil`;
  return `R$ ${thousandsFormatter.format(value)}`;
}
