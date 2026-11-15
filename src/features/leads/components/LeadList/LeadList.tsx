import { Button } from "@/shared/components/ui/Button/Button";
import { LEADS_CONTENT as CONTENT } from "../../content";
import type { AdminLead, LeadStatus, LeadsPage } from "../../types";
import { LeadItem } from "../LeadItem/LeadItem";
import styles from "./LeadList.module.css";

interface LeadListProps {
  page: LeadsPage | undefined;
  isLoading: boolean;
  hasError: boolean;
  hasActiveFilters: boolean;
  savingProtocol: string | undefined;
  onRetry: () => void;
  onClearFilters: () => void;
  onStatusChange: (lead: AdminLead, status: LeadStatus) => void;
}

export function LeadList({
  page,
  isLoading,
  hasError,
  hasActiveFilters,
  savingProtocol,
  onRetry,
  onClearFilters,
  onStatusChange,
}: LeadListProps) {
  if (!page && !hasError) {
    return (
      <p className={styles.message} role="status">
        {CONTENT.loading}
      </p>
    );
  }

  return (
    <div className={styles.wrapper} aria-busy={isLoading}>
      {hasError && (
        <div className={styles.error} role="alert">
          <p>{CONTENT.loadError}</p>
          <Button variant="ghost" onClick={onRetry}>
            {CONTENT.retry}
          </Button>
        </div>
      )}

      {page?.itens.length === 0 && !hasError && (
        <div className={styles.message}>
          <p>{hasActiveFilters ? CONTENT.emptyFiltered : CONTENT.emptyAll}</p>
          {hasActiveFilters && (
            <Button variant="ghost" onClick={onClearFilters}>
              {CONTENT.clearFilters}
            </Button>
          )}
        </div>
      )}

      {page && page.itens.length > 0 && (
        <ul className={isLoading ? styles.listLoading : styles.list}>
          {page.itens.map((lead) => (
            <LeadItem
              key={lead.protocolo}
              lead={lead}
              isSaving={savingProtocol === lead.protocolo}
              onStatusChange={onStatusChange}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
