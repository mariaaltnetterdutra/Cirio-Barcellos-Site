import { ChoiceGroup, type ChoiceOption } from "@/shared/components/form/ChoiceGroup/ChoiceGroup";
import { TextField } from "@/shared/components/form/TextField/TextField";
import { Button } from "@/shared/components/ui/Button/Button";
import { formatCreditValue, formatThousands, onlyCurrencyDigits } from "@/shared/utils/currency";
import { SIMULATION_CONTENT as CONTENT } from "../../content";
import type { LeadFormApi } from "../../hooks/useLeadForm";
import {
  CREDIT_VALUES,
  CUSTOM_CREDIT,
  GOAL_OPTIONS,
  TERM_MONTHS,
  UNKNOWN_CREDIT,
  UNKNOWN_TERM,
} from "../../options";
import styles from "./SimulationCard.module.css";

const CREDIT_OPTIONS: readonly ChoiceOption<string>[] = [
  ...CREDIT_VALUES.map((value) => ({ value: String(value), label: formatCreditValue(value) })),
  { value: CUSTOM_CREDIT, label: CONTENT.customCreditOption },
  { value: UNKNOWN_CREDIT, label: CONTENT.unknownCreditOption },
];

const TERM_OPTIONS: readonly ChoiceOption<string>[] = [
  ...TERM_MONTHS.map((months) => ({ value: String(months), label: CONTENT.termOption(months) })),
  { value: UNKNOWN_TERM, label: CONTENT.unknownTermOption },
];

/** Passo 1: objetivo, valor do crédito e prazo. */
export function ChoicesStep({ form }: { form: LeadFormApi }) {
  const { values, errors } = form;

  return (
    <>
      <ChoiceGroup
        legend={CONTENT.goalQuestion}
        name="goal"
        options={GOAL_OPTIONS}
        value={values.goal}
        onChange={(goal) => form.setField("goal", goal)}
        error={errors.goal}
        columns={4}
        stacked
      />
      <ChoiceGroup
        legend={CONTENT.creditQuestion}
        name="creditChoice"
        options={CREDIT_OPTIONS}
        value={values.creditChoice}
        onChange={(choice) => form.setField("creditChoice", choice)}
        error={errors.creditChoice}
        columns={4}
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
  );
}
