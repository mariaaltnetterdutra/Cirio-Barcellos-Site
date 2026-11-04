import { Section } from "@/shared/components/layout/Section/Section";
import { ButtonLink } from "@/shared/components/ui/Button/Button";
import { SectionHeading } from "@/shared/components/ui/SectionHeading/SectionHeading";
import { SECTION_IDS, sectionHref } from "@/shared/constants/routes";
import { buildWhatsAppUrl } from "@/shared/utils/whatsapp";
import { FINAL_CTA_CONTENT as CONTENT, SPECIALIST_WHATSAPP_MESSAGE } from "../../content";
import styles from "./FinalCtaSection.module.css";

const TITLE_ID = "chamada-final-titulo";

export function FinalCtaSection() {
  return (
    <Section tone="slate" width="narrow" labelledBy={TITLE_ID}>
      <SectionHeading titleId={TITLE_ID} title={CONTENT.title} lead={CONTENT.lead} align="center" />
      <div className={styles.actions}>
        <ButtonLink href={sectionHref(SECTION_IDS.analise)}>{CONTENT.primaryCta.label}</ButtonLink>
        <ButtonLink
          href={buildWhatsAppUrl(SPECIALIST_WHATSAPP_MESSAGE)}
          variant="ghost-inverse"
          target="_blank"
          rel="noopener noreferrer"
        >
          {CONTENT.secondaryCta.label}
        </ButtonLink>
      </div>
    </Section>
  );
}
