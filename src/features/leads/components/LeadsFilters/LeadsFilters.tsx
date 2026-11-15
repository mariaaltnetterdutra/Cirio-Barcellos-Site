import { GOAL_OPTIONS } from "@/features/consortium/options";
import { SelectField, type SelectOption } from "@/shared/components/form/SelectField/SelectField";
import { TextField } from "@/shared/components/form/TextField/TextField";
import { Button } from "@/shared/components/ui/Button/Button";
import { LEADS_CONTENT as CONTENT } from "../../content";
import type { LeadsQuery } from "../../types";
import styles from "./LeadsFilters.module.css";

const ALL_GOALS = "";

const GOAL_FILTER_OPTIONS: readonly SelectOption[] = [
  { value: ALL_GOALS, label: CONTENT.allGoals },
  ...GOAL_OPTIONS.map(({ value, label }) => ({ value, label })),
];

function findGoal(value: string): LeadsQuery["objetivo"] {
  return GOAL_OPTIONS.find((goal) => goal.value === value)?.value;
}

interface LeadsFiltersProps {
  search: string;
  goal: LeadsQuery["objetivo"];
  hasActiveFilters: boolean;
  onSearchChange: (search: string) => void;
  onGoalChange: (goal: LeadsQuery["objetivo"]) => void;
  onClear: () => void;
}

export function LeadsFilters({
  search,
  goal,
  hasActiveFilters,
  onSearchChange,
  onGoalChange,
  onClear,
}: LeadsFiltersProps) {
  return (
    <div className={styles.filters}>
      <TextField
        label={CONTENT.searchLabel}
        type="search"
        name="busca"
        autoComplete="off"
        placeholder={CONTENT.searchPlaceholder}
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
      />
      <SelectField
        label={CONTENT.goalLabel}
        name="objetivo"
        options={GOAL_FILTER_OPTIONS}
        value={goal ?? ALL_GOALS}
        onChange={(event) => onGoalChange(findGoal(event.target.value))}
      />
      {hasActiveFilters && (
        <Button variant="ghost" className={styles.clear} onClick={onClear}>
          {CONTENT.clearFilters}
        </Button>
      )}
    </div>
  );
}
