import { Section } from "@/shared/components/layout/Section/Section";
import { Icon } from "@/shared/components/ui/Icon/Icon";
import { SectionHeading } from "@/shared/components/ui/SectionHeading/SectionHeading";
import { SECTION_IDS } from "@/shared/constants/routes";
import { FAQ_CONTENT as CONTENT } from "../../content";
import { FaqJsonLd } from "./FaqJsonLd";
import styles from "./FaqSection.module.css";

const TITLE_ID = "duvidas-titulo";

// <details> nativo: abre e fecha com teclado e leitor de tela, sem JavaScript no navegador.
export function FaqSection() {
  return (
    <Section id={SECTION_IDS.duvidas} tone="muted" width="narrow" labelledBy={TITLE_ID}>
      <SectionHeading titleId={TITLE_ID} eyebrow={CONTENT.eyebrow} title={CONTENT.title} />
      <div className={styles.list}>
        {CONTENT.items.map((item) => (
          <details key={item.question} className={styles.item}>
            <summary className={styles.question}>
              <span>{item.question}</span>
              <Icon name="plus" size="sm" className={styles.icon} />
            </summary>
            <p className={styles.answer}>{item.answer}</p>
          </details>
        ))}
      </div>
      <FaqJsonLd />
    </Section>
  );
}
