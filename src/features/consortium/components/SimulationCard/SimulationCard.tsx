"use client";

import Link from "next/link";
import { useRef } from "react";
import { ChoiceGroup, type ChoiceOption } from "@/shared/components/form/ChoiceGroup/ChoiceGroup";
import { TextField } from "@/shared/components/form/TextField/TextField";
import { Button } from "@/shared/components/ui/Button/Button";
import { ROUTES, SECTION_IDS } from "@/shared/constants/routes";
import { formatCreditValue, formatThousands, onlyCurrencyDigits } from "@/shared/utils/currency";
import { formatWhatsApp, onlyDigits } from "@/shared/utils/phone";
import { buildWhatsAppUrl } from "@/shared/utils/whatsapp";
import { SIMULATION_CONTENT as CONTENT, SPECIALIST_WHATSAPP_MESSAGE } from "../../content";
import { useLeadForm } from "../../hooks/useLeadForm";
import {
  CREDIT_VALUES,
  CUSTOM_CREDIT,
  GOAL_OPTIONS,
  TERM_MONTHS,
  UNKNOWN_CREDIT,
  UNKNOWN_TERM,
} from "../../options";
import styles from "./SimulationCard.module.css";

const TITLE_ID = "simulacao-titulo";
const TOTAL_STEPS = 2;

const CREDIT_OPTIONS: readonly ChoiceOption<string>[] = [
  ...CREDIT_VALUES.map((value) => ({ value: String(value), label: formatCreditValue(value) })),
  { value: CUSTOM_CREDIT, label: CONTENT.customCreditOption },
  { value: UNKNOWN_CREDIT, label: CONTENT.unknownCreditOption },
];

const TERM_OPTIONS: readonly ChoiceOption<string>[] = [
  ...TERM_MONTHS.map((months) => ({ value: String(months), label: CONTENT.termOption(months) })),
  { value: UNKNOWN_TERM, label: CONTENT.unknownTermOption },
];

// tabIndex -1: o clique num plano rola até aqui e leva o foco junto.
export function SimulationCard() {
  const formRef = useRef<HTMLFormElement>(null);
  const form = useLeadForm(formRef);
  const { values, errors, step } = form;

  return (
    <section id={SECTION_IDS.analise} aria-labelledby={TITLE_ID} tabIndex={-1} className={`tone-light ${styles.card}`}>
      <div className={styles.progress}>
        <p className={styles.step}>{CONTENT.stepLabel(step, TOTAL_STEPS)}</p>
        <div className={styles.bar} aria-hidden="true">
          <span className={styles.barFill} style={{ width: `${(step / TOTAL_STEPS) * 100}%` }} />
        </div>
      </div>

      <h2 id={TITLE_ID} className={styles.title}>
        {step === 1 ? CONTENT.title : CONTENT.contactTitle}
      </h2>
      <p className={styles.lead}>{step === 1 ? CONTENT.lead : CONTENT.contactLead}</p>

      <form ref={formRef} className={styles.form} onSubmit={form.handleSubmit} noValidate>
        {step === 1 ? (
          <>
            <ChoiceGroup
              legend={CONTENT.goalQuestion}
              name="goal"
              options={GOAL_OPTIONS}
              value={values.goal}
              onChange={(goal) => form.setField("goal", goal)}
              error={errors.goal}
              columns={2}
            />
            <ChoiceGroup
              legend={CONTENT.creditQuestion}
              name="creditChoice"
              options={CREDIT_OPTIONS}
              value={values.creditChoice}
              onChange={(choice) => form.setField("creditChoice", choice)}
              error={errors.creditChoice}
              columns={3}
              compact
            />
            {values.creditChoice === CUSTOM_CREDIT && (
              <TextField
                label={CONTENT.customCredit.label}
                name="customCredit"
                inputMode="numeric"
                placeholder={CONTENT.customCredit.placeholder}
                value={formatThousands(values.customCredit)}
                onChange={(event) => form.setField("customCredit", onlyCurrencyDigits(event.target.value))}
                error={errors.customCredit}
              />
            )}
            <ChoiceGroup
              legend={CONTENT.termQuestion}
              name="termChoice"
              options={TERM_OPTIONS}
              value={values.termChoice}
              onChange={(choice) => form.setField("termChoice", choice)}
              error={errors.termChoice}
              columns={3}
              compact
            />
            <Button type="submit" className={styles.submit} icon="check">
              {CONTENT.next}
            </Button>
          </>
        ) : (
          <>
            <TextField
              label={CONTENT.name.label}
              name="name"
              placeholder={CONTENT.name.placeholder}
              autoComplete="name"
              maxLength={80}
              value={values.name}
              onChange={(event) => form.setField("name", event.target.value)}
              error={errors.name}
            />
            <TextField
              label={CONTENT.whatsapp.label}
              name="whatsapp"
              type="tel"
              inputMode="tel"
              autoComplete="tel-national"
              placeholder={CONTENT.whatsapp.placeholder}
              value={formatWhatsApp(values.whatsapp)}
              onChange={(event) => form.setField("whatsapp", onlyDigits(event.target.value))}
              error={errors.whatsapp}
            />

            {form.submitError && (
              <p className={styles.submitError} role="alert">
                {form.submitError}
              </p>
            )}

            <Button type="submit" aria-busy={form.isSubmitting} className={styles.submit}>
              {form.isSubmitting ? CONTENT.submitting : CONTENT.submit}
            </Button>
            <button type="button" className={styles.back} onClick={form.goBack}>
              {CONTENT.back}
            </button>
            <p className={styles.consent}>
              {CONTENT.consentBefore} <Link href={ROUTES.privacidade}>{CONTENT.consentLink}</Link>.
            </p>
          </>
        )}

        {/* Armadilha para robôs: fica fora da tela e pessoas nunca preenchem. */}
        <div className={styles.trap} aria-hidden="true">
          <label>
            Não preencha este campo
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              value={values.website}
              onChange={(event) => form.setField("website", event.target.value)}
            />
          </label>
        </div>
      </form>

      <p className={styles.reassurance}>{CONTENT.reassurance}</p>
      <a
        className={styles.direct}
        href={buildWhatsAppUrl(SPECIALIST_WHATSAPP_MESSAGE)}
        target="_blank"
        rel="noopener noreferrer"
      >
        {CONTENT.whatsappDirect}
      </a>
    </section>
  );
}
