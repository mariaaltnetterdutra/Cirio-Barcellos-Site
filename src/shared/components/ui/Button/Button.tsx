import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/shared/utils/cn";
import { Icon, type IconName } from "../Icon/Icon";
import styles from "./Button.module.css";

export type ButtonVariant = "primary" | "ghost" | "ghost-inverse";

interface ButtonBaseProps {
  variant?: ButtonVariant;
  icon?: IconName;
  children: ReactNode;
}

type ButtonProps = ButtonBaseProps & Omit<ComponentProps<"button">, "children">;
type ButtonLinkProps = ButtonBaseProps & Omit<ComponentProps<typeof Link>, "children">;

const VARIANT_CLASS: Record<ButtonVariant, string | undefined> = {
  primary: styles.primary,
  ghost: styles.ghost,
  "ghost-inverse": styles.ghostInverse,
};

function buttonClassName(variant: ButtonVariant, className: string | undefined): string {
  return cn(styles.button, VARIANT_CLASS[variant], className);
}

function ButtonContent({ icon, children }: Pick<ButtonBaseProps, "icon" | "children">) {
  return (
    <>
      {children}
      {icon && <Icon name={icon} size="sm" />}
    </>
  );
}

export function Button({
  variant = "primary",
  icon,
  className,
  type = "button",
  children,
  ...rest
}: ButtonProps) {
  return (
    <button type={type} className={buttonClassName(variant, className)} {...rest}>
      <ButtonContent icon={icon}>{children}</ButtonContent>
    </button>
  );
}

export function ButtonLink({
  variant = "primary",
  icon,
  className,
  children,
  ...rest
}: ButtonLinkProps) {
  return (
    <Link className={buttonClassName(variant, className)} {...rest}>
      <ButtonContent icon={icon}>{children}</ButtonContent>
    </Link>
  );
}
