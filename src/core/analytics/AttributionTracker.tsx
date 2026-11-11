"use client";

import { useEffect } from "react";
import { captureAttribution } from "./attribution";

/** Não desenha nada: só registra a origem da visita ao abrir qualquer página do site. */
export function AttributionTracker() {
  useEffect(() => {
    captureAttribution();
  }, []);

  return null;
}
