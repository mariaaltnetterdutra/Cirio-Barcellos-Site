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
    </>
  );
}
