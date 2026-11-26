import { info } from "@/core/logger/logger";

export type TrackEventName =
  | "clique_analisar_projeto"
  | "clique_whatsapp"
  | "clique_objetivo"
  | "clique_plano"
  | "inicio_formulario"
  | "simulacao_passo_2"
  | "formulario_enviado";

export type TrackEventParams = Record<string, string | number | undefined>;

type WindowWithDataLayer = Window & { dataLayer?: Record<string, unknown>[] };

export function trackEvent(name: TrackEventName, params: TrackEventParams = {}): void {
  info("[evento]", name, params);
  if (typeof window === "undefined") return;
  const layerWindow: WindowWithDataLayer = window;
  layerWindow.dataLayer = layerWindow.dataLayer ?? [];
  layerWindow.dataLayer.push({ event: name, ...params });
}
