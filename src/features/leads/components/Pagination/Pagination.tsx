import { Button } from "@/shared/components/ui/Button/Button";
import { LEADS_CONTENT as CONTENT } from "../../content";
import styles from "./Pagination.module.css";

interface PaginationProps {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}

export function Pagination({ page, totalPages, onChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <nav className={styles.nav} aria-label={CONTENT.pagination}>
      <Button variant="ghost" disabled={page <= 1} onClick={() => onChange(page - 1)}>
        {CONTENT.previous}
      </Button>
      <p className={styles.position} aria-live="polite">
        {CONTENT.pageOf(page, totalPages)}
      </p>
      <Button disabled={page >= totalPages} onClick={() => onChange(page + 1)}>
        {CONTENT.next}
      </Button>
    </nav>
  );
}
