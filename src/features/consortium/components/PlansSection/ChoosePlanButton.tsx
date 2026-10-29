"use client";

import { trackEvent } from "@/core/analytics/track";
import { Button } from "@/shared/components/ui/Button/Button";
import { formatCredit } from "@/shared/utils/format";
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
        trackEvent("clique_plano", { credito: formatCredit(plan.creditInThousands) });
        choosePlan(plan.budget);
      }}
    >
      {label}
    </Button>
  );
}
