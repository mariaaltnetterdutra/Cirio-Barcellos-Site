import { COMPANY } from "@/shared/constants/company";
import type {
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
  title: "Conquiste seu imóvel com o Consórcio Porto Bank",
  titleLines: ["Conquiste seu imóvel com", "o Consórcio Porto Bank"],
  lead: "Planejamento e atendimento próximo, do primeiro contato à contemplação.",
  
  benefits: [
    { icon: "shield", label: "Sem juros de financiamento" },
    { icon: "trend", label: "Prazos que cabem no seu plano" },
    { icon: "user", label: "Atendimento feito por pessoas" },
  ] satisfies readonly IconItem[],
  photo: {
    src: "/images/consorcio/predio-topo.jpg",
    alt: "Torre residencial moderna iluminada ao anoitecer",
  },
} as const;

export const TRUST_CONTENT = {
  experience: { value: "+20", label: "anos de mercado" } satisfies StatItem,
  clients: { value: COMPANY.clientsLabel, label: "clientes atendidos pela Círio & Barcellos" } satisfies StatItem,
  google: { label: "no Google", linkLabel: "ver avaliações" },
  partner: { label: "Parceria oficial Consórcio" },
} as const;

export const GOALS_CONTENT = {
  eyebrow: "Seu objetivo",
  title: "O que você quer conquistar?",
  lead: "Escolha seu objetivo. Vamos ajudar você a conhecer as possibilidades.",
  cardLink: "Conhecer minhas opções",
  items: [
    { value: "imovel", icon: "patrimonio", title: "Comprar um imóvel", text: "Casa ou apartamento para morar ou para alugar." },
    { value: "terreno", icon: "map", title: "Comprar um terreno", text: "O primeiro passo para construir do seu jeito." },
    { value: "construir", icon: "build", title: "Construir", text: "Crédito para a obra da casa ou do imóvel comercial." },
    { value: "reformar", icon: "tool", title: "Reformar", text: "Ampliar, modernizar ou valorizar o imóvel que você já tem." },
  ] satisfies readonly GoalCard[],
} as const;

export const PLANS_CONTENT = {
  eyebrow: "Cartas de crédito",
  title: "Sua próxima conquista pode começar aqui",
  creditLabel: "Crédito",
  cta: "Quero conhecer esse crédito",
  photoLabel: "Foto do imóvel",
  previousLabel: "Planos anteriores",
  nextLabel: "Próximos planos",
  ofLabel: "de",
  footnote:
    "Imagens e valores de crédito ilustrativos. Parcelas, prazos e condições conforme o grupo e as regras vigentes do produto.",
  plans: [
    {
      credit: 200_000,
      title: "Seu começo, do seu jeito",
      text: "Conheça as opções para planejar o seu imóvel com a nossa equipe.",
      photo: { src: "/images/consorcio/planos/plano-200.jpg", alt: "Sala de estar com mesa de jantar e varanda com vista da cidade" },
    },
    {
      credit: 300_000,
      title: "A casa que você imagina",
      text: "Veja como planejar a compra com atendimento próximo.",
      photo: { src: "/images/consorcio/planos/plano-300.jpg", alt: "Casa térrea com jardim, palmeira e garagem coberta" },
    },
    {
      credit: 400_000,
      title: "Seu apartamento, no seu tempo",
      text: "Entenda as possibilidades para chegar ao imóvel certo.",
      photo: { src: "/images/consorcio/planos/plano-400.jpg", alt: "Prédio residencial com varandas de vidro ao entardecer" },
    },
    {
      credit: 500_000,
      title: "Mais espaço para viver",
      text: "Conheça as opções para um imóvel maior, com orientação clara.",
      photo: { src: "/images/consorcio/planos/plano-500.jpg", alt: "Sala ampla integrada à cozinha, com vista do pôr do sol" },
    },
    {
      credit: 600_000,
      title: "Espaço e lazer para a família",
      text: "Veja as possibilidades para esse projeto, com acompanhamento.",
      photo: { src: "/images/consorcio/planos/plano-600.jpg", alt: "Piscina com deck de madeira e espaço gourmet" },
    },
  ] satisfies readonly CreditPlan[],
} as const;

export const HOW_IT_WORKS_CONTENT = {
  eyebrow: "Como funciona",
  title: "Dos seus planos ao próximo passo.",
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
  eyebrow: "Quem vai conversar com você",
  title: "Seu projeto começa com uma boa conversa",
  lead: "Conheça quem vai ouvir seus planos, esclarecer suas dúvidas e ajudar você a escolher um consórcio que faça sentido para seu momento.",
  people: [
    {
      name: "Priscila Marques",
      role: "Especialista em Consórcios Porto Bank",
      text: "Quero entender o que você deseja conquistar e ajudar a encontrar um plano que caiba no seu orçamento. Conte comigo para explicar cada etapa com clareza e acompanhar você ao longo dessa jornada.",
      photo: {
        src: "/images/equipe/priscila-marques.jpg",
        alt: "Priscila Marques, especialista em consórcios, sentada em sua mesa no escritório da Círio & Barcellos",
      },
    },
    {
      name: "Vinicius Barcellos Dutra",
      role: "Sócio-diretor | Especialista em Consórcios Porto Bank",
      text: "Meu trabalho é ajudar você a transformar seus objetivos em um planejamento concreto. Com atendimento próximo e orientação clara, ajudo a avaliar as possibilidades para que você escolha com confiança.",
      photo: {
        src: "/images/equipe/vinicius-barcellos.png",
        alt: "Vinicius Barcellos Dutra, sentado no escritório da Círio & Barcellos",
      },
    },
  ] satisfies readonly TeamMember[],
  callToAction: {
    title: "Vamos conversar sobre seus planos?",
    text: "Tire suas dúvidas e conheça as opções para o seu objetivo, sem compromisso.",
    button: "Conversar pelo WhatsApp",
  },
} as const;

export const SIMULATION_CONTENT = {
  title: "Comece a simular o seu consórcio",
  stepLabel: (step: number, total: number) => `Passo ${step} de ${total}`,
  goalQuestion: "O que você quer conquistar?",
  creditQuestion: "Qual valor de crédito você imagina?",
  customCredit: { label: "Digite o valor do crédito (R$)", placeholder: "Ex.: 350.000" },
  customCreditOption: "Outro valor",
  unknownCreditOption: "Ainda não sei",
  termQuestion: "Em quantos meses você quer pagar?",
  termOption: (months: number) => `${months} meses`,
  unknownTermOption: "Quero ajuda",
  next: "Continuar",
  back: "Voltar",
  contactTitle: "Quase lá! Como falamos com você?",
  contactLead: "Uma pessoa da nossa equipe chama você no WhatsApp para fazer a simulação.",
  name: { label: "Seu nome", placeholder: "Como podemos te chamar?" },
  whatsapp: { label: "WhatsApp", placeholder: "(51) 9 0000-0000" },
  submit: "Simular com um especialista",
  submitting: "Enviando…",
  whatsappDirect: "Prefiro falar direto no WhatsApp",
  consentBefore: "Ao enviar o formulário, você concorda com nossa",
  consentLink: "Política de Privacidade",
  errors: {
    choice: "Escolha uma opção.",
    customCredit: "Informe um valor entre R$ 50 mil e R$ 10 milhões.",
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
  summaryLabels: { goal: "Objetivo", credit: "Valor do crédito", term: "Prazo" },
  whatsappCta: "Adiantar pelo WhatsApp",
  backCta: "Voltar ao início",
  whatsappMessage: (protocol: string, name: string) =>
    `Olá! Acabei de enviar um pedido pelo site (protocolo ${protocol}). Meu nome é ${name}.`,
} as const;

export const FAQ_CONTENT = {
  eyebrow: "Dúvidas frequentes",
  title: "Antes de começar, o que você precisa saber.",
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
