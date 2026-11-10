import type { MouseEvent } from "react";

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function scrollToSection(sectionId: string): boolean {
  const section = document.getElementById(sectionId);
  if (!section) return false;
  section.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" });
  section.focus({ preventScroll: true });
  return true;
}

export function handleSectionLinkClick(event: MouseEvent<HTMLAnchorElement>, sectionId: string): void {
  const hasModifier = event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
  if (hasModifier || event.button !== 0) return;
  if (scrollToSection(sectionId)) event.preventDefault();
}
