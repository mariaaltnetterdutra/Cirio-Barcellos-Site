"use client";

import { useCallback, useState } from "react";
import { AUTH_CONTENT } from "@/features/auth/content";
import { LoginForm } from "@/features/auth/components/LoginForm/LoginForm";
import { useAdminToken } from "@/features/auth/hooks/useAdminToken";
import { clearSession } from "@/features/auth/services/sessionStore";
import { Logo } from "@/shared/components/brand/Logo/Logo";
import { Button } from "@/shared/components/ui/Button/Button";
import { cn } from "@/shared/utils/cn";
import { LeadsPanel } from "../LeadsPanel/LeadsPanel";
import styles from "./PanelGate.module.css";

export function PanelGate() {
  const token = useAdminToken();
  const [sessionEnded, setSessionEnded] = useState(false);

  const handleUnauthorized = useCallback(() => {
    setSessionEnded(true);
    clearSession();
  }, []);

  function handleSignOut() {
    setSessionEnded(false);
    clearSession();
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Logo />
        {token && (
          <Button variant="ghost" onClick={handleSignOut}>
            {AUTH_CONTENT.signOut}
          </Button>
        )}
      </header>

      {token === undefined && (
        <p className={styles.checking} role="status">
          {AUTH_CONTENT.checking}
        </p>
      )}
      {token === null && (
        <div className={cn("tone-slate", styles.login)}>
          <LoginForm notice={sessionEnded ? AUTH_CONTENT.expired : undefined} />
        </div>
      )}
      {token && <LeadsPanel token={token} onUnauthorized={handleUnauthorized} />}
    </div>
  );
}
