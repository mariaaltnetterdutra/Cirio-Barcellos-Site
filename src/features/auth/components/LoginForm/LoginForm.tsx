"use client";

import { useState, type FormEvent } from "react";
import { ApiError } from "@/core/api/httpClient";
import { TextField } from "@/shared/components/form/TextField/TextField";
import { Button } from "@/shared/components/ui/Button/Button";
import { Eyebrow } from "@/shared/components/ui/Eyebrow/Eyebrow";
import { cn } from "@/shared/utils/cn";
import { AUTH_CONTENT as CONTENT } from "../../content";
import { login } from "../../services/authService";
import { saveSession } from "../../services/sessionStore";
import styles from "./LoginForm.module.css";

const TITLE_ID = "login-titulo";

function loginErrorMessage(error: unknown): string {
  if (!(error instanceof ApiError)) return CONTENT.errors.generic;
  if (error.kind === "unauthorized") return CONTENT.errors.wrongPassword;
  if (error.kind === "rate_limited") return CONTENT.errors.tooManyRequests;
  if (error.status === 503) return CONTENT.errors.disabled;
  return CONTENT.errors.generic;
}

interface LoginFormProps {
  notice?: string;
}

export function LoginForm({ notice }: LoginFormProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!password) {
      setError(CONTENT.errors.empty);
      return;
    }

    setIsSubmitting(true);
    setError(undefined);
    try {
      saveSession(await login(password));
    } catch (failure) {
      setError(loginErrorMessage(failure));
      setIsSubmitting(false);
    }
  }

  return (
    <section className={cn("tone-light", styles.wrapper)} aria-labelledby={TITLE_ID}>
      <Eyebrow>{CONTENT.eyebrow}</Eyebrow>
      <h1 id={TITLE_ID} className={styles.title}>
        {CONTENT.title}
      </h1>
      <p className={styles.lead}>{CONTENT.lead}</p>
      {notice && (
        <p className={styles.notice} role="status">
          {notice}
        </p>
      )}
      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <TextField
          label={CONTENT.passwordLabel}
          type="password"
          name="senha"
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          error={error}
          required
        />
        <Button type="submit" aria-busy={isSubmitting}>
          {isSubmitting ? CONTENT.submitting : CONTENT.submit}
        </Button>
      </form>
    </section>
  );
}
