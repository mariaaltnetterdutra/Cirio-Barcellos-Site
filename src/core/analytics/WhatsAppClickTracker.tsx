"use client";

import { useEffect } from "react";
import { trackEvent } from "./track";

const WHATSAPP_LINK = 'a[href^="https://wa.me/"], a[href^="https://api.whatsapp.com/"]';

function clickPlace(link: Element): string {
  const section = link.closest("section[id]");
  if (section) return section.id;
  return link.closest("footer") ? "rodape" : "flutuante";
}

export function WhatsAppClickTracker() {
  useEffect(() => {
    function handleClick(event: MouseEvent): void {
      if (!(event.target instanceof Element)) return;
      const link = event.target.closest(WHATSAPP_LINK);
      if (link) trackEvent("clique_whatsapp", { local: clickPlace(link) });
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}
