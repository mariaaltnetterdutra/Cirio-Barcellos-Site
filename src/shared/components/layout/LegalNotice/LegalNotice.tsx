import styles from "./LegalNotice.module.css";

// Texto do aviso legal do consórcio (protótipo, faixa acima do rodapé).
const LEGAL_TEXT =
  "As informações apresentadas nesta página possuem caráter informativo. Condições, valores, taxas, prazos, regras de contemplação, utilização do crédito e demais características estão sujeitas às condições vigentes do produto e do grupo contratado. A contemplação não possui prazo garantido e ocorre conforme as regras previstas contratualmente.";

export function LegalNotice() {
  return (
    <aside className={styles.notice} aria-label="Aviso legal">
      <p className={styles.text}>{LEGAL_TEXT}</p>
    </aside>
  );
}
