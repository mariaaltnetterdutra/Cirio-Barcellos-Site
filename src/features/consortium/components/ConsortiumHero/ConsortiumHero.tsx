import { PortoBankLogo } from "@/shared/components/brand/PortoBankLogo/PortoBankLogo";
import { ImagePlaceholder } from "@/shared/components/media/ImagePlaceholder/ImagePlaceholder";
import { Section } from "@/shared/components/layout/Section/Section";
import { ButtonLink } from "@/shared/components/ui/Button/Button";
import { SectionHeading } from "@/shared/components/ui/SectionHeading/SectionHeading";
import { SECTION_IDS, sectionHref } from "@/shared/constants/routes";
import { buildWhatsAppUrl } from "@/shared/utils/whatsapp";
import { HERO_CONTENT as CONTENT, SPECIALIST_WHATSAPP_MESSAGE } from "../../content";
import styles from "./ConsortiumHero.module.css";

const TITLE_ID = "hero-titulo";

export function ConsortiumHero() {
  return (
    <Section tone="slate" labelledBy={TITLE_ID}>
      <div className={styles.grid}>
        <div className={styles.text}>
          <div className={styles.partner}>
            <span className={styles.partnerLabel}>{CONTENT.partnerLabel}</span>
            <PortoBankLogo variant="dark" size="lg" />
          </div>
          <SectionHeading
            as="h1"
            titleId={TITLE_ID}
            eyebrow={CONTENT.eyebrow}
            title={CONTENT.title}
            lead={CONTENT.lead}
            className={styles.heading}
          />
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
