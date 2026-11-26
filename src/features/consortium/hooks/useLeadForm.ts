import { useRouter } from "next/navigation";
import { useRef, useState, type FormEvent, type RefObject } from "react";
import { ApiError } from "@/core/api/httpClient";
import { trackEvent } from "@/core/analytics/track";
import { ROUTES } from "@/shared/constants/routes";
import { formatCreditValue } from "@/shared/utils/currency";
import { formatWhatsApp } from "@/shared/utils/phone";
import { SIMULATION_CONTENT } from "../content";
import { GOAL_OPTIONS } from "../options";
import { buildCreateLeadRequest, createLead } from "../services/leadService";
import { saveLastLead } from "../services/lastLeadStorage";
import { useConsortiumIntent } from "../state/ConsortiumIntentContext";
import {
  CHOICE_FIELD_ORDER,
  CONTACT_FIELD_ORDER,
  validateChoices,
  validateLeadForm,
  type LeadFormErrors,
  type LeadFormField,
  type LeadFormValues,
} from "../validation/validateLeadForm";

export type LeadFormStatus = "idle" | "submitting" | "error";
export type SimulationStep = 1 | 2;

const INITIAL_VALUES: LeadFormValues = {
  goal: "imovel",
  customCredit: "",
  name: "",
  whatsapp: "",
  website: "",
};

function submitErrorMessage(error: unknown): string {
  if (error instanceof ApiError && error.kind === "rate_limited") {
    return SIMULATION_CONTENT.errors.tooManyRequests;
  }
  return SIMULATION_CONTENT.errors.submit;
}

export function useLeadForm(formRef: RefObject<HTMLFormElement | null>) {
  const router = useRouter();
  const { intent } = useConsortiumIntent();
  const hasStartedRef = useRef(false);

  const [values, setValues] = useState<LeadFormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<LeadFormErrors>({});
  const [step, setStep] = useState<SimulationStep>(1);
  const [status, setStatus] = useState<LeadFormStatus>("idle");
  const [submitError, setSubmitError] = useState<string>();
  const [appliedRequestId, setAppliedRequestId] = useState(intent.requestId);

  if (appliedRequestId !== intent.requestId) {
    setAppliedRequestId(intent.requestId);
    setValues((current) => ({
      ...current,
      goal: intent.goal ?? INITIAL_VALUES.goal,
      creditChoice: intent.creditValue ? String(intent.creditValue) : undefined,
      customCredit: "",
      termChoice: undefined,
    }));
    setErrors((current) => ({
      ...current,
      goal: undefined,
      creditChoice: undefined,
      customCredit: undefined,
      termChoice: undefined,
    }));
    setStep(1);
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

  function focusFieldSoon(name: string): void {
    requestAnimationFrame(() => formRef.current?.querySelector<HTMLElement>(`[name="${name}"]`)?.focus());
  }

  function focusFirstError(order: readonly LeadFormField[], found: LeadFormErrors): void {
    const firstField = order.find((field) => found[field]);
    if (!firstField) return;
    formRef.current?.querySelector<HTMLElement>(`[name="${firstField}"]`)?.focus();
  }

  function goToContact(): void {
    const result = validateChoices(values);
    if (!result.ok) {
      setErrors(result.errors);
      focusFirstError(CHOICE_FIELD_ORDER, result.errors);
      return;
    }
    trackEvent("simulacao_passo_2");
    setStep(2);
    focusFieldSoon("name");
  }

  function goBack(): void {
    setStatus("idle");
    setSubmitError(undefined);
    setStep(1);
    focusFieldSoon("goal");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    if (status === "submitting") return;
    if (step === 1) {
      goToContact();
      return;
    }

    const result = validateLeadForm(values);
    if (!result.ok) {
      setErrors(result.errors);
      focusFirstError(CONTACT_FIELD_ORDER, result.errors);
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
        goalLabel: GOAL_OPTIONS.find((option) => option.value === form.goal)?.label ?? form.goal,
        creditLabel: form.creditValue ? formatCreditValue(form.creditValue) : SIMULATION_CONTENT.unknownCreditOption,
        termLabel: form.termMonths ? SIMULATION_CONTENT.termOption(form.termMonths) : SIMULATION_CONTENT.unknownTermOption,
      });
      trackEvent("formulario_enviado", {
        objetivo: form.goal,
        valor: form.creditValue ?? "nao-sei",
        prazo: form.termMonths ?? "ajuda",
      });
      router.push(ROUTES.confirmacao);
    } catch (error) {
      setStatus("error");
      setSubmitError(submitErrorMessage(error));
    }
  }

  return {
    values,
    errors,
    step,
    status,
    submitError,
    isSubmitting: status === "submitting",
    setField,
    goBack,
    handleSubmit,
  };
}

export type LeadFormApi = ReturnType<typeof useLeadForm>;
