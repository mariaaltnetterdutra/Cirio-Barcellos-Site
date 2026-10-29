import { ConsortiumHero } from "@/features/consortium/components/ConsortiumHero/ConsortiumHero";
import { TrustStrip } from "@/features/consortium/components/TrustStrip/TrustStrip";

// A landing é montada seção por seção (planejamento V1, T12 a T21).
export default function ConsortiumPage() {
  return (
    <>
      <ConsortiumHero />
      <TrustStrip />
    </>
  );
}
