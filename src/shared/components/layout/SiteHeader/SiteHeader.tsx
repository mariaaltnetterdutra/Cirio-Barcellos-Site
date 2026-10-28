import Link from "next/link";
import { Logo } from "@/shared/components/brand/Logo/Logo";
import { ROUTES } from "@/shared/constants/routes";
import { SiteNav } from "@/shared/components/layout/SiteNav/SiteNav";
import { SITE_HEADER_CONTENT } from "./content";
import styles from "./SiteHeader.module.css";

export function SiteHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link
          className={styles.homeLink}
          href={ROUTES.home}
          aria-label={SITE_HEADER_CONTENT.homeLinkLabel}
        >
          <Logo variant="light" />
        </Link>
        <SiteNav />
      </div>
    </header>
  );
}
