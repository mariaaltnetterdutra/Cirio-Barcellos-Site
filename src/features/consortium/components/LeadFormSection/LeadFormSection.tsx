import { Section } from "@/shared/components/layout/Section/Section";
import { Icon } from "@/shared/components/ui/Icon/Icon";
import { SectionHeading } from "@/shared/components/ui/SectionHeading/SectionHeading";
import { SECTION_IDS } from "@/shared/constants/routes";
import { LEAD_FORM_CONTENT as CONTENT } from "../../content";
import { LeadForm } from "./LeadForm";
import styles from "./LeadFormSection.module.css";

const TITLE_ID = "analise-titulo";

// tabIndex -1: o clique num objetivo ou plano rola até aqui e leva o foco junto.
export function LeadFormSection() {
  return (
    <Section id={SECTION_IDS.analise} tone="slate" labelledBy={TITLE_ID} tabIndex={-1}>
      <div className={styles.grid}>
        <div className={styles.aside}>
          <SectionHeading
            titleId={TITLE_ID}
            eyebrow={CONTENT.eyebrow}
            title={CONTENT.title}
            lead={CONTENT.lead}
          />
          <ul className={styles.bullets}>
            {CONTENT.bullets.map((bullet) => (
              <li key={bullet} className={styles.bullet}>
                <Icon name="check" size="sm" className={styles.check} />
                {bullet}
              </li>
            ))}
          </ul>
        </div>
        <LeadForm />
      </div>
    </Section>
  );
}
