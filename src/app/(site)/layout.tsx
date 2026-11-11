import { AttributionTracker } from "@/core/analytics/AttributionTracker";
import { WhatsAppClickTracker } from "@/core/analytics/WhatsAppClickTracker";
import { FloatingActions } from "@/features/consortium/components/FloatingActions/FloatingActions";
import { LegalNotice } from "@/shared/components/layout/LegalNotice/LegalNotice";
import { SiteFooter } from "@/shared/components/layout/SiteFooter/SiteFooter";
import { SiteHeader } from "@/shared/components/layout/SiteHeader/SiteHeader";
import { MAIN_CONTENT_ID, SKIP_LINK_LABEL } from "@/shared/constants/a11y";

export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <a className="skip-link" href={`#${MAIN_CONTENT_ID}`}>
        {SKIP_LINK_LABEL}
      </a>
      <SiteHeader />
      <main id={MAIN_CONTENT_ID}>{children}</main>
      <LegalNotice />
      <SiteFooter />
      <FloatingActions />
      <AttributionTracker />
      <WhatsAppClickTracker />
    </>
  );
}
