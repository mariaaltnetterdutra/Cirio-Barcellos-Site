import { ConsortiumHero } from "@/features/consortium/components/ConsortiumHero/ConsortiumHero";
import { GoalsSection } from "@/features/consortium/components/GoalsSection/GoalsSection";
import { HowItWorksSection } from "@/features/consortium/components/HowItWorksSection/HowItWorksSection";
import { PlansSection } from "@/features/consortium/components/PlansSection/PlansSection";
import { TrustStrip } from "@/features/consortium/components/TrustStrip/TrustStrip";
import { ConsortiumIntentProvider } from "@/features/consortium/state/ConsortiumIntentContext";

// A landing é montada seção por seção (planejamento V1, T12 a T21). O Provider deixa os
// objetivos e os planos marcarem respostas no formulário.
export default function ConsortiumPage() {
  return (
    <ConsortiumIntentProvider>
      <ConsortiumHero />
      <TrustStrip />
      <GoalsSection />
      <PlansSection />
      <HowItWorksSection />
    </ConsortiumIntentProvider>
  );
}
