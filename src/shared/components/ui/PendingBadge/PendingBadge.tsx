import styles from "./PendingBadge.module.css";

interface PendingBadgeProps {
  label?: string;
}

export function PendingBadge({ label = "a confirmar" }: PendingBadgeProps) {
  return <span className={styles.badge}>{label}</span>;
}
