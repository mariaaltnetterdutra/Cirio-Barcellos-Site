import Link from "next/link";
import { TextField } from "@/shared/components/form/TextField/TextField";
import { Button } from "@/shared/components/ui/Button/Button";
import { ROUTES } from "@/shared/constants/routes";
import { formatWhatsApp, onlyDigits } from "@/shared/utils/phone";
import { SIMULATION_CONTENT as CONTENT } from "../../content";
import type { LeadFormApi } from "../../hooks/useLeadForm";
import styles from "./SimulationCard.module.css";

export function ContactStep({ form }: { form: LeadFormApi }) {
  const { values, errors } = form;

  return (
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
  );
}
