import type { MouseEvent } from "react";

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Rola até a seção e leva o foco junto. Devolve false se a seção não está na página. */
export function scrollToSection(sectionId: string): boolean {
  const section = document.getElementById(sectionId);
  if (!section) return false;
  section.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" });
  section.focus({ preventScroll: true });
  return true;
}

/**
 * Para links "#secao". O link de âncora do Next não rola de novo quando o endereço já termina
 * com o mesmo "#", então a rolagem é feita aqui. Clique com Ctrl, Shift ou botão do meio
 * continua com o comportamento normal do navegador.
 */
export function handleSectionLinkClick(event: MouseEvent<HTMLAnchorElement>, sectionId: string): void {
  const hasModifier = event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
  if (hasModifier || event.button !== 0) return;
  if (scrollToSection(sectionId)) event.preventDefault();
}
