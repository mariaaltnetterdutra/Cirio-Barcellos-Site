import Image from "next/image";
import { COMPANY } from "@/shared/constants/company";
import { cn } from "@/shared/utils/cn";
import styles from "./Logo.module.css";

export type LogoVariant = "light" | "dark";

interface LogoProps {
  /** light: fundo claro (nome preto). dark: fundo escuro (nome branco). */
  variant?: LogoVariant;
  className?: string;
}

// Tamanho exibido em telas grandes (docs/DESIGN.md, seção 1). Passar o tamanho de tela,
// e não o do arquivo, faz o next/image gerar só as versões 1x e 2x necessárias.
const SYMBOL_SIZE = { width: 39, height: 44 };
const NAME_SIZE = { width: 130, height: 30 };

const NAME_SRC: Record<LogoVariant, string> = {
  light: "/brand/logo-nome.png",
  dark: "/brand/logo-nome-branco.png",
};

export function Logo({ variant = "light", className }: LogoProps) {
  return (
    <span className={cn(styles.logo, className)}>
      <Image className={styles.symbol} src="/brand/logo-simbolo.png" alt="" {...SYMBOL_SIZE} />
      <span className={styles.divider} aria-hidden="true" />
      <Image className={styles.name} src={NAME_SRC[variant]} alt={COMPANY.name} {...NAME_SIZE} />
    </span>
  );
}
