const ratingFormatter = new Intl.NumberFormat("pt-BR", {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

/** 4.9 → "4,9" */
export function formatRating(rating: number): string {
  return ratingFormatter.format(rating);
}

/** 200 → "R$ 200 mil" (valores de carta de crédito, em milhares de reais). */
export function formatCredit(creditInThousands: number): string {
  return `R$ ${creditInThousands} mil`;
}
