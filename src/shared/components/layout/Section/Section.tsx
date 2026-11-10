import type { ReactNode } from "react";
import { cn } from "@/shared/utils/cn";
import styles from "./Section.module.css";

export type SectionTone = "default" | "muted" | "cream" | "slate" | "navy";
export type SectionWidth = "default" | "narrow" | "wide";

interface SectionProps {
  id?: string;
  tone?: SectionTone;
  width?: SectionWidth;
  labelledBy?: string;
  /** -1 deixa a seção receber foco por código (ex.: ao rolar até o formulário). */
  tabIndex?: number;
  className?: string;
  children: ReactNode;
}

const TONE_CLASS: Record<SectionTone, string | undefined> = {
  default: styles.toneDefault,
  muted: styles.toneMuted,
  cream: styles.toneCream,
  slate: "tone-slate",
  navy: styles.toneNavy,
};

export function Section({
  id,
  tone = "default",
  width = "default",
  labelledBy,
  tabIndex,
  className,
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      tabIndex={tabIndex}
      className={cn(styles.section, TONE_CLASS[tone], className)}
    >
      <div className={cn(styles.inner, width === "narrow" && styles.narrow, width === "wide" && styles.wide)}>
        {children}
      </div>
    </section>
  );
}
