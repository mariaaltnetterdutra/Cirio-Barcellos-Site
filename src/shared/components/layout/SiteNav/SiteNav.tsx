"use client";

import Link from "next/link";
import { useId } from "react";
import { MobileMenuToggle } from "@/shared/components/layout/MobileMenuToggle/MobileMenuToggle";
import { SITE_NAV } from "@/shared/constants/routes";
import { useMobileMenu } from "@/shared/hooks/useMobileMenu";
import { cn } from "@/shared/utils/cn";
import { SITE_HEADER_CONTENT } from "@/shared/components/layout/SiteHeader/content";
import styles from "./SiteNav.module.css";

// Comparar com "/" no fim evita marcar /consorcio quando a página é /consorcio-imobiliario.
function isCurrentPage(pathname: string, href: string): boolean {
  return pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));
}

// O botão vem antes da lista no HTML: com o menu aberto, o próximo Tab já cai nos links.
export function SiteNav() {
  const navId = useId();
  const { isOpen, toggle, close, toggleRef, pathname } = useMobileMenu();

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
          {SITE_NAV.map(({ label, href }) => (
            <li key={href}>
              <Link
                className={styles.link}
                href={href}
                aria-current={isCurrentPage(pathname, href) ? "page" : undefined}
                onClick={close}
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
