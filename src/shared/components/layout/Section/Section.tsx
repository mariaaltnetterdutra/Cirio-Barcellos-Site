import type { ReactNode } from "react";
import { cn } from "@/shared/utils/cn";
import styles from "./Section.module.css";

export type SectionTone = "default" | "muted" | "cream" | "slate" | "navy";
export type SectionWidth = "default" | "narrow";

interface SectionProps {
  id?: string;
  tone?: SectionTone;
  width?: SectionWidth;
  /** id do título da seção, ligado via aria-labelledby. */
  labelledBy?: string;
  className?: string;
  children: ReactNode;
}

// O tom ardósia usa a classe global .tone-slate, que redefine as variáveis de cor
// para tudo o que estiver dentro da seção.
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
  className,
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn(styles.section, TONE_CLASS[tone], className)}
    >
      <div className={cn(styles.inner, width === "narrow" && styles.narrow)}>
        {children}
      </div>
    </section>
  );
}
