import { isValidWhatsApp } from "@/shared/utils/phone";
import { SIMULATION_CONTENT } from "../content";
import { CREDIT_LIMITS, CUSTOM_CREDIT, UNKNOWN_CREDIT, UNKNOWN_TERM } from "../options";
import type { ConsortiumGoal } from "../types";

const MIN_NAME_LENGTH = 2;

export interface LeadFormValues {
  goal?: ConsortiumGoal;
  creditChoice?: string;
  customCredit: string;
  termChoice?: string;
  name: string;
  whatsapp: string;
  website: string;
}

export type LeadFormField = "goal" | "creditChoice" | "customCredit" | "termChoice" | "name" | "whatsapp";
export type LeadFormErrors = Partial<Record<LeadFormField, string>>;

export const CHOICE_FIELD_ORDER: readonly LeadFormField[] = ["goal", "creditChoice", "customCredit", "termChoice"];
export const CONTACT_FIELD_ORDER: readonly LeadFormField[] = ["name", "whatsapp"];

export interface ValidChoices {
  goal: ConsortiumGoal;
  creditValue?: number;
  termMonths?: number;
}

export interface ValidLeadForm extends ValidChoices {
  name: string;
  whatsapp: string;
  website: string;
}

export type ChoicesValidation = { ok: true; values: ValidChoices } | { ok: false; errors: LeadFormErrors };
export type LeadFormValidation = { ok: true; values: ValidLeadForm } | { ok: false; errors: LeadFormErrors };

const ERRORS = SIMULATION_CONTENT.errors;

export function validateChoices(values: LeadFormValues): ChoicesValidation {
  const errors: LeadFormErrors = {};
  let creditValue: number | undefined;
  let termMonths: number | undefined;

  if (!values.creditChoice) {
    errors.creditChoice = ERRORS.choice;
  } else if (values.creditChoice === CUSTOM_CREDIT) {
    const amount = Number(values.customCredit);
    if (!Number.isInteger(amount) || amount < CREDIT_LIMITS.min || amount > CREDIT_LIMITS.max) {
      errors.customCredit = ERRORS.customCredit;
    } else {
      creditValue = amount;
    }
  } else if (values.creditChoice !== UNKNOWN_CREDIT) {
    creditValue = Number(values.creditChoice);
  }

  if (!values.termChoice) {
    errors.termChoice = ERRORS.choice;
  } else if (values.termChoice !== UNKNOWN_TERM) {
    termMonths = Number(values.termChoice);
  }

  if (!values.goal) errors.goal = ERRORS.choice;

  if (!values.goal || Object.keys(errors).length > 0) return { ok: false, errors };
  return { ok: true, values: { goal: values.goal, creditValue, termMonths } };
}

export function validateLeadForm(values: LeadFormValues): LeadFormValidation {
  const choices = validateChoices(values);
  if (!choices.ok) return choices;

  const errors: LeadFormErrors = {};
  const name = values.name.trim();
  if (name.length < MIN_NAME_LENGTH) errors.name = ERRORS.name;
  if (!isValidWhatsApp(values.whatsapp)) errors.whatsapp = ERRORS.whatsapp;
  if (Object.keys(errors).length > 0) return { ok: false, errors };

  return { ok: true, values: { ...choices.values, name, whatsapp: values.whatsapp, website: values.website } };
}
