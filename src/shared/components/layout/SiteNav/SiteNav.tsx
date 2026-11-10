"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useId } from "react";
import { MobileMenuToggle } from "@/shared/components/layout/MobileMenuToggle/MobileMenuToggle";
import { SITE_HEADER_CONTENT } from "@/shared/components/layout/SiteHeader/content";
import { ROUTES, SITE_NAV, sectionHref, type SectionId } from "@/shared/constants/routes";
import { useActiveSection } from "@/shared/hooks/useActiveSection";
import { useMobileMenu } from "@/shared/hooks/useMobileMenu";
import { cn } from "@/shared/utils/cn";
import { handleSectionLinkClick } from "@/shared/utils/scroll";
import styles from "./SiteNav.module.css";

const NAV_SECTION_IDS: readonly SectionId[] = SITE_NAV.map((item) => item.sectionId);

function navHref(sectionId: SectionId, isOnLanding: boolean): string {
  return isOnLanding ? sectionHref(sectionId) : `${ROUTES.home}${sectionHref(sectionId)}`;
}

// O botão vem antes da lista no HTML: com o menu aberto, o próximo Tab já cai nos links.
export function SiteNav() {
  const navId = useId();
  const isOnLanding = usePathname() === ROUTES.home;
  const activeSectionId = useActiveSection(NAV_SECTION_IDS, isOnLanding);
  const { isOpen, toggle, close, toggleRef } = useMobileMenu();

  return (
    <>
      <MobileMenuToggle
        ref={toggleRef}
        isOpen={isOpen}
        onToggle={toggle}
        controlsId={navId}
        openLabel={SITE_HEADER_CONTENT.openMenuLabel}
        closeLabel={SITE_HEADER_CONTENT.closeMenuLabel}
      />
      <nav
        id={navId}
        className={cn(styles.nav, isOpen && styles.open)}
        aria-label={SITE_HEADER_CONTENT.navLabel}
      >
        <ul className={styles.list}>
          {SITE_NAV.map(({ label, sectionId }) => (
            <li key={sectionId}>
              <Link
                className={styles.link}
                href={navHref(sectionId, isOnLanding)}
                aria-current={activeSectionId === sectionId ? "true" : undefined}
                onClick={(event) => {
                  close();
                  if (isOnLanding) handleSectionLinkClick(event, sectionId);
                }}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
