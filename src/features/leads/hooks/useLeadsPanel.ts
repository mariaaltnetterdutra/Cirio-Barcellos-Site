import { useCallback, useEffect, useState } from "react";
import { ApiError } from "@/core/api/httpClient";
import { useDebouncedValue } from "@/shared/hooks/useDebouncedValue";
import { LEADS_CONTENT as CONTENT, SEARCH_DEBOUNCE_MS } from "../content";
import { fetchLeads, updateLeadStatus } from "../services/adminLeadsService";
import type { AdminLead, LeadStatus, LeadsPage, LeadsQuery } from "../types";

const INITIAL_QUERY: LeadsQuery = { busca: "", pagina: 1 };

interface FetchResult {
  /** Identifica a busca que gerou este resultado; enquanto não bate com a atual, a tela está carregando. */
  key: string;
  page?: LeadsPage;
  failed?: boolean;
}

export interface StatusFeedback {
  kind: "saved" | "error";
  message: string;
}

type FilterChanges = Partial<Pick<LeadsQuery, "busca" | "status" | "objetivo">>;

function isUnauthorized(error: unknown): boolean {
  return error instanceof ApiError && error.kind === "unauthorized";
}

function replaceLead(page: LeadsPage, updated: AdminLead): LeadsPage {
  return { ...page, itens: page.itens.map((lead) => (lead.protocolo === updated.protocolo ? updated : lead)) };
}

interface Options {
  token: string;
  /** Chamado quando a API recusa o token (sessão vencida). */
  onUnauthorized: () => void;
}

export function useLeadsPanel({ token, onUnauthorized }: Options) {
  const [filters, setFilters] = useState<LeadsQuery>(INITIAL_QUERY);
  const [reloadCount, setReloadCount] = useState(0);
  const [result, setResult] = useState<FetchResult>();
  const [savingProtocol, setSavingProtocol] = useState<string>();
  const [feedback, setFeedback] = useState<StatusFeedback>();

  const debouncedSearch = useDebouncedValue(filters.busca, SEARCH_DEBOUNCE_MS);
  const { status, objetivo, pagina } = filters;
  const requestKey = JSON.stringify([debouncedSearch, status, objetivo, pagina, reloadCount]);

  useEffect(() => {
    let isCurrent = true;

    fetchLeads({ busca: debouncedSearch, status, objetivo, pagina }, token)
      .then((page) => {
        if (isCurrent) setResult({ key: requestKey, page });
      })
      .catch((error: unknown) => {
        if (!isCurrent) return;
        if (isUnauthorized(error)) onUnauthorized();
        else setResult((current) => ({ key: requestKey, page: current?.page, failed: true }));
      });

    return () => {
      isCurrent = false;
    };
  }, [debouncedSearch, status, objetivo, pagina, token, requestKey, onUnauthorized]);

  const updateFilters = useCallback((changes: FilterChanges) => {
    setFilters((current) => ({ ...current, ...changes, pagina: 1 }));
  }, []);

  const goToPage = useCallback((next: number) => {
    setFilters((current) => ({ ...current, pagina: next }));
  }, []);

  const clearFilters = useCallback(() => setFilters(INITIAL_QUERY), []);
  const reload = useCallback(() => setReloadCount((count) => count + 1), []);

  const changeStatus = useCallback(
    async (lead: AdminLead, next: LeadStatus) => {
      setSavingProtocol(lead.protocolo);
      setFeedback(undefined);
      try {
        const updated = await updateLeadStatus(lead.protocolo, next, token);
        setResult((current) =>
          current?.page ? { ...current, page: replaceLead(current.page, updated) } : current,
        );
        setFeedback({ kind: "saved", message: CONTENT.statusSaved(lead.nome) });
        // Recarrega para os contadores e o filtro de status refletirem a mudança.
        setReloadCount((count) => count + 1);
      } catch (error) {
        if (isUnauthorized(error)) onUnauthorized();
        else setFeedback({ kind: "error", message: CONTENT.statusUpdateError });
      } finally {
        setSavingProtocol(undefined);
      }
    },
    [token, onUnauthorized],
  );

  return {
    filters,
    page: result?.page,
    isLoading: result?.key !== requestKey,
    hasError: result?.key === requestKey && result.failed === true,
    hasActiveFilters: filters.busca !== "" || status !== undefined || objetivo !== undefined,
    savingProtocol,
    feedback,
    updateFilters,
    goToPage,
    clearFilters,
    reload,
    changeStatus,
  };
}
