import { useSyncExternalStore } from "react";
import { getSessionToken, subscribeSession } from "../services/sessionStore";

/**
 * Token da equipe. `undefined` enquanto a página ainda não leu o navegador,
 * `null` quando não há sessão: assim a tela não pisca o login antes de saber.
 */
export function useAdminToken(): string | null | undefined {
  return useSyncExternalStore(subscribeSession, getSessionToken, () => undefined);
}
