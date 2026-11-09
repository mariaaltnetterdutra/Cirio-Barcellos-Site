"use client";

import Link from "next/link";
import { useRef } from "react";
import { ChoiceGroup } from "@/shared/components/form/ChoiceGroup/ChoiceGroup";
import { TextField } from "@/shared/components/form/TextField/TextField";
import { Button } from "@/shared/components/ui/Button/Button";
import { ROUTES } from "@/shared/constants/routes";
import { formatWhatsApp, onlyDigits } from "@/shared/utils/phone";
import { LEAD_FORM_CONTENT as CONTENT } from "../../content";
import { useLeadForm } from "../../hooks/useLeadForm";
import { BUDGET_OPTIONS, GOAL_OPTIONS, TIMEFRAME_OPTIONS } from "../../options";
import styles from "./LeadForm.module.css";

export function LeadForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const form = useLeadForm(formRef);
  const { values, errors } = form;

  return (
    <form ref={formRef} className={styles.form} onSubmit={form.handleSubmit} noValidate>
      <ChoiceGroup
        legend={CONTENT.goalQuestion}
        name="goal"
        options={GOAL_OPTIONS}
        value={values.goal}
        onChange={(goal) => form.setField("goal", goal)}
        error={errors.goal}
        columns={2}
      />
      {values.goal === "outro" && (
        <TextField
          label={CONTENT.otherGoal.label}
          name="otherGoal"
          placeholder={CONTENT.otherGoal.placeholder}
          maxLength={CONTENT.otherGoal.maxLength}
          value={values.otherGoal}
          onChange={(event) => form.setField("otherGoal", event.target.value)}
        />
      )}
      <ChoiceGroup
        legend={CONTENT.budgetQuestion}
        name="budget"
        options={BUDGET_OPTIONS}
        value={values.budget}
        onChange={(budget) => form.setField("budget", budget)}
        error={errors.budget}
      />
      <ChoiceGroup
        legend={CONTENT.timeframeQuestion}
        name="timeframe"
        options={TIMEFRAME_OPTIONS}
        value={values.timeframe}
        onChange={(timeframe) => form.setField("timeframe", timeframe)}
        error={errors.timeframe}
      />
      <div className={styles.contact}>
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
      </div>

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

      <p className={styles.consent}>
        {CONTENT.consentBefore} <Link href={ROUTES.privacidade}>{CONTENT.consentLink}</Link>.
      </p>

      {form.submitError && (
        <p className={styles.submitError} role="alert">
          {form.submitError}
        </p>
      )}

      <Button type="submit" aria-busy={form.isSubmitting} className={styles.submit}>
        {form.isSubmitting ? CONTENT.submitting : CONTENT.submit}
      </Button>
    </form>
  );
}
