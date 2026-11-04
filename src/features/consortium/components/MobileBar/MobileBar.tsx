import { ButtonLink } from "@/shared/components/ui/Button/Button";
import { SECTION_IDS, sectionHref } from "@/shared/constants/routes";
import { buildWhatsAppUrl } from "@/shared/utils/whatsapp";
import { MOBILE_BAR_CONTENT as CONTENT, SPECIALIST_WHATSAPP_MESSAGE } from "../../content";
import styles from "./MobileBar.module.css";

// Só aparece no celular. O espaço que ela ocupa no fim da página é reservado no globals.css.
export function MobileBar() {
  return (
    <div className={styles.bar}>
      <ButtonLink href={sectionHref(SECTION_IDS.analise)} className={styles.primary}>
        {CONTENT.primary}
      </ButtonLink>
      <ButtonLink
        href={buildWhatsAppUrl(SPECIALIST_WHATSAPP_MESSAGE)}
        variant="ghost"
        icon="message"
        aria-label={CONTENT.secondaryLabel}
        target="_blank"
        rel="noopener noreferrer"
      >
        {CONTENT.secondary}
      </ButtonLink>
    </div>
  );
}
