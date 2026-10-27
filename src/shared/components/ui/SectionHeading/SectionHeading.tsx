import type { ReactNode } from "react";
import { cn } from "@/shared/utils/cn";
import { Eyebrow } from "../Eyebrow/Eyebrow";
import styles from "./SectionHeading.module.css";

interface SectionHeadingProps {
  eyebrow?: ReactNode;
  title: ReactNode;
  /** h1 só no topo da página (um por página); nas demais seções, h2. */
  as?: "h1" | "h2";
  lead?: ReactNode;
  align?: "left" | "center";
  /** id do título, para o Section apontar com labelledBy. */
  titleId?: string;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  as: Heading = "h2",
  lead,
  align = "left",
  titleId,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn(align === "center" && styles.center, className)}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <Heading id={titleId} className={styles[Heading]}>
        {title}
      </Heading>
      {lead && <p className={styles.lead}>{lead}</p>}
    </div>
  );
}
