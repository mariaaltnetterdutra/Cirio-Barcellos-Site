import type { LeadStatus } from "./types";

export const STATUS_LABELS: Record<LeadStatus, string> = {
  NOVO: "Novo",
  EM_ATENDIMENTO: "Em atendimento",
  PROPOSTA: "Proposta enviada",
  FECHADO: "Fechado",
  PERDIDO: "Perdido",
};

export const LEADS_CONTENT = {
  eyebrow: "Área da equipe",
  title: "Pedidos de simulação",
  refresh: "Atualizar",
  refreshing: "Atualizando…",
  searchLabel: "Buscar por nome, WhatsApp ou protocolo",
  searchPlaceholder: "Ex.: Maria, 51 99999 ou CB-2026",
  goalLabel: "Objetivo",
  allGoals: "Todos os objetivos",
  allStatuses: "Todos",
  statusFilterLabel: "Filtrar por status",
  clearFilters: "Limpar filtros",
  loading: "Carregando pedidos…",
  loadError: "Não foi possível carregar os pedidos agora.",
  retry: "Tentar de novo",
  emptyAll: "Nenhum pedido ainda. Quando alguém enviar o formulário, ele aparece aqui.",
  emptyFiltered: "Nenhum pedido encontrado com esses filtros.",
  statusUpdateError: "Não foi possível salvar o status. Tente de novo.",
  statusSaved: (name: string) => `Status de ${name} atualizado.`,
  statusSelectLabel: (name: string) => `Status do pedido de ${name}`,
  resultCount: (total: number) => (total === 1 ? "1 pedido" : `${total} pedidos`),
  pageOf: (page: number, pages: number) => `Página ${page} de ${pages}`,
  previous: "Anterior",
  next: "Próxima",
  pagination: "Paginação dos pedidos",
  item: {
    goal: "Objetivo",
    credit: "Crédito",
    term: "Prazo",
    responsible: "Responsável",
    contact: "Chamar no WhatsApp",
    undefinedValue: "A definir",
    months: (value: number) => `${value} meses`,
    origin: "Origem do pedido",
    directOrigin: "Acesso direto",
    whatsappMessage: (firstName: string, protocol: string) =>
      `Olá, ${firstName}! Aqui é da Círio & Barcellos. Recebi seu pedido de simulação (protocolo ${protocol}). Podemos conversar?`,
  },
  originLabels: {
    utmSource: "Fonte",
    utmMedium: "Meio",
    utmCampaign: "Campanha",
    utmTerm: "Termo",
    utmContent: "Conteúdo",
    gclid: "Clique em anúncio Google",
    referrer: "Veio de",
    pagina: "Página",
  },
  gclidFound: "Sim",
} as const;

export const PAGE_SIZE = 20;
export const SEARCH_DEBOUNCE_MS = 350;
