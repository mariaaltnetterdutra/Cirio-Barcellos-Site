import { info } from "@/core/logger/logger";

// Nunca enviar nome ou telefone nos parâmetros.
export type TrackEventName =
  | "clique_analisar_projeto"
  | "clique_falar_especialista"
  | "clique_whatsapp"
  | "clique_plano"
  | "inicio_formulario"
  | "simulacao_passo_2"
  | "formulario_enviado";

export type TrackEventParams = Record<string, string | number | undefined>;

// Por enquanto só registra em desenvolvimento; o envio para o Google Tag Manager entra na T26.
export function trackEvent(name: TrackEventName, params: TrackEventParams = {}): void {
  info("[evento]", name, params);
}
