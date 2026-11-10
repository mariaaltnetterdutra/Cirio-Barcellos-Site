"use client";

import { ButtonLink } from "@/shared/components/ui/Button/Button";
import { useIsSectionInView } from "@/shared/hooks/useIsSectionInView";
import { SECTION_IDS, sectionHref } from "@/shared/constants/routes";
import { cn } from "@/shared/utils/cn";
import { MOBILE_BAR_CONTENT as CONTENT } from "../../content";
import styles from "./MobileStickyBar.module.css";

// Só aparece no celular e some enquanto o formulário está na tela, para não repetir o botão.
// O WhatsApp fica no botão flutuante. O espaço desta barra no fim da página é reservado no globals.css.
export function MobileStickyBar() {
  const isFormVisible = useIsSectionInView(SECTION_IDS.analise);

  return (
    <div className={cn(styles.bar, isFormVisible && styles.hidden)}>
      <ButtonLink href={sectionHref(SECTION_IDS.analise)} className={styles.primary}>
        {CONTENT.primary}
      </ButtonLink>
    </div>
  );
}
