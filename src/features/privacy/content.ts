import { COMPANY } from "@/shared/constants/company";

// Texto-base da Política de Privacidade (LGPD). É um ponto de partida: o cliente (e, de preferência,
// um profissional jurídico) precisa revisar antes de a página ir ao ar.
// TODO cliente: prazo de guarda dos dados, nome/contato do encarregado (DPO), e-mail de contato,
// lista real de quem recebe os dados (administradora, hospedagem, e-mail) e ferramentas de medição.

export interface PolicySection {
  id: string;
  title: string;
  paragraphs?: readonly string[];
  items?: readonly string[];
}

export const PRIVACY_CONTENT = {
  title: "Política de Privacidade",
  updatedAt: "11 de novembro de 2026",
  updatedLabel: "Última atualização:",
  reviewNotice:
    "Texto-base a ser revisado pelo cliente antes da publicação definitiva. Os pontos marcados como “a confirmar” dependem de informações da empresa.",
  intro: `Esta política explica como a ${COMPANY.legalName} trata os dados pessoais de quem usa este site, em linha com a Lei Geral de Proteção de Dados (LGPD, Lei nº 13.709/2018).`,
  backToSite: "Voltar para o site",
  sections: [
    {
      id: "quem-somos",
      title: "1. Quem é o responsável pelos seus dados",
      paragraphs: [
        `${COMPANY.legalName}, CNPJ ${COMPANY.cnpj ?? "a confirmar"}, com sede em ${COMPANY.address}${COMPANY.cep ? `, CEP ${COMPANY.cep}` : ""}.`,
        `Para falar sobre seus dados, use o telefone ou WhatsApp ${COMPANY.phoneDisplay}. Encarregado pelo tratamento de dados (DPO): a confirmar.`,
      ],
    },
    {
      id: "dados-coletados",
      title: "2. Quais dados coletamos",
      paragraphs: ["Coletamos apenas o necessário para atender o seu pedido:"],
      items: [
        "Dados que você informa no formulário de simulação: nome, número de WhatsApp, objetivo (imóvel, terreno, construção ou reforma), valor de crédito e prazo de interesse.",
        "Dados de navegação: de onde você chegou ao site (por exemplo, um anúncio ou uma busca) e a página em que enviou o pedido.",
        "Registros de uso do site, como cliques em botões, para entender o que funciona. Esses registros não incluem seu nome nem seu telefone.",
      ],
    },
    {
      id: "o-que-nao-coletamos",
      title: "3. O que não pedimos",
      paragraphs: [
        "O formulário não pede CPF, e-mail, dados bancários nem informações sensíveis. Se algum dado desses for necessário mais adiante, será pedido durante o atendimento, e não por este site.",
      ],
    },
    {
      id: "finalidades",
      title: "4. Para que usamos seus dados",
      items: [
        "Entrar em contato com você, por meio de uma pessoa da nossa equipe, para fazer a simulação e tirar suas dúvidas sobre consórcio.",
        "Saber qual anúncio ou página trouxe cada pedido, para melhorar nossa comunicação.",
        "Cumprir obrigações legais e proteger a empresa em caso de necessidade.",
      ],
    },
    {
      id: "base-legal",
      title: "5. Em que a lei nos autoriza a tratar seus dados",
      paragraphs: [
        "Tratamos seus dados com base no seu consentimento, dado ao enviar o formulário, e na realização de procedimentos preliminares a um possível contrato, a seu pedido. Você pode retirar o consentimento quando quiser (veja o item 9).",
      ],
    },
    {
      id: "compartilhamento",
      title: "6. Com quem compartilhamos",
      paragraphs: [
        "Não vendemos seus dados. Podemos compartilhá-los somente quando necessário para o atendimento: com a administradora do consórcio, se você decidir seguir com uma proposta, e com empresas que prestam serviços de tecnologia ao site (hospedagem, banco de dados e e-mail interno), sob dever de sigilo. Lista completa: a confirmar.",
      ],
    },
    {
      id: "cookies",
      title: "7. Cookies e ferramentas de medição",
      paragraphs: [
        "O site guarda, no seu navegador e só enquanto a aba está aberta, a origem da visita e o resumo do último pedido, para mostrar a confirmação. Quando ativarmos ferramentas de medição, como o Google Tag Manager, o Google Ads ou o Google Analytics, elas podem usar cookies para contar visitas e anúncios. Você pode bloquear ou apagar cookies nas configurações do navegador.",
      ],
    },
    {
      id: "guarda-seguranca",
      title: "8. Por quanto tempo guardamos e como protegemos",
      paragraphs: [
        "Guardamos seus dados pelo tempo necessário para atender o pedido e cumprir obrigações legais; depois, eliminamos ou anonimizamos. Prazo exato: a confirmar.",
        "Adotamos medidas técnicas e administrativas para proteger os dados, como acesso restrito à equipe e conexão protegida.",
      ],
    },
    {
      id: "direitos",
      title: "9. Seus direitos",
      paragraphs: ["Pela LGPD, você pode pedir a qualquer momento:"],
      items: [
        "Confirmação de que tratamos seus dados e acesso a eles.",
        "Correção de dados incompletos ou desatualizados.",
        "Anonimização, bloqueio ou eliminação de dados desnecessários.",
        "Informação sobre com quem compartilhamos seus dados.",
        "Retirada do consentimento e eliminação dos dados tratados com base nele.",
      ],
    },
    {
      id: "como-pedir",
      title: "10. Como falar com a gente sobre isso",
      paragraphs: [
        `Entre em contato pelo WhatsApp ou telefone ${COMPANY.phoneDisplay}, ou pessoalmente em ${COMPANY.address}. Uma pessoa da equipe vai atender o seu pedido.`,
      ],
    },
    {
      id: "mudancas",
      title: "11. Mudanças nesta política",
      paragraphs: [
        "Podemos atualizar este texto. A data da última atualização fica sempre no início da página.",
      ],
    },
  ] satisfies readonly PolicySection[],
} as const;
