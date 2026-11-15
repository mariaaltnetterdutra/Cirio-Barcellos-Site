import { LEADS_CONTENT as CONTENT } from "../../content";
import { describeOrigin } from "../../utils/describeOrigin";
import type { LeadOrigin } from "../../types";
import styles from "./LeadItem.module.css";

export function OriginDetails({ origin }: { origin: LeadOrigin }) {
  const { summary, details } = describeOrigin(origin);

  if (details.length === 0) {
    return <p className={styles.originSummary}>{summary}</p>;
  }

  return (
    <details className={styles.origin}>
      <summary>
        <span className={styles.originTitle}>{CONTENT.item.origin}:</span> {summary}
      </summary>
      <dl className={styles.originList}>
        {details.map(({ label, value }) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
    </details>
  );
}
