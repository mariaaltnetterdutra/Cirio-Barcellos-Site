import { isValidWhatsApp } from "@/shared/utils/phone";
import { LEAD_FORM_CONTENT } from "../content";
import type { BudgetRange, ConsortiumGoal, Timeframe } from "../types";

const MIN_NAME_LENGTH = 2;

export interface LeadFormValues {
  goal?: ConsortiumGoal;
  otherGoal: string;
  budget?: BudgetRange;
  timeframe?: Timeframe;
  name: string;
  /** Só os números. */
  whatsapp: string;
  /** Campo escondido anti-robô. */
  website: string;
}

export type LeadFormField = "goal" | "budget" | "timeframe" | "name" | "whatsapp";
export type LeadFormErrors = Partial<Record<LeadFormField, string>>;

/** Mesma ordem em que os campos aparecem na tela: o foco vai para o primeiro com erro. */
export const LEAD_FORM_FIELD_ORDER: readonly LeadFormField[] = [
  "goal",
  "budget",
  "timeframe",
  "name",
  "whatsapp",
];

export interface ValidLeadForm {
  goal: ConsortiumGoal;
  otherGoal: string;
  budget: BudgetRange;
  timeframe: Timeframe;
  name: string;
  whatsapp: string;
  website: string;
}

export type LeadFormValidation =
  | { ok: true; values: ValidLeadForm }
  | { ok: false; errors: LeadFormErrors };

const ERRORS = LEAD_FORM_CONTENT.errors;

export function validateLeadForm(values: LeadFormValues): LeadFormValidation {
  const errors: LeadFormErrors = {};
  const name = values.name.trim();

  if (!values.goal) errors.goal = ERRORS.choice;
  if (!values.budget) errors.budget = ERRORS.choice;
  if (!values.timeframe) errors.timeframe = ERRORS.choice;
  if (name.length < MIN_NAME_LENGTH) errors.name = ERRORS.name;
  if (!isValidWhatsApp(values.whatsapp)) errors.whatsapp = ERRORS.whatsapp;

  if (!values.goal || !values.budget || !values.timeframe || Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    values: {
      goal: values.goal,
      otherGoal: values.otherGoal.trim(),
      budget: values.budget,
      timeframe: values.timeframe,
      name,
      whatsapp: values.whatsapp,
      website: values.website,
    },
  };
}
