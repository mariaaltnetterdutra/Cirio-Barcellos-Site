import { useId } from "react";
import { cn } from "@/shared/utils/cn";
import styles from "./ChoiceGroup.module.css";

export interface ChoiceOption<TValue extends string> {
  value: TValue;
  label: string;
}

interface ChoiceGroupProps<TValue extends string> {
  legend: string;
  /** Também serve para achar o primeiro campo com erro e levar o foco até ele. */
  name: string;
  options: readonly ChoiceOption<TValue>[];
  value: TValue | undefined;
  onChange: (value: TValue) => void;
  error?: string;
  columns?: 1 | 2;
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
}: ChoiceGroupProps<TValue>) {
  const errorId = useId();

  return (
    <fieldset className={cn(styles.group, error && styles.invalid)} aria-describedby={error ? errorId : undefined}>
      <legend className={styles.legend}>{legend}</legend>
      <div className={cn(styles.options, columns === 2 && styles.twoColumns)}>
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
            <span className={styles.pill}>{option.label}</span>
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
