import Image from "next/image";
import { cn } from "@/shared/utils/cn";
import styles from "./PortoBankLogo.module.css";

export type PortoBankLogoVariant = "light" | "dark";
export type PortoBankLogoSize = "sm" | "md" | "lg";

interface PortoBankLogoProps {
  /** light: fundo claro (logo original). dark: fundo escuro (versão com texto branco). */
  variant?: PortoBankLogoVariant;
  /** sm 30px · md 38px · lg 48px de altura (no celular o lg fica com 40px). */
  size?: PortoBankLogoSize;
  className?: string;
}

// O arquivo tem 660x130 (proporção ~5:1). Largura e altura aqui são as do maior tamanho
// exibido, para o next/image gerar versões nítidas; o CSS define o tamanho de cada variação.
const INTRINSIC_SIZE = { width: 244, height: 48 };

const SRC: Record<PortoBankLogoVariant, string> = {
  light: "/brand/porto-bank.png",
  dark: "/brand/porto-bank-negativo.png",
};

export function PortoBankLogo({ variant = "light", size = "sm", className }: PortoBankLogoProps) {
  return (
    <Image
      className={cn(styles.logo, styles[size], className)}
      src={SRC[variant]}
      alt="Porto Bank"
      {...INTRINSIC_SIZE}
    />
  );
}
