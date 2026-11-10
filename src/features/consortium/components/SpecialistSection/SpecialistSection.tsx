import { WhatsAppLogo } from "@/shared/components/brand/WhatsAppLogo/WhatsAppLogo";
import { ImagePlaceholder } from "@/shared/components/media/ImagePlaceholder/ImagePlaceholder";
import { Section } from "@/shared/components/layout/Section/Section";
import { ButtonLink } from "@/shared/components/ui/Button/Button";
import { SectionHeading } from "@/shared/components/ui/SectionHeading/SectionHeading";
import { SECTION_IDS } from "@/shared/constants/routes";
import { buildWhatsAppUrl } from "@/shared/utils/whatsapp";
import { SPECIALIST_CONTENT as CONTENT, SPECIALIST_WHATSAPP_MESSAGE } from "../../content";
import styles from "./SpecialistSection.module.css";

const TITLE_ID = "especialista-titulo";

export function SpecialistSection() {
  return (
    <Section id={SECTION_IDS.especialista} labelledBy={TITLE_ID}>
      <SectionHeading
        titleId={TITLE_ID}
        eyebrow={CONTENT.eyebrow}
        title={CONTENT.title}
        lead={CONTENT.lead}
        align="center"
        className={styles.heading}
      />
      <div className={styles.layout}>
        <ul className={styles.people}>
          {CONTENT.people.map((person) => (
            <li key={person.name} className={styles.person}>
              <ImagePlaceholder
                label={person.photo.alt}
                src={person.photo.src}
                alt={person.photo.alt}
                aspectRatio="1/1"
                className={styles.photo}
                sizes="(max-width: 420px) 100vw, 380px"
              />
              <h3 className={styles.name}>{person.name}</h3>
              <p className={styles.role}>{person.role}</p>
              <p className={styles.text}>{person.text}</p>
            </li>
          ))}
        </ul>
        <div className={styles.callToAction}>
          <h3 className={styles.callTitle}>{CONTENT.callToAction.title}</h3>
          <p className={styles.callText}>{CONTENT.callToAction.text}</p>
          <ButtonLink
            href={buildWhatsAppUrl(SPECIALIST_WHATSAPP_MESSAGE)}
            variant="whatsapp"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.callButton}
          >
            <WhatsAppLogo />
            {CONTENT.callToAction.button}
          </ButtonLink>
        </div>
      </div>
    </Section>
  );
}
