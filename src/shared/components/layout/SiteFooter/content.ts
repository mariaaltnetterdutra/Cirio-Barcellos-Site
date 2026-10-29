import { ROUTES } from "@/shared/constants/routes";

// Textos copiados do <footer class="footer"> de docs/prototipo-v5.html, adaptados à V1 (página única).
export const SITE_FOOTER_CONTENT = {
  tagline:
    "Assessoria em seguros e consórcios para proteger o que você já conquistou e planejar o que ainda vai realizar.",
  homeLinkLabel: "Círio & Barcellos — voltar ao topo",
  contactTitle: "Contato",
  whatsappLabel: "WhatsApp",
  institutionalTitle: "Institucional",
  cnpjLabel: "CNPJ",
  susepLabel: "Registro SUSEP",
  privacyLink: { label: "Política de Privacidade", href: ROUTES.privacidade },
  cepLabel: "CEP",
} as const;
