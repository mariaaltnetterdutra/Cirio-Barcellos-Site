"use client";

import { useRef } from "react";
import { SECTION_IDS } from "@/shared/constants/routes";
import { SIMULATION_CONTENT as CONTENT } from "../../content";
import { useLeadForm } from "../../hooks/useLeadForm";
import { ChoicesStep } from "./ChoicesStep";
import { ContactStep } from "./ContactStep";
import styles from "./SimulationCard.module.css";

const TITLE_ID = "simulacao-titulo";
const TOTAL_STEPS = 2;

// tabIndex -1: o clique num objetivo ou plano rola até aqui e leva o foco junto.
export function SimulationCard() {
  const formRef = useRef<HTMLFormElement>(null);
  const form = useLeadForm(formRef);
  const { values, step } = form;

  return (
    <section id={SECTION_IDS.analise} aria-labelledby={TITLE_ID} tabIndex={-1} className={`tone-light ${styles.card}`}>
      <div className={styles.progress}>
        <p className={styles.step}>{CONTENT.stepLabel(step, TOTAL_STEPS)}</p>
        <div className={styles.bar} aria-hidden="true">
          <span className={styles.barFill} style={{ width: `${(step / TOTAL_STEPS) * 100}%` }} />
        </div>
      </div>

      <h2 id={TITLE_ID} className={styles.title}>
        {step === 1 ? CONTENT.title : CONTENT.contactTitle}
      </h2>
      {step === 2 && <p className={styles.lead}>{CONTENT.contactLead}</p>}

      <form ref={formRef} className={styles.form} onSubmit={form.handleSubmit} noValidate>
        {step === 1 ? <ChoicesStep form={form} /> : <ContactStep form={form} />}

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
      </form>
    </section>
  );
}
