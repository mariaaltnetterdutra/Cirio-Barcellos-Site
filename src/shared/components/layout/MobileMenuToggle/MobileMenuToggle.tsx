import type { Ref } from "react";
import { Icon } from "@/shared/components/ui/Icon/Icon";
import styles from "./MobileMenuToggle.module.css";

interface MobileMenuToggleProps {
  ref?: Ref<HTMLButtonElement>;
  isOpen: boolean;
  onToggle: () => void;
  /** id do menu que o botão abre e fecha (aria-controls). */
  controlsId: string;
  openLabel: string;
  closeLabel: string;
}

// Só desenha: o estado vem de quem usa (ver useMobileMenu). Aparece até 860px.
export function MobileMenuToggle({
  ref,
  isOpen,
  onToggle,
  controlsId,
  openLabel,
  closeLabel,
}: MobileMenuToggleProps) {
  return (
    <button
      ref={ref}
      type="button"
      className={styles.toggle}
      aria-expanded={isOpen}
      aria-controls={controlsId}
      aria-label={isOpen ? closeLabel : openLabel}
      onClick={onToggle}
    >
      <Icon name={isOpen ? "close" : "menu"} />
    </button>
  );
}
