import Link from "next/link";
import type { ReactNode } from "react";
import { Logo } from "@/shared/components/brand/Logo/Logo";
import { Icon, type IconName } from "@/shared/components/ui/Icon/Icon";
import { PendingBadge } from "@/shared/components/ui/PendingBadge/PendingBadge";
import { COMPANY } from "@/shared/constants/company";
import { ROUTES, SECTION_IDS } from "@/shared/constants/routes";
import { getCurrentYear } from "@/shared/utils/date";
import { buildWhatsAppUrl } from "@/shared/utils/whatsapp";
import { SITE_FOOTER_CONTENT as CONTENT } from "./content";
import styles from "./SiteFooter.module.css";

function ContactItem({ icon, children }: { icon: IconName; children: ReactNode }) {
  return (
    <li className={styles.item}>
      <Icon name={icon} size="sm" className={styles.itemIcon} />
      <span>{children}</span>
    </li>
  );
}

function ConfirmedValue({ value }: { value: string | null }) {
  return value ? <>{value}</> : <PendingBadge />;
}

export async function SiteFooter() {
  const year = await getCurrentYear();

  return (
    <footer id={SECTION_IDS.contato} className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <Link href={ROUTES.home} aria-label={CONTENT.homeLinkLabel} className={styles.logoLink}>
            <Logo variant="dark" />
          </Link>
          <p className={styles.tagline}>{CONTENT.tagline}</p>
        </div>

        <div>
          <h2 className={styles.title}>{CONTENT.contactTitle}</h2>
          <ul className={styles.list}>
            <ContactItem icon="pin">
              {COMPANY.address}{" "}
              {COMPANY.cep ? `· ${CONTENT.cepLabel} ${COMPANY.cep}` : <PendingBadge label={`${CONTENT.cepLabel} a confirmar`} />}
            </ContactItem>
            <ContactItem icon="phone">{COMPANY.phoneDisplay}</ContactItem>
            <ContactItem icon="message">
              <a href={buildWhatsAppUrl()} target="_blank" rel="noopener noreferrer">
                {CONTENT.whatsappLabel}
              </a>
            </ContactItem>
          </ul>
        </div>

        <div>
          <h2 className={styles.title}>{CONTENT.institutionalTitle}</h2>
          <ul className={styles.list}>
            <li className={styles.item}>
              {CONTENT.cnpjLabel} <ConfirmedValue value={COMPANY.cnpj} />
            </li>
            <li className={styles.item}>
              {CONTENT.susepLabel} <ConfirmedValue value={COMPANY.susep} />
            </li>
            <li className={styles.item}>
              <Link href={CONTENT.privacyLink.href}>{CONTENT.privacyLink.label}</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>
          © {year} {COMPANY.legalName}
        </p>
        {/* Sem pré-carregamento: é um atalho só da equipe, não deve pesar para o visitante. */}
        <Link href={CONTENT.panelLink.href} prefetch={false} className={styles.panelLink}>
          {CONTENT.panelLink.label}
        </Link>
      </div>
    </footer>
  );
}
