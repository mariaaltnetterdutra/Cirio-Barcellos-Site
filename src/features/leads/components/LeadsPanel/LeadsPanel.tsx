"use client";

import { Button } from "@/shared/components/ui/Button/Button";
import { Eyebrow } from "@/shared/components/ui/Eyebrow/Eyebrow";
import { cn } from "@/shared/utils/cn";
import { LEADS_CONTENT as CONTENT } from "../../content";
import { useLeadsPanel } from "../../hooks/useLeadsPanel";
import { LeadList } from "../LeadList/LeadList";
import { LeadsFilters } from "../LeadsFilters/LeadsFilters";
import { Pagination } from "../Pagination/Pagination";
import { StatusSummary } from "../StatusSummary/StatusSummary";
import styles from "./LeadsPanel.module.css";

const TITLE_ID = "pedidos-titulo";

interface LeadsPanelProps {
  token: string;
  onUnauthorized: () => void;
}

export function LeadsPanel({ token, onUnauthorized }: LeadsPanelProps) {
  const panel = useLeadsPanel({ token, onUnauthorized });
  const { page, filters, feedback } = panel;

  return (
    <section aria-labelledby={TITLE_ID}>
      <div className={cn("tone-slate", styles.band)}>
        <div className={styles.inner}>
          <div className={styles.top}>
            <div>
              <Eyebrow>{CONTENT.eyebrow}</Eyebrow>
              <h1 id={TITLE_ID} className={styles.title}>
                {CONTENT.title}
              </h1>
              {page && <p className={styles.count}>{CONTENT.resultCount(page.total)}</p>}
            </div>
            <Button variant="ghost-inverse" aria-busy={panel.isLoading} onClick={panel.reload}>
              {panel.isLoading ? CONTENT.refreshing : CONTENT.refresh}
            </Button>
          </div>

          {page && (
            <StatusSummary
              summary={page.resumo}
              selected={filters.status}
              onSelect={(status) => panel.updateFilters({ status })}
            />
          )}
        </div>
      </div>

      <div className={cn(styles.inner, styles.body)}>
        <LeadsFilters
          search={filters.busca}
          goal={filters.objetivo}
          hasActiveFilters={panel.hasActiveFilters}
          onSearchChange={(busca) => panel.updateFilters({ busca })}
          onGoalChange={(objetivo) => panel.updateFilters({ objetivo })}
          onClear={panel.clearFilters}
        />

        <p className={feedback?.kind === "error" ? styles.feedbackError : styles.feedback} role="status">
          {feedback?.message}
        </p>

        <LeadList
          page={page}
          isLoading={panel.isLoading}
          hasError={panel.hasError}
          hasActiveFilters={panel.hasActiveFilters}
          savingProtocol={panel.savingProtocol}
          onRetry={panel.reload}
          onClearFilters={panel.clearFilters}
          onStatusChange={panel.changeStatus}
        />

        {page && <Pagination page={page.pagina} totalPages={page.totalPaginas} onChange={panel.goToPage} />}
      </div>
    </section>
  );
}
