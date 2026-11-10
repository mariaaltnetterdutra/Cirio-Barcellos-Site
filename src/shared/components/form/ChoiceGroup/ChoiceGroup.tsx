import { useId } from "react";
import { Icon, type IconName } from "@/shared/components/ui/Icon/Icon";
import { cn } from "@/shared/utils/cn";
import styles from "./ChoiceGroup.module.css";

export interface ChoiceOption<TValue extends string> {
  value: TValue;
  label: string;
  icon?: IconName;
}

interface ChoiceGroupProps<TValue extends string> {
  legend: string;
  /** Também serve para achar o primeiro campo com erro e levar o foco até ele. */
  name: string;
  options: readonly ChoiceOption<TValue>[];
  value: TValue | undefined;
  onChange: (value: TValue) => void;
  error?: string;
  columns?: 1 | 2 | 3;
  /** Pílulas mais baixas, para listas longas (valores, prazos). */
  compact?: boolean;
}

// Rádios de verdade (teclado com setas, leitor de tela), só que desenhados como "pílulas".
export function ChoiceGroup<TValue extends string>({
  legend,
  name,
  options,
  value,
  onChange,
  error,
  columns = 1,
  compact = false,
}: ChoiceGroupProps<TValue>) {
  const errorId = useId();

  return (
    <fieldset className={cn(styles.group, error && styles.invalid)} aria-describedby={error ? errorId : undefined}>
      <legend className={styles.legend}>{legend}</legend>
      <div
        className={cn(
          styles.options,
          columns === 2 && styles.twoColumns,
          columns === 3 && styles.threeColumns,
          compact && styles.compact,
        )}
      >
        {options.map((option) => (
          <label key={option.value} className={styles.option}>
            <input
              className={styles.input}
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
            />
            <span className={styles.pill}>
              {option.icon && <Icon name={option.icon} size="sm" className={styles.icon} />}
              {option.label}
            </span>
          </label>
        ))}
      </div>
      {error && (
        <p id={errorId} className={styles.error}>
          {error}
        </p>
      )}
    </fieldset>
  );
}
