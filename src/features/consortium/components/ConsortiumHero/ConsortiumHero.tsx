import { PortoBankLogo } from "@/shared/components/brand/PortoBankLogo/PortoBankLogo";
import { ImagePlaceholder } from "@/shared/components/media/ImagePlaceholder/ImagePlaceholder";
import { Section } from "@/shared/components/layout/Section/Section";
import { ButtonLink } from "@/shared/components/ui/Button/Button";
import { SectionButtonLink } from "@/shared/components/ui/SectionButtonLink/SectionButtonLink";
import { SectionHeading } from "@/shared/components/ui/SectionHeading/SectionHeading";
import { SECTION_IDS } from "@/shared/constants/routes";
import { buildWhatsAppUrl } from "@/shared/utils/whatsapp";
import { HERO_CONTENT as CONTENT, SPECIALIST_WHATSAPP_MESSAGE } from "../../content";
import styles from "./ConsortiumHero.module.css";

const TITLE_ID = "hero-titulo";

export function ConsortiumHero() {
  return (
    <Section tone="slate" labelledBy={TITLE_ID}>
      <div className={styles.grid}>
        <div className={styles.text}>
          <SectionHeading
            as="h1"
            titleId={TITLE_ID}
            title={CONTENT.title}
            lead={CONTENT.lead}
            className={styles.heading}
          />
          <div className={styles.actions}>
            <SectionButtonLink sectionId={SECTION_IDS.analise}>{CONTENT.primaryCta.label}</SectionButtonLink>
            <ButtonLink
              href={buildWhatsAppUrl(SPECIALIST_WHATSAPP_MESSAGE)}
              variant="ghost-inverse"
              target="_blank"
              rel="noopener noreferrer"
            >
              {CONTENT.secondaryCta.label}
            </ButtonLink>
          </div>
          <div className={styles.partner}>
            <PortoBankLogo variant="dark" size="lg" />
            <span className={styles.partnerCaption}>{CONTENT.partnerCaption}</span>
          </div>
        </div>
        <ImagePlaceholder
          label={CONTENT.photo.alt}
          src={CONTENT.photo.src}
          alt={CONTENT.photo.alt}
          aspectRatio="4/5"
          className={styles.photo}
          sizes="(max-width: 820px) 100vw, 520px"
          preload
        />
      </div>
    </Section>
  );
}
