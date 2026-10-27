import { Logo } from "@/shared/components/brand/Logo/Logo";
import { Section } from "@/shared/components/layout/Section/Section";
import { MAIN_CONTENT_ID } from "@/shared/constants/a11y";

// TEMPORÁRIO: só para conferir a logo nos dois fundos. Sai quando a home for montada.
export default function Home() {
  return (
    <main id={MAIN_CONTENT_ID}>
      <Section>
        <Logo variant="light" />
      </Section>
      <Section tone="navy">
        <Logo variant="dark" />
      </Section>
    </main>
  );
}
