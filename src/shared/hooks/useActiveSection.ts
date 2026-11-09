"use client";

import { useEffect, useState } from "react";

// Faixa no meio da tela: a seção que cruza essa linha é a que a pessoa está lendo.
const MIDDLE_BAND = "-45% 0px -50% 0px";

export function useActiveSection(ids: readonly string[], enabled = true): string | null {
  const [activeId, setActiveId] = useState<string | null>(null);
  const idsKey = ids.join("|");

  useEffect(() => {
    if (!enabled) return;
    const elements = idsKey
      .split("|")
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: MIDDLE_BAND },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [idsKey, enabled]);

  return enabled ? activeId : null;
}
