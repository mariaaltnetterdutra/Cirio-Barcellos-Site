import { COMPANY } from "@/shared/constants/company";
import type {
  CallToAction,
  CreditPlan,
  FaqItem,
  GoalCard,
  IconItem,
  StatItem,
  Step,
  TeamMember,
} from "./types";

export const HERO_CONTENT = {
  partnerCaption: "Consórcio imobiliário Porto Bank",
  title: "Seu próximo imóvel pode começar com planejamento.",
  lead: "Compra de imóvel, terreno, construção ou reforma com uma estratégia pensada para o seu objetivo, o seu prazo e o seu orçamento.",
  primaryCta: { label: "Quero analisar meu projeto" } satisfies CallToAction,
  secondaryCta: { label: "Falar com uma especialista" } satisfies CallToAction,
  photo: {
    src: "/images/consorcio/predio-topo.jpg",
    alt: "Torre residencial moderna iluminada ao anoitecer",
  },
} as const;

export const TRUST_CONTENT = {
  experience: { value: "+20", label: "anos de mercado" } satisfies StatItem,
  clients: { value: COMPANY.clientsLabel, label: "clientes atendidos" } satisfies StatItem,
  google: { label: "no Google", linkLabel: "ver avaliações" },
  partner: { label: "Parceria oficial Consórcio" },
} as const;

export const GOALS_CONTENT = {
  eyebrow: "Qual é o seu objetivo?",
  title: "Qual é o seu próximo passo?",
  lead: "Escolha uma opção e ela já vem marcada no formulário de análise.",
  mobileHint: "Deslize para ver todas as opções →",
  cardLink: "Analisar este projeto",
  items: [
    { value: "imovel", icon: "patrimonio", title: "Comprar um imóvel", text: "Casa ou apartamento para morar ou para alugar." },
    { value: "terreno", icon: "map", title: "Comprar um terreno", text: "O primeiro passo para construir do seu jeito." },
    { value: "construir", icon: "build", title: "Construir", text: "Crédito para a obra da casa ou do imóvel comercial." },
    { value: "reformar", icon: "tool", title: "Reformar", text: "Ampliar, modernizar ou valorizar o imóvel que você já tem." },
  ] satisfies readonly GoalCard[],
} as const;

export const PLANS_CONTENT = {
  eyebrow: "Cartas de crédito",
  title: "Conheça alguns dos nossos planos.",
  typeLabel: "Imóvel",
  creditLabel: "Crédito",
  cta: "Quero este plano",
  photoLabel: "Foto do imóvel",
  previousLabel: "Planos anteriores",
  nextLabel: "Próximos planos",
  footnote:
    "Valores de crédito ilustrativos. Parcelas, prazos e condições conforme o grupo e as regras vigentes do produto.",
  plans: [
    {
      creditInThousands: 200,
      budget: "100a300",
      photo: { src: "/images/consorcio/planos/plano-200.jpg", alt: "Sala de estar com mesa de jantar e varanda com vista da cidade" },
    },
    {
      creditInThousands: 300,
      budget: "100a300",
      photo: { src: "/images/consorcio/planos/plano-300.jpg", alt: "Casa térrea com jardim, palmeira e garagem coberta" },
    },
    {
      creditInThousands: 400,
      budget: "300a500",
      photo: { src: "/images/consorcio/planos/plano-400.jpg", alt: "Prédio residencial com varandas de vidro ao entardecer" },
    },
    {
      creditInThousands: 500,
      budget: "300a500",
      photo: { src: "/images/consorcio/planos/plano-500.jpg", alt: "Sala ampla integrada à cozinha, com vista do pôr do sol" },
    },
    {
      creditInThousands: 600,
      budget: "500a1m",
      photo: { src: "/images/consorcio/planos/plano-600.jpg", alt: "Piscina com deck de madeira e espaço gourmet" },
    },
  ] satisfies readonly CreditPlan[],
} as const;

export const HOW_IT_WORKS_CONTENT = {
  eyebrow: "Como funciona",
  title: "Do projeto à estratégia.",
  steps: [
    { number: "01", title: "Entendemos o seu projeto", text: "Conversamos sobre o que você quer comprar, construir ou reformar e em quanto tempo." },
    { number: "02", title: "Analisamos valor e prazo", text: "Definimos o crédito e a parcela que cabem no seu orçamento, sem apertar o mês." },
    { number: "03", title: "Montamos a estratégia", text: "Simulação, possibilidade de lance e o melhor grupo para o seu objetivo." },
    { number: "04", title: "Acompanhamos até o fim", text: "Seguimos com você nas assembleias, na contemplação e no uso do crédito." },
  ] satisfies readonly Step[],
} as const;

export const PORTO_BANK_CONTENT = {
  eyebrow: "Consórcio Porto Bank",
  title: "A solidez da Porto com o acompanhamento da Círio & Barcellos.",
  lead: "Você conta com a estrutura de uma das maiores empresas do mercado e com uma equipe próxima, que conhece o seu projeto pelo nome.",
  items: [
    { icon: "patrimonio", label: "Imóveis" },
    { icon: "build", label: "Construção e reforma*" },
    { icon: "map", label: "Terrenos" },
    { icon: "trend", label: "Planejamento patrimonial" },
  ] satisfies readonly IconItem[],
  footnote: "*Conforme as regras do grupo e da utilização do crédito.",
} as const;

export const SPECIALIST_CONTENT = {
  eyebrow: "Sua equipe",
  title: "Quem vai conversar com você.",
  lead: "Do primeiro contato até o uso do crédito, quem atende é sempre uma pessoa da equipe.",
  people: [
    {
      name: "Priscila Marques",
      role: "Especialista em consórcio",
      text: "Entende o seu projeto antes de falar em números e acompanha o seu consórcio de perto, do primeiro contato até o fim.",
      photo: {
        src: "/images/equipe/priscila-marques.jpg",
        alt: "Priscila Marques, especialista em consórcio, sentada em sua mesa no escritório da Círio & Barcellos",
      },
    },
    {
      name: "Vinicius Barcellos Dutra",
      role: "Co-fundador · Formação em Administração",
      text: "Profissional com mais de 20 anos de experiência como corretor de seguros na Círio & Barcellos. Acompanha os atendimentos junto com a Priscila.",
      photo: {
        src: "/images/equipe/vinicius-barcellos.png",
        alt: "Vinicius Barcellos Dutra, sentado no escritório da Círio & Barcellos",
      },
    },
  ] satisfies readonly TeamMember[],
  cta: { label: "Falar com a Priscila" } satisfies CallToAction,
  whatsappMessage: "Olá, Priscila! Vim pelo site e quero conversar sobre consórcio imobiliário.",
} as const;

export const LEAD_FORM_CONTENT = {
  eyebrow: "Análise do seu projeto",
  title: "Conte qual é o seu projeto.",
  lead: "Com essas respostas, a nossa especialista prepara uma análise antes de entrar em contato com você.",
  bullets: [
    "Perguntas de marcar, leva menos de 1 minuto",
    "Não pedimos CPF, endereço nem email",
    "Quem responde é sempre uma pessoa da equipe",
  ],
  goalQuestion: "Qual é o seu objetivo?",
  otherGoal: { label: "Conte em poucas palavras (opcional)", placeholder: "Ex.: comprar uma sala comercial", maxLength: 80 },
  budgetQuestion: "Qual o valor aproximado do seu projeto?",
  timeframeQuestion: "Em quanto tempo você pretende realizar?",
  name: { label: "Seu nome", placeholder: "Como podemos te chamar?" },
  whatsapp: { label: "WhatsApp", placeholder: "(51) 9 0000-0000" },
  submit: "Quero analisar meu projeto",
  submitting: "Enviando…",
  consentBefore:
    "Ao enviar seus dados, você concorda em ser contatado pela Círio & Barcellos para atendimento relacionado ao seu interesse. Consulte nossa",
  consentLink: "Política de Privacidade",
  errors: {
    choice: "Escolha uma opção.",
    name: "Informe seu nome.",
    whatsapp: "Informe um WhatsApp com DDD.",
    submit: "Não conseguimos enviar agora. Tente de novo em instantes ou fale com a gente pelo WhatsApp.",
    tooManyRequests: "Você enviou vários pedidos seguidos. Aguarde um minuto e tente de novo.",
  },
} as const;

export const CONFIRMATION_CONTENT = {
  title: "Recebemos o seu pedido.",
  textWithName: (firstName: string, whatsapp: string) =>
    `Obrigado, ${firstName}. A nossa especialista em consórcio vai analisar o seu projeto e falar com você pelo WhatsApp ${whatsapp} em horário comercial.`,
  genericText:
    "A nossa especialista em consórcio vai analisar o seu projeto e falar com você pelo WhatsApp em horário comercial.",
  protocolLabel: "Protocolo",
  summaryLabels: { goal: "Objetivo", budget: "Valor aproximado", timeframe: "Prazo" },
  whatsappCta: "Adiantar pelo WhatsApp",
  backCta: "Voltar ao início",
  whatsappMessage: (protocol: string, name: string) =>
    `Olá! Acabei de enviar um pedido pelo site (protocolo ${protocol}). Meu nome é ${name}.`,
} as const;

export const FAQ_CONTENT = {
  eyebrow: "Dúvidas frequentes",
  title: "Antes de começar, o que você precisa saber.",
  // TODO: respostas a revisar com o cliente.
  items: [
    { question: "O que é consórcio?", answer: "É uma forma de compra planejada em grupo. Os participantes pagam parcelas mensais e, a cada mês, parte do grupo é contemplada com uma carta de crédito para usar na compra do bem." },
    { question: "Consórcio tem juros?", answer: "Não há juros como em um financiamento. Existem a taxa de administração e o fundo de reserva, além de possíveis seguros, que apresentamos de forma clara antes de qualquer decisão." },
    { question: "Como funciona a contemplação?", answer: "A contemplação acontece por sorteio ou por lance, nas assembleias do grupo, conforme as regras previstas em contrato." },
    { question: "O que é lance?", answer: "É uma antecipação de parcelas que aumenta as chances de contemplação. Ajudamos a planejar se o lance faz sentido no seu caso e de quanto ele poderia ser." },
    { question: "Em quanto tempo vou ser contemplado?", answer: "Não existe prazo garantido. A contemplação depende de sorteio ou lance e das regras do grupo. Por isso, trabalhamos com planejamento, e não com promessas." },
    { question: "Posso usar o crédito para construir ou reformar?", answer: "Em muitos casos, sim, conforme as regras do grupo e da utilização do crédito. Avaliamos o seu projeto antes de indicar o melhor caminho." },
    { question: "Posso comprar um terreno?", answer: "Sim, quando o grupo e as condições do produto permitem. Essa é uma das primeiras coisas que verificamos na análise." },
    { question: "Posso usar o FGTS?", answer: "Em consórcios imobiliários, o FGTS pode ser usado em algumas situações previstas nas regras vigentes. Analisamos a sua situação individualmente." },
    { question: "Qual a diferença entre consórcio e financiamento?", answer: "No financiamento você recebe o bem antes e paga juros sobre o valor. No consórcio não há juros, mas o crédito é liberado na contemplação. Cada caminho faz sentido para um momento diferente." },
    { question: "Posso antecipar ou quitar as parcelas?", answer: "Sim. É possível ofertar lances ou antecipar parcelas, conforme as regras do grupo." },
    { question: "E se eu precisar parar de pagar?", answer: "Existem regras específicas para cancelamento e devolução de valores, previstas em contrato. Explicamos tudo antes da contratação." },
    { question: "Consórcio serve como investimento?", answer: "Pode fazer parte de um planejamento patrimonial, por exemplo para comprar imóveis que geram renda. Conversamos sobre isso com base nos seus objetivos, sem promessas de retorno." },
    { question: "Por que fazer o consórcio com a Círio & Barcellos?", answer: "Porque começamos pelo seu projeto. São mais de 20 anos de experiência, atendimento feito sempre por pessoas e acompanhamento do primeiro contato até o uso do crédito." },
  ] satisfies readonly FaqItem[],
} as const;

export const FLOATING_ACTIONS_CONTENT = {
  formLabel: "Analisar meu projeto",
  whatsappLabel: "Falar com uma especialista pelo WhatsApp",
} as const;

export const SPECIALIST_WHATSAPP_MESSAGE =
  "Olá! Vim pelo site e quero falar com uma especialista em consórcio imobiliário.";
