import { cacheLife } from "next/cache";

/**
 * Ano atual para o rodapé. Com Cache Components, ler a data durante o prerender
 * só é permitido dentro de um "use cache"; o valor é renovado uma vez por dia.
 */
export async function getCurrentYear(): Promise<number> {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}
