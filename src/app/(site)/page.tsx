import { ConsortiumHero } from "@/features/consortium/components/ConsortiumHero/ConsortiumHero";
import { FaqSection } from "@/features/consortium/components/FaqSection/FaqSection";
import { GoalsSection } from "@/features/consortium/components/GoalsSection/GoalsSection";
import { HowItWorksSection } from "@/features/consortium/components/HowItWorksSection/HowItWorksSection";
import { LeadFormSection } from "@/features/consortium/components/LeadFormSection/LeadFormSection";
import { PlansSection } from "@/features/consortium/components/PlansSection/PlansSection";
import { PortoBankSection } from "@/features/consortium/components/PortoBankSection/PortoBankSection";
import { SpecialistSection } from "@/features/consortium/components/SpecialistSection/SpecialistSection";
import { TrustStrip } from "@/features/consortium/components/TrustStrip/TrustStrip";
import { ConsortiumIntentProvider } from "@/features/consortium/state/ConsortiumIntentContext";

// O Provider deixa os objetivos e os planos marcarem respostas no formulário.
export default function ConsortiumPage() {
  return (
    <ConsortiumIntentProvider>
      <ConsortiumHero />
      <TrustStrip />
      <GoalsSection />
      <PlansSection />
      <SpecialistSection />
      <HowItWorksSection />
      <PortoBankSection />
      <LeadFormSection />
      <FaqSection />
    </ConsortiumIntentProvider>
  );
}
