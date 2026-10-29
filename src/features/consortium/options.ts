// Opções das perguntas de marcar do formulário. O backend valida os mesmos valores.

export const GOAL_OPTIONS = [
  { value: "imovel", label: "Comprar um imóvel" },
  { value: "terreno", label: "Comprar um terreno" },
  { value: "construir", label: "Construir" },
  { value: "reformar", label: "Reformar" },
  { value: "investir", label: "Investir e ampliar patrimônio" },
  { value: "outro", label: "Outro" },
] as const;

export const BUDGET_OPTIONS = [
  { value: "ate100", label: "Até R$ 100 mil" },
  { value: "100a300", label: "R$ 100 mil a R$ 300 mil" },
  { value: "300a500", label: "R$ 300 mil a R$ 500 mil" },
  { value: "500a1m", label: "R$ 500 mil a R$ 1 milhão" },
  { value: "1m", label: "Acima de R$ 1 milhão" },
] as const;

export const TIMEFRAME_OPTIONS = [
  { value: "1ano", label: "Em até 1 ano" },
  { value: "1a3", label: "De 1 a 3 anos" },
  { value: "3a5", label: "De 3 a 5 anos" },
  { value: "avaliando", label: "Ainda estou avaliando" },
] as const;
