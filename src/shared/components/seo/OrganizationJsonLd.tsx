import { env } from "@/core/config/env";
import { COMPANY } from "@/shared/constants/company";
import { SITE_METADATA } from "@/shared/constants/site";

// Dados estruturados para o Google entender quem é a empresa. Só usa dados já confirmados em COMPANY.
// Sem nota do Google aqui: avaliação própria no site não vale como estrela no resultado de busca.
const structuredData = {
  "@context": "https://schema.org",
  "@type": "InsuranceAgency",
  name: COMPANY.legalName,
  alternateName: COMPANY.name,
  description: SITE_METADATA.description,
  url: env.siteUrl,
  logo: `${env.siteUrl}/brand/logo-nome.png`,
  telephone: `+${COMPANY.whatsappNumber}`,
  ...(COMPANY.cnpj ? { taxID: COMPANY.cnpj } : {}),
  address: {
    "@type": "PostalAddress",
    streetAddress: "Rua Domingos Martins, 910, Loja 01",
    addressLocality: "Canoas",
    addressRegion: "RS",
    addressCountry: "BR",
    ...(COMPANY.cep ? { postalCode: COMPANY.cep } : {}),
  },
};

const serialized = JSON.stringify(structuredData).replace(/</g, "\\u003c");

export function OrganizationJsonLd() {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serialized }} />;
}
