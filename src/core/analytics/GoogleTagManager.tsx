import Script from "next/script";
import { env } from "@/core/config/env";

const GTM_ID_FORMAT = /^GTM-[A-Z0-9]+$/;

export function GoogleTagManager() {
  const id = env.gtmId;
  if (!id || !GTM_ID_FORMAT.test(id)) return null;

  return (
    <Script id="gtm" strategy="afterInteractive">
      {`window.dataLayer=window.dataLayer||[];window.dataLayer.push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=document.getElementsByTagName('script')[0],j=document.createElement('script');j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id=${id}';f.parentNode.insertBefore(j,f);`}
    </Script>
  );
}
