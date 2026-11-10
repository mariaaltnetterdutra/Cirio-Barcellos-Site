import Image from "next/image";
import { cn } from "@/shared/utils/cn";
import styles from "./PortoBankLogo.module.css";

export type PortoBankLogoVariant = "light" | "dark";
export type PortoBankLogoSize = "sm" | "md" | "lg";

interface PortoBankLogoProps {
  variant?: PortoBankLogoVariant;
  size?: PortoBankLogoSize;
  className?: string;
}

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
