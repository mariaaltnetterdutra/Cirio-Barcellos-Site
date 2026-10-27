import type { ReactNode } from "react";
import { cn } from "@/shared/utils/cn";
import styles from "./Eyebrow.module.css";

interface EyebrowProps {
  className?: string;
  children: ReactNode;
}

export function Eyebrow({ className, children }: EyebrowProps) {
  return <p className={cn(styles.eyebrow, className)}>{children}</p>;
}
