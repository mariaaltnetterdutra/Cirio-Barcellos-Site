import { info } from "@/core/logger/logger";

export type TrackEventName =
  | "clique_analisar_projeto"
  | "clique_falar_especialista"
  | "clique_whatsapp"
  | "clique_objetivo"
  | "clique_plano"
  | "inicio_formulario"
  | "simulacao_passo_2"
  | "formulario_enviado";

export type TrackEventParams = Record<string, string | number | undefined>;

export function trackEvent(name: TrackEventName, params: TrackEventParams = {}): void {
  info("[evento]", name, params);
}
