"use client";

import { trackEvent } from "@/core/analytics/track";
import { Button } from "@/shared/components/ui/Button/Button";
import { formatCreditValue } from "@/shared/utils/currency";
import { useConsortiumIntent } from "../../state/ConsortiumIntentContext";
import type { CreditPlan } from "../../types";
import styles from "./PlansSection.module.css";

interface ChoosePlanButtonProps {
  plan: CreditPlan;
  label: string;
}

export function ChoosePlanButton({ plan, label }: ChoosePlanButtonProps) {
  const { choosePlan } = useConsortiumIntent();

  return (
    <Button
      className={styles.choose}
      onClick={() => {
        trackEvent("clique_plano", { credito: formatCreditValue(plan.credit) });
        choosePlan(plan.credit);
      }}
    >
      {label}
    </Button>
  );
}
