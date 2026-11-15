"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { SECTION_IDS } from "@/shared/constants/routes";
import { scrollToSection } from "@/shared/utils/scroll";
import type { ConsortiumGoal } from "../types";

export interface ConsortiumIntent {
  goal?: ConsortiumGoal;
  creditValue?: number;
  requestId: number;
}

interface ConsortiumIntentValue {
  intent: ConsortiumIntent;
  chooseGoal: (goal: ConsortiumGoal) => void;
  choosePlan: (creditValue: number) => void;
}

const ConsortiumIntentContext = createContext<ConsortiumIntentValue | null>(null);

export function ConsortiumIntentProvider({ children }: { children: ReactNode }) {
  const [intent, setIntent] = useState<ConsortiumIntent>({ requestId: 0 });

  // Cada clique começa uma seleção nova: vale só o que a pessoa clicou agora, sem herdar o valor de antes.
  const chooseGoal = useCallback((goal: ConsortiumGoal) => {
    setIntent((current) => ({ goal, requestId: current.requestId + 1 }));
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
