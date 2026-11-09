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
  address: "Rua Domingos Martins, 910, Loja 01 — Centro, Canoas/RS",
  phoneDisplay: "(51) 98177-5864",
  whatsappNumber: "5551981775864",
  cnpj: "11.489.173/0001-31",
  susep: "202037462",
  cep: "92310-190",
  foundedYearsLabel: "+20 anos",
  clientsLabel: "+10 mil",
  // TODO: confirmar nota, total e link reais do perfil no Google com o cliente.
  googleReviews: {
    rating: 4.9,
    total: 312,
    url: "https://www.google.com/search?q=C%C3%ADrio+%26+Barcellos+Seguros+Canoas",
  },
};
