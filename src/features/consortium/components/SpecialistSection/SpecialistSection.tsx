import { ImagePlaceholder } from "@/shared/components/media/ImagePlaceholder/ImagePlaceholder";
import { Section } from "@/shared/components/layout/Section/Section";
import { ButtonLink } from "@/shared/components/ui/Button/Button";
import { PendingBadge } from "@/shared/components/ui/PendingBadge/PendingBadge";
import { SectionHeading } from "@/shared/components/ui/SectionHeading/SectionHeading";
import { SECTION_IDS } from "@/shared/constants/routes";
import { buildWhatsAppUrl } from "@/shared/utils/whatsapp";
import { SPECIALIST_CONTENT as CONTENT } from "../../content";
import styles from "./SpecialistSection.module.css";

const TITLE_ID = "especialista-titulo";

export function SpecialistSection() {
  return (
    <Section id={SECTION_IDS.especialista} labelledBy={TITLE_ID}>
      <div className={styles.grid}>
        <ImagePlaceholder
          label={CONTENT.photoLabel}
          icon="user"
          aspectRatio="4/5"
          className={styles.photo}
          sizes="(max-width: 820px) 100vw, 380px"
        />
        <div className={styles.text}>
          <SectionHeading titleId={TITLE_ID} eyebrow={CONTENT.eyebrow} title={CONTENT.title} />
          <p className={styles.name}>
            {CONTENT.name} <PendingBadge label={CONTENT.pendingLabel} />
          </p>
          <p className={styles.role}>{CONTENT.role}</p>
          <blockquote className={styles.quote}>{CONTENT.quote}</blockquote>
          <ButtonLink
            href={buildWhatsAppUrl(CONTENT.whatsappMessage)}
            icon="message"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.cta}
          >
            {CONTENT.cta.label}
          </ButtonLink>
        </div>
      </div>
    </Section>
  );
}
