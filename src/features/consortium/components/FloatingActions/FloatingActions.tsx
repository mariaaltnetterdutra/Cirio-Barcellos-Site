"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { WhatsAppLogo } from "@/shared/components/brand/WhatsAppLogo/WhatsAppLogo";
import { Icon } from "@/shared/components/ui/Icon/Icon";
import { ROUTES, SECTION_IDS, sectionHref } from "@/shared/constants/routes";
import { useIsSectionInView } from "@/shared/hooks/useIsSectionInView";
import { cn } from "@/shared/utils/cn";
import { buildWhatsAppUrl } from "@/shared/utils/whatsapp";
import { FLOATING_ACTIONS_CONTENT as CONTENT, SPECIALIST_WHATSAPP_MESSAGE } from "../../content";
import styles from "./FloatingActions.module.css";

// Sempre na tela: o WhatsApp em todas as páginas e, na landing, o atalho para o formulário.
// Os dois são redondos e do mesmo tamanho; o atalho abre o texto ao passar o mouse.
export function FloatingActions() {
  const isLanding = usePathname() === ROUTES.home;
  const isFormVisible = useIsSectionInView(SECTION_IDS.analise);

  return (
    <div className={cn(styles.wrap, isLanding && !isFormVisible && styles.aboveBar)}>
      {isLanding && (
        <Link
          href={sectionHref(SECTION_IDS.analise)}
          className={cn(styles.form, isFormVisible && styles.hidden)}
          aria-label={CONTENT.formLabel}
          tabIndex={isFormVisible ? -1 : undefined}
        >
          <span className={styles.formLabel} aria-hidden="true">
            {CONTENT.formLabel}
          </span>
          <Icon name="clipboard" size="lg" />
        </Link>
      )}
      <a
        className={styles.whatsapp}
        href={buildWhatsAppUrl(SPECIALIST_WHATSAPP_MESSAGE)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={CONTENT.whatsappLabel}
      >
        <WhatsAppLogo />
      </a>
    </div>
  );
}
