export interface GoogleReviewsSummary {
  rating: number;
  total: number;
  url: string;
}

export interface Company {
  name: string;
  legalName: string;
  city: string;
  address: string;
  phoneDisplay: string;
  /** Formato internacional, só dígitos, para links wa.me. */
  whatsappNumber: string;
  cnpj: string | null;
  susep: string | null;
  cep: string | null;
  foundedYearsLabel: string;
  clientsLabel: string;
  googleReviews: GoogleReviewsSummary;
}

export const COMPANY: Company = {
  name: "Círio & Barcellos Seguros",
  legalName: "Círio & Barcellos Assessoria e Seguros",
  city: "Canoas/RS",
  address: "Av. Gonçalves Dias, 67 — Canoas/RS",
  phoneDisplay: "(51) 98177-5864",
  whatsappNumber: "5551981775864",
  cnpj: null, // TODO: confirmar com o cliente
  susep: null, // TODO: confirmar com o cliente
  cep: null, // TODO: confirmar com o cliente
  foundedYearsLabel: "+20 anos",
  clientsLabel: "+10 mil",
  // TODO: confirmar nota, total e link reais do perfil no Google com o cliente.
  googleReviews: {
    rating: 4.9,
    total: 312,
    url: "https://www.google.com/search?q=C%C3%ADrio+%26+Barcellos+Seguros+Canoas",
  },
};
