import { LEADS_CONTENT as CONTENT, STATUS_LABELS } from "../../content";
import { LEAD_STATUSES, type LeadStatus } from "../../types";
import styles from "./StatusSelect.module.css";

interface StatusSelectProps {
  leadName: string;
  value: LeadStatus;
  disabled: boolean;
  onChange: (status: LeadStatus) => void;
}

function isLeadStatus(value: string): value is LeadStatus {
  return LEAD_STATUSES.some((status) => status === value);
}

export function StatusSelect({ leadName, value, disabled, onChange }: StatusSelectProps) {
  return (
    <span className={styles.wrapper} data-status={value}>
      <select
        className={styles.select}
        aria-label={CONTENT.statusSelectLabel(leadName)}
        value={value}
        disabled={disabled}
        onChange={(event) => {
          if (isLeadStatus(event.target.value)) onChange(event.target.value);
        }}
      >
        {LEAD_STATUSES.map((status) => (
          <option key={status} value={status}>
            {STATUS_LABELS[status]}
          </option>
        ))}
      </select>
    </span>
  );
}
