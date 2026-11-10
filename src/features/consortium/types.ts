import type { IconName } from "@/shared/components/ui/Icon/Icon";
import type { GOAL_OPTIONS } from "./options";

// Derivado da lista de opções: um objetivo novo na lista já vira um tipo válido.
export type ConsortiumGoal = (typeof GOAL_OPTIONS)[number]["value"];

export interface StatItem {
  value: string;
  label: string;
}

export interface GoalCard {
  value: ConsortiumGoal;
  icon: IconName;
  title: string;
  text: string;
}

export interface CreditPlan {
  /** Valor da carta de crédito, em reais. */
  credit: number;
  /** Chamada curta e frase do cartão: falam da possibilidade, sem prometer condições. */
  title: string;
  text: string;
  photo?: { src: string; alt: string };
}

export interface Step {
  number: string;
  title: string;
  text: string;
}

export interface IconItem {
  icon: IconName;
  label: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface TeamMember {
  name: string;
  role: string;
  text: string;
  photo: { src: string; alt: string };
}
