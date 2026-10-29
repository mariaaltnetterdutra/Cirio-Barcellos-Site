import { Section } from "@/shared/components/layout/Section/Section";
import { SectionHeading } from "@/shared/components/ui/SectionHeading/SectionHeading";
import { SECTION_IDS } from "@/shared/constants/routes";
import { GOALS_CONTENT as CONTENT } from "../../content";
import { GoalCards } from "./GoalCards";
import styles from "./GoalsSection.module.css";

const TITLE_ID = "objetivos-titulo";

export function GoalsSection() {
  return (
    <Section id={SECTION_IDS.objetivos} labelledBy={TITLE_ID}>
      <SectionHeading titleId={TITLE_ID} eyebrow={CONTENT.eyebrow} title={CONTENT.title} lead={CONTENT.lead} />
      <GoalCards />
      <p className={styles.hint} aria-hidden="true">
        {CONTENT.mobileHint}
      </p>
    </Section>
  );
}
