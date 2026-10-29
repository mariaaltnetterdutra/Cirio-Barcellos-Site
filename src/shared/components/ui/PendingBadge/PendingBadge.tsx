import styles from "./PendingBadge.module.css";

interface PendingBadgeProps {
  label?: string;
}

// Marca dados que o cliente ainda precisa confirmar (CNPJ, SUSEP, CEP...).
export function PendingBadge({ label = "a confirmar" }: PendingBadgeProps) {
  return <span className={styles.badge}>{label}</span>;
}
