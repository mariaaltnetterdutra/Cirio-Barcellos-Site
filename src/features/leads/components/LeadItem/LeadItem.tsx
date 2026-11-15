import { GOAL_OPTIONS } from "@/features/consortium/options";
import { ButtonLink } from "@/shared/components/ui/Button/Button";
import { formatWhatsApp } from "@/shared/utils/phone";
import { LEADS_CONTENT as CONTENT } from "../../content";
import type { AdminLead, LeadStatus } from "../../types";
import { buildLeadWhatsAppUrl, formatCredit, formatDateTime, formatTerm } from "../../utils/formatLead";
import { StatusSelect } from "../StatusSelect/StatusSelect";
import styles from "./LeadItem.module.css";
import { OriginDetails } from "./OriginDetails";

interface LeadItemProps {
  lead: AdminLead;
  isSaving: boolean;
  onStatusChange: (lead: AdminLead, status: LeadStatus) => void;
}

function goalLabel(goal: AdminLead["objetivo"]): string {
  return GOAL_OPTIONS.find((option) => option.value === goal)?.label ?? goal;
}

export function LeadItem({ lead, isSaving, onStatusChange }: LeadItemProps) {
  const facts = [
    { label: CONTENT.item.goal, value: goalLabel(lead.objetivo) },
    { label: CONTENT.item.credit, value: formatCredit(lead.valorCredito) },
    { label: CONTENT.item.term, value: formatTerm(lead.prazoMeses) },
  ];

  return (
    <li className={styles.item} data-lead-status={lead.status}>
      <div className={styles.identity}>
        <h2 className={styles.name}>{lead.nome}</h2>
        <p className={styles.protocol}>{lead.protocolo}</p>
        <p className={styles.meta}>
          <time dateTime={lead.criadoEm}>{formatDateTime(lead.criadoEm)}</time>
        </p>
        <p className={styles.meta}>
          {CONTENT.item.responsible}: {lead.responsavel}
        </p>
      </div>

      <div className={styles.details}>
        <dl className={styles.facts}>
          {facts.map(({ label, value }) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
        <OriginDetails origin={lead.origem} />
      </div>

      <div className={styles.actions}>
        <p className={styles.phone}>{formatWhatsApp(lead.whatsapp)}</p>
        <ButtonLink
          variant="whatsapp"
          icon="message"
          className={styles.contact}
          href={buildLeadWhatsAppUrl(lead)}
          target="_blank"
          rel="noopener noreferrer"
        >
          {CONTENT.item.contact}
        </ButtonLink>
        <StatusSelect
          leadName={lead.nome}
          value={lead.status}
          disabled={isSaving}
          onChange={(status) => onStatusChange(lead, status)}
        />
      </div>
    </li>
  );
}
