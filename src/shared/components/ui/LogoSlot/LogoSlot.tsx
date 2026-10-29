import { cn } from "@/shared/utils/cn";
import styles from "./LogoSlot.module.css";

interface LogoSlotProps {
  /** Ex.: "Logo Porto Bank". Some quando a logo oficial entrar no lugar. */
  label: string;
  className?: string;
}

// Espaço para logos de parceiros que o cliente ainda vai mandar. As cores vêm do tom da seção.
export function LogoSlot({ label, className }: LogoSlotProps) {
  return (
    <span className={cn(styles.slot, className)} role="img" aria-label={label}>
      {label}
    </span>
  );
}
