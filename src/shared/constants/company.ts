/** Código do Brasil, que antecede o DDD nos links do WhatsApp. */
export const COMPANY_COUNTRY_CODE = "55";

export interface GoogleReviewsSummary {
  rating: number;
  url: string;
}

export interface Company {
  name: string;
  legalName: string;
  city: string;
  address: string;
  phoneDisplay: string;
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
  googleReviews: {
    rating: 5,
    url: "https://www.google.com/searchviewer/10?output=search&svid=CCYSGioYOhYweDA6MHhjOTE4NDYzYThmMzhmNmVmGAo&hl=pt&gl=BR#sv=CAESzQEKuQEStgEKd0FERGJXZWJxUmdadnBpRHlKUzdSUXpIUkY0LUxnVjlDZ3lKSVpRUXYzb2xBTm1nR3c3MG9Wd1FZYmtaWUh0R19EV291dHgtNVZBQUQ2bEg5endfSVNjQVFETFhXaTBTYmFFemtqaHBHOXlRX2lMV05rX3E1QVdnEhduRXJ6YXJPNkU2Zlgxc1FQck5ISHFRcxoiQUhOMEU3RlBwZzE1THVlUm1nTTQwQ2QtSVhZSlpQYjk0ZxIEODA1MRoBMyoAMAA4AUAAGAAgjaLi5QFKAhAB",
  },
};
