import { PortoBankLogo } from "@/shared/components/brand/PortoBankLogo/PortoBankLogo";
import { Section } from "@/shared/components/layout/Section/Section";
import { ImagePlaceholder } from "@/shared/components/media/ImagePlaceholder/ImagePlaceholder";
import { Icon } from "@/shared/components/ui/Icon/Icon";
import { HERO_CONTENT as CONTENT } from "../../content";
import { SimulationCard } from "../SimulationCard/SimulationCard";
import styles from "./ConsortiumHero.module.css";

const TITLE_ID = "hero-titulo";

// A foto fica de fundo, atrás de uma camada escura só no CSS: o arquivo da imagem não é alterado.
export function ConsortiumHero() {
  return (
    <div className={styles.hero}>
      <ImagePlaceholder
        label={CONTENT.photo.alt}
        src={CONTENT.photo.src}
        alt=""
        aspectRatio="16/10"
        className={styles.bg}
        sizes="100vw"
        preload
      />
      <div className={styles.overlay} aria-hidden="true" />

      <Section tone="slate" width="wide" labelledBy={TITLE_ID} className={styles.section}>
        <div className={styles.grid}>
          <div className={styles.text}>
            <div className={styles.partner}>
              <PortoBankLogo variant="dark" size="lg" />
              <span className={styles.partnerCaption}>{CONTENT.partnerCaption}</span>
            </div>
            <h1 id={TITLE_ID} className={styles.title}>
              {CONTENT.title}
            </h1>
            <p className={styles.lead}>{CONTENT.lead}</p>
            <ul className={styles.benefits}>
              {CONTENT.benefits.map((benefit) => (
                <li key={benefit.label} className={styles.benefit}>
                  <Icon name={benefit.icon} size="sm" className={styles.benefitIcon} />
                  {benefit.label}
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.card}>
            <SimulationCard />
          </div>
        </div>
      </Section>
    </div>
  );
}
