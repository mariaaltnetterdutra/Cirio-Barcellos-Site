const thousandsFormatter = new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 0 });

/** Deixa só os números, no máximo 9 dígitos (até R$ 999.999.999). */
export function onlyCurrencyDigits(value: string): string {
  return value.replace(/\D/g, "").slice(0, 9);
}

/** "350000" vira "350.000", para a pessoa ver o valor enquanto digita. */
export function formatThousands(digits: string): string {
  return digits ? thousandsFormatter.format(Number(digits)) : "";
}

/** 300000 vira "R$ 300 mil" e 1000000 vira "R$ 1 milhão"; o resto vira "R$ 350.000". */
export function formatCreditValue(value: number): string {
  if (value >= 1_000_000 && value % 1_000_000 === 0) {
    const millions = value / 1_000_000;
    return `R$ ${millions} ${millions === 1 ? "milhão" : "milhões"}`;
  }
  if (value % 1000 === 0 && value < 1_000_000) return `R$ ${value / 1000} mil`;
  return `R$ ${thousandsFormatter.format(value)}`;
}
