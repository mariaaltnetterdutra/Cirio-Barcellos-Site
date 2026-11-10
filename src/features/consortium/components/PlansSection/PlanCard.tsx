import { ImagePlaceholder } from "@/shared/components/media/ImagePlaceholder/ImagePlaceholder";
import { formatCredit } from "@/shared/utils/format";
import { PLANS_CONTENT as CONTENT } from "../../content";
import type { CreditPlan } from "../../types";
import { ChoosePlanButton } from "./ChoosePlanButton";
import styles from "./PlansSection.module.css";

interface PlanCardProps {
  plan: CreditPlan;
}

export function PlanCard({ plan }: PlanCardProps) {
  const credit = formatCredit(plan.creditInThousands);

  return (
    <article className={styles.card}>
      <ImagePlaceholder
        label={`${CONTENT.photoLabel} — ${credit}`}
        src={plan.photo?.src}
        alt={plan.photo?.alt}
        aspectRatio="4/5"
        className={styles.photo}
        sizes="(max-width: 560px) 82vw, (max-width: 900px) 50vw, 350px"
      />
      <div className={styles.body}>
        <h3 className={styles.title}>{plan.title}</h3>
        <p className={styles.text}>{plan.text}</p>
        <span className={styles.creditLabel}>{CONTENT.creditLabel}</span>
        <p className={styles.credit}>{credit}</p>
        <ChoosePlanButton plan={plan} label={CONTENT.cta} />
      </div>
    </article>
  );
}
