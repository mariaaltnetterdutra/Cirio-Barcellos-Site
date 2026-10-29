const ratingFormatter = new Intl.NumberFormat("pt-BR", {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

export function formatRating(rating: number): string {
  return ratingFormatter.format(rating);
}

export function formatCredit(creditInThousands: number): string {
  return `R$ ${creditInThousands} mil`;
}
