"use client";

import { useRouter } from "next/navigation";
import { useRef, useState, type FormEvent, type RefObject } from "react";
import { ApiError } from "@/core/api/httpClient";
import { trackEvent } from "@/core/analytics/track";
import { ROUTES } from "@/shared/constants/routes";
import { formatWhatsApp } from "@/shared/utils/phone";
import { LEAD_FORM_CONTENT } from "../content";
import { BUDGET_OPTIONS, GOAL_OPTIONS, TIMEFRAME_OPTIONS } from "../options";
import { buildCreateLeadRequest, createLead } from "../services/leadService";
import { saveLastLead } from "../services/lastLeadStorage";
import { useConsortiumIntent } from "../state/ConsortiumIntentContext";
import {
  LEAD_FORM_FIELD_ORDER,
  validateLeadForm,
  type LeadFormErrors,
  type LeadFormValues,
} from "../validation/validateLeadForm";

export type LeadFormStatus = "idle" | "submitting" | "error";

const INITIAL_VALUES: LeadFormValues = {
  otherGoal: "",
  name: "",
  whatsapp: "",
  website: "",
};

function labelOf(options: readonly { value: string; label: string }[], value: string): string {
  return options.find((option) => option.value === value)?.label ?? value;
}

function submitErrorMessage(error: unknown): string {
  if (error instanceof ApiError && error.kind === "rate_limited") {
    return LEAD_FORM_CONTENT.errors.tooManyRequests;
  }
  return LEAD_FORM_CONTENT.errors.submit;
}

/** `formRef` fica no componente do formulário: o hook só usa para levar o foco ao 1º erro. */
export function useLeadForm(formRef: RefObject<HTMLFormElement | null>) {
  const router = useRouter();
  const { intent } = useConsortiumIntent();
  const hasStartedRef = useRef(false);

  const [values, setValues] = useState<LeadFormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<LeadFormErrors>({});
  const [status, setStatus] = useState<LeadFormStatus>("idle");
  const [submitError, setSubmitError] = useState<string>();
  const [appliedRequestId, setAppliedRequestId] = useState(intent.requestId);

  // Quando a pessoa clica num objetivo ou num plano lá em cima, as respostas já vêm marcadas.
  // Ajustar o estado durante a renderização evita um efeito e um quadro com valores velhos.
  if (appliedRequestId !== intent.requestId) {
    setAppliedRequestId(intent.requestId);
    setValues((current) => ({
      ...current,
      goal: intent.goal ?? current.goal,
      budget: intent.budget ?? current.budget,
    }));
    setErrors((current) => ({ ...current, goal: undefined, budget: undefined }));
  }

  function markStarted(): void {
    if (hasStartedRef.current) return;
    hasStartedRef.current = true;
    trackEvent("inicio_formulario");
  }

  function setField<TField extends keyof LeadFormValues>(field: TField, value: LeadFormValues[TField]): void {
    markStarted();
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  function focusFirstError(found: LeadFormErrors): void {
    const firstField = LEAD_FORM_FIELD_ORDER.find((field) => found[field]);
    if (!firstField) return;
    formRef.current?.querySelector<HTMLElement>(`[name="${firstField}"]`)?.focus();
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    if (status === "submitting") return;

    const result = validateLeadForm(values);
    if (!result.ok) {
      setErrors(result.errors);
      focusFirstError(result.errors);
      return;
    }

    setStatus("submitting");
    try {
      const response = await createLead(buildCreateLeadRequest(result.values));
      const form = result.values;
      saveLastLead({
        protocol: response.protocolo,
        firstName: form.name.split(" ")[0] ?? form.name,
        whatsapp: formatWhatsApp(form.whatsapp),
        goalLabel: labelOf(GOAL_OPTIONS, form.goal),
        budgetLabel: labelOf(BUDGET_OPTIONS, form.budget),
        timeframeLabel: labelOf(TIMEFRAME_OPTIONS, form.timeframe),
      });
      trackEvent("formulario_enviado", { objetivo: form.goal, valor: form.budget, prazo: form.timeframe });
      router.push(ROUTES.confirmacao);
    } catch (error) {
      setStatus("error");
      setSubmitError(submitErrorMessage(error));
    }
  }

  return {
    values,
    errors,
    status,
    submitError,
    isSubmitting: status === "submitting",
    setField,
    handleSubmit,
  };
}
