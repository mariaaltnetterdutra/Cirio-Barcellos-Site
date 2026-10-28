import { Logo } from "@/shared/components/brand/Logo/Logo";
import { Section } from "@/shared/components/layout/Section/Section";

// TEMPORÁRIO: só para conferir a logo nos dois fundos. Sai quando a home for montada.
export default function Home() {
  return (
    <>
      <Section>
        <Logo variant="light" />
      </Section>
      <Section tone="navy">
        <Logo variant="dark" />
      </Section>
    </>
  );
}
