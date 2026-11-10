"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { SECTION_IDS } from "@/shared/constants/routes";
import { scrollToSection } from "@/shared/utils/scroll";
import type { ConsortiumGoal } from "../types";

export interface ConsortiumIntent {
  goal?: ConsortiumGoal;
  /** Valor da carta de crédito, em reais, escolhido num cartão de plano. */
  creditValue?: number;
  /** Muda a cada escolha, para a simulação aplicar até um clique repetido no mesmo cartão. */
  requestId: number;
}

interface ConsortiumIntentValue {
  intent: ConsortiumIntent;
  /** Leva a pessoa à simulação com o objetivo já marcado. */
  chooseGoal: (goal: ConsortiumGoal) => void;
  /** Um plano é sempre de imóvel: leva à simulação com o objetivo e o valor já marcados. */
  choosePlan: (creditValue: number) => void;
}

const ConsortiumIntentContext = createContext<ConsortiumIntentValue | null>(null);

export function ConsortiumIntentProvider({ children }: { children: ReactNode }) {
  const [intent, setIntent] = useState<ConsortiumIntent>({ requestId: 0 });

  const chooseGoal = useCallback((goal: ConsortiumGoal) => {
    setIntent((current) => ({ goal, creditValue: current.creditValue, requestId: current.requestId + 1 }));
    scrollToSection(SECTION_IDS.analise);
  }, []);

  const choosePlan = useCallback((creditValue: number) => {
    setIntent((current) => ({ goal: "imovel", creditValue, requestId: current.requestId + 1 }));
    scrollToSection(SECTION_IDS.analise);
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
