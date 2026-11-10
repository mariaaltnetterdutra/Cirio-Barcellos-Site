"use client";

import { useSyncExternalStore } from "react";
import { Section } from "@/shared/components/layout/Section/Section";
import { ButtonLink } from "@/shared/components/ui/Button/Button";
import { SectionHeading } from "@/shared/components/ui/SectionHeading/SectionHeading";
import { ROUTES } from "@/shared/constants/routes";
import { buildWhatsAppUrl } from "@/shared/utils/whatsapp";
import { CONFIRMATION_CONTENT as CONTENT, SPECIALIST_WHATSAPP_MESSAGE } from "../../content";
import { parseLastLead, readLastLeadRaw } from "../../services/lastLeadStorage";
import styles from "./ConfirmationView.module.css";

const TITLE_ID = "confirmacao-titulo";

function subscribe(onChange: () => void): () => void {
  window.addEventListener("storage", onChange);
  return () => window.removeEventListener("storage", onChange);
}

export function ConfirmationView() {
  const raw = useSyncExternalStore(subscribe, readLastLeadRaw, () => null);
  const lead = parseLastLead(raw);

  const whatsappMessage = lead
    ? CONTENT.whatsappMessage(lead.protocol, lead.firstName)
    : SPECIALIST_WHATSAPP_MESSAGE;

  return (
    <Section tone="muted" width="narrow" labelledBy={TITLE_ID}>
      <SectionHeading
        as="h1"
        titleId={TITLE_ID}
        title={CONTENT.title}
        lead={lead ? CONTENT.textWithName(lead.firstName, lead.whatsapp) : CONTENT.genericText}
      />

      {lead && (
        <>
          <div className={styles.protocol}>
            <span className={styles.protocolLabel}>{CONTENT.protocolLabel}</span>
            <span className={styles.protocolValue}>{lead.protocol}</span>
          </div>
          <dl className={styles.summary}>
            <div>
              <dt>{CONTENT.summaryLabels.goal}</dt>
              <dd>{lead.goalLabel}</dd>
            </div>
            <div>
              <dt>{CONTENT.summaryLabels.credit}</dt>
              <dd>{lead.creditLabel}</dd>
            </div>
            <div>
              <dt>{CONTENT.summaryLabels.term}</dt>
              <dd>{lead.termLabel}</dd>
            </div>
          </dl>
        </>
      )}

      <div className={styles.actions}>
        <ButtonLink
          href={buildWhatsAppUrl(whatsappMessage)}
          icon="message"
          target="_blank"
          rel="noopener noreferrer"
        >
          {CONTENT.whatsappCta}
        </ButtonLink>
        <ButtonLink href={ROUTES.home} variant="ghost">
          {CONTENT.backCta}
        </ButtonLink>
      </div>
    </Section>
  );
}
