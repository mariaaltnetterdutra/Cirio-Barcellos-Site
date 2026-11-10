import { Section } from "@/shared/components/layout/Section/Section";
import { SectionHeading } from "@/shared/components/ui/SectionHeading/SectionHeading";
import { SECTION_IDS } from "@/shared/constants/routes";
import { PLANS_CONTENT as CONTENT } from "../../content";
import { PlanCard } from "./PlanCard";
import { PlansCarousel } from "./PlansCarousel";
import styles from "./PlansSection.module.css";

const TITLE_ID = "planos-titulo";

export function PlansSection() {
  return (
    <Section id={SECTION_IDS.planos} tone="slate" labelledBy={TITLE_ID}>
      <PlansCarousel
        heading={<SectionHeading titleId={TITLE_ID} eyebrow={CONTENT.eyebrow} title={CONTENT.title} />}
        previousLabel={CONTENT.previousLabel}
        nextLabel={CONTENT.nextLabel}
        ofLabel={CONTENT.ofLabel}
      >
        {CONTENT.plans.map((plan) => (
          <PlanCard key={plan.creditInThousands} plan={plan} />
        ))}
      </PlansCarousel>
      <p className={styles.footnote}>{CONTENT.footnote}</p>
    </Section>
  );
}
