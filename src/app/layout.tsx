import type { Metadata } from "next";
import { Fraunces, IBM_Plex_Mono, Public_Sans } from "next/font/google";
import { GoogleTagManager } from "@/core/analytics/GoogleTagManager";
import { COMPANY } from "@/shared/constants/company";
import { SITE_METADATA } from "@/shared/constants/site";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["600"],
});

const publicSans = Public_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["500"],
});

export const metadata: Metadata = {
  title: {
    default: SITE_METADATA.title,
    template: `%s | ${COMPANY.name}`,
  },
  description: SITE_METADATA.description,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${fraunces.variable} ${publicSans.variable} ${plexMono.variable}`}
    >
      <body>
        {children}
        <GoogleTagManager />
      </body>
    </html>
  );
}
