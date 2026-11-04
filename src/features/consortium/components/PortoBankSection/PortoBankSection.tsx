import { PortoBankLogo } from "@/shared/components/brand/PortoBankLogo/PortoBankLogo";
import { Section } from "@/shared/components/layout/Section/Section";
import { Icon } from "@/shared/components/ui/Icon/Icon";
import { SectionHeading } from "@/shared/components/ui/SectionHeading/SectionHeading";
import { SECTION_IDS } from "@/shared/constants/routes";
import { PORTO_BANK_CONTENT as CONTENT } from "../../content";
import styles from "./PortoBankSection.module.css";

const TITLE_ID = "porto-bank-titulo";

export function PortoBankSection() {
  return (
    <Section id={SECTION_IDS.portoBank} tone="navy" labelledBy={TITLE_ID}>
      <div className={styles.grid}>
        <div>
          <PortoBankLogo variant="dark" size="md" className={styles.logo} />
          <SectionHeading
            titleId={TITLE_ID}
            eyebrow={CONTENT.eyebrow}
            title={CONTENT.title}
            lead={CONTENT.lead}
          />
        </div>
        <ul className={styles.items}>
          {CONTENT.items.map((item) => (
            <li key={item.label} className={styles.item}>
              <span className={styles.iconBox}>
                <Icon name={item.icon} />
              </span>
              <span className={styles.label}>{item.label}</span>
            </li>
          ))}
        </ul>
      </div>
      <p className={styles.footnote}>{CONTENT.footnote}</p>
    </Section>
  );
}
