"use client";

import { usePathname } from "next/navigation";
import { ButtonLink } from "@/shared/components/ui/Button/Button";
import { Icon } from "@/shared/components/ui/Icon/Icon";
import { ROUTES, SECTION_IDS, sectionHref } from "@/shared/constants/routes";
import { useIsSectionInView } from "@/shared/hooks/useIsSectionInView";
import { cn } from "@/shared/utils/cn";
import { buildWhatsAppUrl } from "@/shared/utils/whatsapp";
import { FLOATING_ACTIONS_CONTENT as CONTENT, SPECIALIST_WHATSAPP_MESSAGE } from "../../content";
import styles from "./FloatingActions.module.css";

// Sempre na tela: o WhatsApp em todas as páginas e, na landing, o atalho para o formulário.
// Os dois somem do caminho quando não fazem sentido (formulário já visível).
export function FloatingActions() {
  const isLanding = usePathname() === ROUTES.home;
  const isFormVisible = useIsSectionInView(SECTION_IDS.analise);

  return (
    <div className={cn(styles.wrap, isLanding && !isFormVisible && styles.aboveBar)}>
      {isLanding && (
        <ButtonLink
          href={sectionHref(SECTION_IDS.analise)}
          className={cn(styles.form, isFormVisible && styles.hidden)}
          tabIndex={isFormVisible ? -1 : undefined}
        >
          {CONTENT.formLabel}
        </ButtonLink>
      )}
      <a
        className={styles.whatsapp}
        href={buildWhatsAppUrl(SPECIALIST_WHATSAPP_MESSAGE)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={CONTENT.whatsappLabel}
      >
        <Icon name="whatsapp" size="lg" />
      </a>
    </div>
  );
}
