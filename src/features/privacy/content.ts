import { COMPANY } from "@/shared/constants/company";

// Texto-base e genérico da Política de Privacidade (LGPD), curto para caber em uma página.
// O cliente (e, de preferência, um profissional jurídico) precisa revisar antes de a página ir ao ar.
// TODO cliente: prazo de guarda dos dados, encarregado (DPO), e-mail de contato e ferramentas de medição reais.

export interface PolicySection {
  id: string;
  title: string;
  paragraphs: readonly string[];
}

export const PRIVACY_CONTENT = {
  title: "Política de Privacidade",
  updatedAt: "11 de novembro de 2026",
  updatedLabel: "Última atualização:",
  reviewNotice: "Texto-base a ser revisado pelo cliente antes da publicação definitiva.",
  intro: `Explicamos aqui como a ${COMPANY.legalName} (CNPJ ${COMPANY.cnpj ?? "a confirmar"}, ${COMPANY.address}) trata os dados pessoais de quem usa este site, conforme a Lei Geral de Proteção de Dados (LGPD, Lei nº 13.709/2018).`,
  backToSite: "Voltar para o site",
  sections: [
    {
      id: "dados-coletados",
      title: "1. Dados que coletamos",
      paragraphs: [
        "Os que você informa no formulário (nome, WhatsApp, objetivo, valor de crédito e prazo de interesse) e dados de navegação, como a origem da visita (anúncio ou busca) e cliques no site, sem nome nem telefone. Não pedimos CPF, e-mail, dados bancários nem dados sensíveis.",
      ],
    },
    {
      id: "finalidades",
      title: "2. Para que usamos",
      paragraphs: [
        "Para uma pessoa da nossa equipe falar com você sobre a simulação e o atendimento, entender qual anúncio trouxe cada pedido, melhorar o site e cumprir obrigações legais.",
      ],
    },
    {
      id: "base-legal",
      title: "3. Base legal",
      paragraphs: [
        "Seu consentimento, dado ao enviar o formulário, e procedimentos preliminares a um possível contrato, a seu pedido. Você pode retirar o consentimento quando quiser.",
      ],
    },
    {
      id: "compartilhamento",
      title: "4. Compartilhamento",
      paragraphs: [
        "Não vendemos seus dados. Só os compartilhamos quando necessário para o atendimento, com a administradora do consórcio (se você seguir com uma proposta) e com prestadores de tecnologia do site, sob dever de sigilo.",
      ],
    },
    {
      id: "cookies",
      title: "5. Cookies e medição",
      paragraphs: [
        "O navegador guarda, só com a aba aberta, a origem da visita e o resumo do último pedido. Ferramentas de medição, como Google Tag Manager, Ads e Analytics, podem usar cookies; você pode bloqueá-los nas configurações do navegador.",
      ],
    },
    {
      id: "guarda-seguranca",
      title: "6. Guarda e segurança",
      paragraphs: [
        "Guardamos os dados pelo tempo necessário ao atendimento e às obrigações legais e depois os eliminamos ou anonimizamos. Usamos medidas técnicas e administrativas de proteção, como acesso restrito à equipe.",
      ],
    },
    {
      id: "direitos",
      title: "7. Seus direitos",
      paragraphs: [
        "Você pode pedir confirmação e acesso aos seus dados, correção, anonimização, bloqueio ou eliminação, informação sobre compartilhamento e retirada do consentimento.",
      ],
    },
    {
      id: "contato",
      title: "8. Contato e mudanças",
      paragraphs: [
        `Para exercer seus direitos, fale conosco pelo WhatsApp ou telefone ${COMPANY.phoneDisplay} ou pessoalmente no endereço acima. Podemos atualizar este texto; a data da última atualização fica no início da página.`,
      ],
    },
  ] satisfies readonly PolicySection[],
} as const;
