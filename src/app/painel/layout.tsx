import type { Metadata } from "next";
import type { ReactNode } from "react";
import { MAIN_CONTENT_ID, SKIP_LINK_LABEL } from "@/shared/constants/a11y";

export const metadata: Metadata = {
  title: "Painel de pedidos",
  robots: { index: false, follow: false },
};

export default function PanelLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <a className="skip-link" href={`#${MAIN_CONTENT_ID}`}>
        {SKIP_LINK_LABEL}
      </a>
      <main id={MAIN_CONTENT_ID}>{children}</main>
    </>
  );
}
