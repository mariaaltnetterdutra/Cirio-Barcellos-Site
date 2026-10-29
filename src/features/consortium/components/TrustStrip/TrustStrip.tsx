import { PortoBankLogo } from "@/shared/components/brand/PortoBankLogo/PortoBankLogo";
import { GoogleRatingBadge } from "@/shared/components/ui/GoogleRatingBadge/GoogleRatingBadge";
import type { StatItem } from "../../types";
import { TRUST_CONTENT as CONTENT } from "../../content";
import styles from "./TrustStrip.module.css";

function Stat({ value, label }: StatItem) {
  return (
    <li className={styles.item}>
      <b className={styles.value}>{value}</b>
      <span className={styles.label}>{label}</span>
    </li>
  );
}

// Faixa logo abaixo do topo: números da empresa, nota no Google e a parceria com a Porto.
// Todos os itens seguem o mesmo padrão: destaque em cima, legenda embaixo, centralizados.
export function TrustStrip() {
  return (
    <div className={`tone-slate ${styles.strip}`}>
      <ul className={styles.list}>
        <Stat {...CONTENT.experience} />
        <Stat {...CONTENT.clients} />
        <li className={styles.item}>
          <GoogleRatingBadge label={CONTENT.google.label} linkLabel={CONTENT.google.linkLabel} />
        </li>
        <li className={styles.item}>
          <PortoBankLogo variant="dark" size="md" />
          <span className={styles.label}>{CONTENT.partner.label}</span>
        </li>
      </ul>
    </div>
  );
}
