import type { Ref } from "react";
import { Icon } from "@/shared/components/ui/Icon/Icon";
import styles from "./MobileMenuToggle.module.css";

interface MobileMenuToggleProps {
  ref?: Ref<HTMLButtonElement>;
  isOpen: boolean;
  onToggle: () => void;
  controlsId: string;
  openLabel: string;
  closeLabel: string;
}

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
