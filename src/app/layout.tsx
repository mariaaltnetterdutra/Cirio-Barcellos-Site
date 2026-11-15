import type { Metadata } from "next";
import { Fraunces, IBM_Plex_Mono, Public_Sans } from "next/font/google";
import { env } from "@/core/config/env";
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
  metadataBase: new URL(env.siteUrl),
  title: {
    default: SITE_METADATA.title,
    template: `%s | ${COMPANY.name}`,
  },
  description: SITE_METADATA.description,
  applicationName: COMPANY.name,
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: COMPANY.name,
    title: SITE_METADATA.title,
    description: SITE_METADATA.description,
    url: "/",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${fraunces.variable} ${publicSans.variable} ${plexMono.variable}`}
    >
      <body>
        {children}
      </body>
    </html>
  );
}
