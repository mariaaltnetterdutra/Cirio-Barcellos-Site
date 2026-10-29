"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { SECTION_IDS } from "@/shared/constants/routes";
import type { BudgetRange, ConsortiumGoal } from "../types";

/** Respostas escolhidas fora do formulário (cards de objetivo e planos). */
export interface ConsortiumIntent {
  goal?: ConsortiumGoal;
  budget?: BudgetRange;
  /** Muda a cada escolha, para o formulário aplicar até um clique repetido no mesmo card. */
  requestId: number;
}

interface ConsortiumIntentValue {
  intent: ConsortiumIntent;
  chooseGoal: (goal: ConsortiumGoal) => void;
  /** Um plano é sempre de imóvel: marca o objetivo "imovel" e a faixa de valor do plano. */
  choosePlan: (budget: BudgetRange) => void;
}

const ConsortiumIntentContext = createContext<ConsortiumIntentValue | null>(null);

const PLAN_GOAL: ConsortiumGoal = "imovel";

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

// Leva a pessoa até o formulário e move o foco para lá (quem usa teclado ou leitor de tela
// continua de onde a tela está).
function goToLeadForm(): void {
  const form = document.getElementById(SECTION_IDS.analise);
  if (!form) return;
  form.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" });
  form.focus({ preventScroll: true });
}

export function ConsortiumIntentProvider({ children }: { children: ReactNode }) {
  const [intent, setIntent] = useState<ConsortiumIntent>({ requestId: 0 });

  const chooseGoal = useCallback((goal: ConsortiumGoal) => {
    setIntent((current) => ({ goal, budget: current.budget, requestId: current.requestId + 1 }));
    goToLeadForm();
  }, []);

  const choosePlan = useCallback((budget: BudgetRange) => {
    setIntent((current) => ({ goal: PLAN_GOAL, budget, requestId: current.requestId + 1 }));
    goToLeadForm();
  }, []);

  const value = useMemo(() => ({ intent, chooseGoal, choosePlan }), [intent, chooseGoal, choosePlan]);

  return <ConsortiumIntentContext value={value}>{children}</ConsortiumIntentContext>;
}

export function useConsortiumIntent(): ConsortiumIntentValue {
  const value = useContext(ConsortiumIntentContext);
  if (!value) {
    throw new Error("useConsortiumIntent precisa estar dentro de <ConsortiumIntentProvider>.");
  }
  return value;
}
