import type { Metadata } from "next";
import { PrivacyPolicy } from "@/features/privacy/components/PrivacyPolicy/PrivacyPolicy";
import { ROUTES } from "@/shared/constants/routes";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description: "Como a Círio & Barcellos trata os dados de quem usa o site, conforme a LGPD.",
  alternates: { canonical: ROUTES.privacidade },
};

export default function PrivacyPage() {
  return <PrivacyPolicy />;
}
