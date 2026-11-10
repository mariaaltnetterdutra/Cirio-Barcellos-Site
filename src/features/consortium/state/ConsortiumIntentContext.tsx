"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { SECTION_IDS } from "@/shared/constants/routes";
import { scrollToSection } from "@/shared/utils/scroll";

export interface ConsortiumIntent {
  /** Valor da carta de crédito, em reais, escolhido num cartão de plano. */
  creditValue?: number;
  /** Muda a cada escolha, para o formulário aplicar até um clique repetido no mesmo plano. */
  requestId: number;
}

interface ConsortiumIntentValue {
  intent: ConsortiumIntent;
  /** Leva a pessoa à simulação com o valor do plano já marcado. */
  choosePlan: (creditValue: number) => void;
}

const ConsortiumIntentContext = createContext<ConsortiumIntentValue | null>(null);

export function ConsortiumIntentProvider({ children }: { children: ReactNode }) {
  const [intent, setIntent] = useState<ConsortiumIntent>({ requestId: 0 });

  const choosePlan = useCallback((creditValue: number) => {
    setIntent((current) => ({ creditValue, requestId: current.requestId + 1 }));
    scrollToSection(SECTION_IDS.analise);
  }, []);

  const value = useMemo(() => ({ intent, choosePlan }), [intent, choosePlan]);

  return <ConsortiumIntentContext value={value}>{children}</ConsortiumIntentContext>;
}

export function useConsortiumIntent(): ConsortiumIntentValue {
  const value = useContext(ConsortiumIntentContext);
  if (!value) {
    throw new Error("useConsortiumIntent precisa estar dentro de <ConsortiumIntentProvider>.");
  }
  return value;
}
