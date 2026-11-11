import type { Metadata } from "next";
import { ConsortiumHero } from "@/features/consortium/components/ConsortiumHero/ConsortiumHero";
import { FaqSection } from "@/features/consortium/components/FaqSection/FaqSection";
import { GoalsSection } from "@/features/consortium/components/GoalsSection/GoalsSection";
import { HowItWorksSection } from "@/features/consortium/components/HowItWorksSection/HowItWorksSection";
import { PlansSection } from "@/features/consortium/components/PlansSection/PlansSection";
import { PortoBankSection } from "@/features/consortium/components/PortoBankSection/PortoBankSection";
import { SpecialistSection } from "@/features/consortium/components/SpecialistSection/SpecialistSection";
import { TrustStrip } from "@/features/consortium/components/TrustStrip/TrustStrip";
import { ConsortiumIntentProvider } from "@/features/consortium/state/ConsortiumIntentContext";
import { OrganizationJsonLd } from "@/shared/components/seo/OrganizationJsonLd";
import { ROUTES } from "@/shared/constants/routes";

export const metadata: Metadata = {
  alternates: { canonical: ROUTES.home },
};

export default function ConsortiumPage() {
  return (
    <ConsortiumIntentProvider>
      <OrganizationJsonLd />
      <ConsortiumHero />
      <TrustStrip />
      <GoalsSection />
      <PlansSection />
      <SpecialistSection />
      <HowItWorksSection />
      <PortoBankSection />
      <FaqSection />
    </ConsortiumIntentProvider>
  );
}
