import { ImagePlaceholder } from "@/shared/components/media/ImagePlaceholder/ImagePlaceholder";
import { Icon } from "@/shared/components/ui/Icon/Icon";
import { formatCredit } from "@/shared/utils/format";
import { PLANS_CONTENT as CONTENT } from "../../content";
import type { CreditPlan } from "../../types";
import { ChoosePlanButton } from "./ChoosePlanButton";
import styles from "./PlansSection.module.css";

interface PlanCardProps {
  plan: CreditPlan;
}

// Foto do imóvel ao fundo, com um degradê escuro por baixo do texto para manter a leitura.
export function PlanCard({ plan }: PlanCardProps) {
  const credit = formatCredit(plan.creditInThousands);

  return (
    <article className={styles.card}>
      <ImagePlaceholder
        label={`${CONTENT.photoLabel} — ${credit}`}
        aspectRatio="4/5"
        className={styles.photo}
        sizes="(max-width: 560px) 82vw, (max-width: 900px) 50vw, 350px"
      />
      <div className={styles.body}>
        <span className={styles.type}>
          <Icon name="home" size="sm" />
          {CONTENT.typeLabel}
        </span>
        <span className={styles.creditLabel}>{CONTENT.creditLabel}</span>
        <h3 className={styles.credit}>{credit}</h3>
        <ChoosePlanButton plan={plan} label={CONTENT.cta} />
      </div>
    </article>
  );
}
