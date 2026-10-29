import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/shared/utils/cn";
import { Icon, type IconName } from "../Icon/Icon";
import styles from "./HoverCard.module.css";

interface HoverCardBaseProps {
  icon: IconName;
  title: string;
  children: ReactNode;
  /** Texto com setinha no rodapé do card (ex.: "Analisar este projeto"). */
  ctaLabel: string;
  className?: string;
}

/** Leva para outra página ou âncora: o card inteiro é clicável, com um único link no HTML. */
interface HoverCardLinkProps extends HoverCardBaseProps {
  href: string;
  onClick?: never;
}

/** Executa uma ação na própria página (ex.: marcar o objetivo no formulário). */
interface HoverCardButtonProps extends HoverCardBaseProps {
  onClick: () => void;
  href?: never;
}

type HoverCardProps = HoverCardLinkProps | HoverCardButtonProps;

function CtaContent({ label }: { label: string }) {
  return (
    <>
      {label}
      <Icon name="arrow-right" size="sm" />
    </>
  );
}

export function HoverCard(props: HoverCardProps) {
  const { icon, title, children, ctaLabel, className } = props;
  const iconElement = <Icon name={icon} size="lg" className={styles.icon} />;
  const textElement = <span className={styles.text}>{children}</span>;

  // Um <button> não pode conter títulos (h3): no modo botão o título vira <span>.
  if (props.onClick) {
    return (
      <button type="button" className={cn(styles.card, className)} onClick={props.onClick}>
        {iconElement}
        <span className={styles.title}>{title}</span>
        {textElement}
        <span className={styles.cta}>
          <CtaContent label={ctaLabel} />
        </span>
      </button>
    );
  }

  return (
    <article className={cn(styles.card, className)}>
      {iconElement}
      <h3 className={styles.title}>{title}</h3>
      {textElement}
      <Link href={props.href} className={cn(styles.cta, styles.stretchedLink)}>
        <CtaContent label={ctaLabel} />
      </Link>
    </article>
  );
}
