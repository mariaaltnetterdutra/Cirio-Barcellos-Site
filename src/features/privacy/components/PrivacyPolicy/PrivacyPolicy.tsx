import Link from "next/link";
import { Section } from "@/shared/components/layout/Section/Section";
import { SectionHeading } from "@/shared/components/ui/SectionHeading/SectionHeading";
import { ROUTES } from "@/shared/constants/routes";
import { PRIVACY_CONTENT as CONTENT } from "../../content";
import styles from "./PrivacyPolicy.module.css";

const TITLE_ID = "privacidade-titulo";

export function PrivacyPolicy() {
  return (
    <Section width="narrow" labelledBy={TITLE_ID}>
      <SectionHeading as="h1" titleId={TITLE_ID} title={CONTENT.title} lead={CONTENT.intro} className={styles.heading} />
      <p className={styles.updated}>
        {CONTENT.updatedLabel} {CONTENT.updatedAt}
      </p>
      <p className={styles.notice} role="note">
        {CONTENT.reviewNotice}
      </p>

      {CONTENT.sections.map((section) => (
        <section key={section.id} id={section.id} aria-labelledby={`${section.id}-titulo`} className={styles.section}>
          <h2 id={`${section.id}-titulo`} className={styles.title}>
            {section.title}
          </h2>
          {section.paragraphs?.map((paragraph) => (
            <p key={paragraph} className={styles.text}>
              {paragraph}
            </p>
          ))}
          {section.items && (
            <ul className={styles.list}>
              {section.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )}
        </section>
      ))}

      <Link href={ROUTES.home} className={styles.back}>
        {CONTENT.backToSite}
      </Link>
    </Section>
  );
}
