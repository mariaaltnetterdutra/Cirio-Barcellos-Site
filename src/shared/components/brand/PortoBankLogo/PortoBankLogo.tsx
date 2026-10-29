import Image from "next/image";
import { cn } from "@/shared/utils/cn";
import styles from "./PortoBankLogo.module.css";

export type PortoBankLogoVariant = "light" | "dark";

interface PortoBankLogoProps {
  /** light: fundo claro (logo original). dark: fundo escuro (versão com texto branco). */
  variant?: PortoBankLogoVariant;
  className?: string;
}

// Arquivo em 660x130; exibido com 30px de altura (o next/image gera 1x e 2x).
const DISPLAY_SIZE = { width: 152, height: 30 };

const SRC: Record<PortoBankLogoVariant, string> = {
  light: "/brand/porto-bank.png",
  dark: "/brand/porto-bank-negativo.png",
};

export function PortoBankLogo({ variant = "light", className }: PortoBankLogoProps) {
  return (
    <Image
      className={cn(styles.logo, className)}
      src={SRC[variant]}
      alt="Porto Bank"
      {...DISPLAY_SIZE}
    />
  );
}
