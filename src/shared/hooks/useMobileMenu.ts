import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

export function useMobileMenu() {
  const pathname = usePathname();
  const [openedAt, setOpenedAt] = useState<string | null>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const isOpen = openedAt === pathname;

  const close = useCallback(() => setOpenedAt(null), []);
  const toggle = useCallback(
    () => setOpenedAt((current) => (current === pathname ? null : pathname)),
    [pathname],
  );

  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      close();
      toggleRef.current?.focus();
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, close]);

  return { isOpen, toggle, close, toggleRef };
}
