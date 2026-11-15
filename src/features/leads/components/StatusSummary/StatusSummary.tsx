import { LEADS_CONTENT as CONTENT, STATUS_LABELS } from "../../content";
import { LEAD_STATUSES, type LeadStatus, type StatusSummary as Summary } from "../../types";
import styles from "./StatusSummary.module.css";

interface StatusSummaryProps {
  summary: Summary;
  selected: LeadStatus | undefined;
  onSelect: (status: LeadStatus | undefined) => void;
}

interface ChipProps {
  label: string;
  count: number;
  status?: LeadStatus;
  pressed: boolean;
  onClick: () => void;
}

function Chip({ label, count, status, pressed, onClick }: ChipProps) {
  return (
    <button type="button" className={styles.chip} data-status={status} aria-pressed={pressed} onClick={onClick}>
      <span className={styles.dot} aria-hidden="true" />
      <span className={styles.label}>{label}</span>
      <span className={styles.count}>{count}</span>
    </button>
  );
}

export function StatusSummary({ summary, selected, onSelect }: StatusSummaryProps) {
  const total = LEAD_STATUSES.reduce((sum, status) => sum + summary[status], 0);

  return (
    <div className={styles.group} role="group" aria-label={CONTENT.statusFilterLabel}>
      <Chip label={CONTENT.allStatuses} count={total} pressed={selected === undefined} onClick={() => onSelect(undefined)} />
      {LEAD_STATUSES.map((status) => (
        <Chip
          key={status}
          label={STATUS_LABELS[status]}
          count={summary[status]}
          status={status}
          pressed={selected === status}
          onClick={() => onSelect(selected === status ? undefined : status)}
        />
      ))}
    </div>
  );
}
