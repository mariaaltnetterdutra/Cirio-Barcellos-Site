import type { IconName } from "@/shared/components/ui/Icon/Icon";
import type { BUDGET_OPTIONS, GOAL_OPTIONS, TIMEFRAME_OPTIONS } from "./options";

// Derivados das listas de opções: um valor novo na lista já vira um tipo válido.
export type ConsortiumGoal = (typeof GOAL_OPTIONS)[number]["value"];
export type BudgetRange = (typeof BUDGET_OPTIONS)[number]["value"];
export type Timeframe = (typeof TIMEFRAME_OPTIONS)[number]["value"];

export interface CallToAction {
  label: string;
}

export interface StatItem {
  value: string;
  label: string;
}

export interface GoalCard {
  value: Extract<ConsortiumGoal, "imovel" | "terreno" | "construir" | "reformar">;
  icon: IconName;
  title: string;
  text: string;
}

export interface CreditPlan {
  /** Valor da carta de crédito, em milhares de reais. */
  creditInThousands: number;
  /** Faixa de valor que o plano marca no formulário. */
  budget: BudgetRange;
  /** Foto do imóvel em /public (enquanto não houver, aparece o espaço reservado). */
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
