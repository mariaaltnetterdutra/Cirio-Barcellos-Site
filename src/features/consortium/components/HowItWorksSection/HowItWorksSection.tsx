import { Section } from "@/shared/components/layout/Section/Section";
import { SectionHeading } from "@/shared/components/ui/SectionHeading/SectionHeading";
import { SECTION_IDS } from "@/shared/constants/routes";
import { HOW_IT_WORKS_CONTENT as CONTENT } from "../../content";
import styles from "./HowItWorksSection.module.css";

const TITLE_ID = "como-funciona-titulo";

export function HowItWorksSection() {
  return (
    <Section id={SECTION_IDS.comoFunciona} tone="muted" labelledBy={TITLE_ID}>
      <SectionHeading titleId={TITLE_ID} eyebrow={CONTENT.eyebrow} title={CONTENT.title} />
      <ol className={styles.steps}>
        {CONTENT.steps.map((step) => (
          <li key={step.number} className={styles.step}>
            <span className={styles.number} aria-hidden="true">
              {step.number}
            </span>
            <h3 className={styles.title}>{step.title}</h3>
            <p className={styles.text}>{step.text}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
