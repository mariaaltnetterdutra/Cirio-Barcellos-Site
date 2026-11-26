import { useSyncExternalStore } from "react";
import { getSessionToken, subscribeSession } from "../services/sessionStore";

export function useAdminToken(): string | null | undefined {
  return useSyncExternalStore(subscribeSession, getSessionToken, () => undefined);
}
