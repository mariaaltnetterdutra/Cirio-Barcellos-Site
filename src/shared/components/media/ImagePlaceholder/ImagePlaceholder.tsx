import Image from "next/image";
import { Icon, type IconName } from "@/shared/components/ui/Icon/Icon";
import { cn } from "@/shared/utils/cn";
import styles from "./ImagePlaceholder.module.css";

export type AspectRatio = "4/5" | "5/4" | "16/10" | "16/11" | "1/1";

interface ImagePlaceholderProps {
  /** Descreve a foto que vai entrar aqui (também é o texto para leitores de tela). */
  label: string;
  tone?: "light" | "dark";
  aspectRatio?: AspectRatio;
  icon?: Extract<IconName, "image" | "user">;
  src?: string;
  alt?: string;
  sizes?: string;
  preload?: boolean;
  className?: string;
}

const RATIO_CLASS: Record<AspectRatio, string | undefined> = {
  "4/5": styles.ratio4x5,
  "5/4": styles.ratio5x4,
  "16/10": styles.ratio16x10,
  "16/11": styles.ratio16x11,
  "1/1": styles.ratio1x1,
};

const PENDING_LABEL = "Aguardando foto";

export function ImagePlaceholder({
  label,
  tone = "light",
  aspectRatio = "4/5",
  icon = "image",
  src,
  alt,
  sizes = "(max-width: 820px) 100vw, 50vw",
  preload = false,
  className,
}: ImagePlaceholderProps) {
  const frameClass = cn(styles.frame, RATIO_CLASS[aspectRatio], className);

  if (src) {
    return (
      <div className={frameClass}>
        <Image
          className={styles.photo}
          src={src}
          alt={alt ?? label}
          fill
          sizes={sizes}
          preload={preload}
        />
      </div>
    );
  }

  return (
    <div
      className={cn(frameClass, styles.placeholder, tone === "dark" && styles.dark)}
      role="img"
      aria-label={label}
    >
      <Icon name={icon} size="lg" className={styles.icon} />
      <span className={styles.label}>{label}</span>
      <span className={styles.chip}>{PENDING_LABEL}</span>
    </div>
  );
}
