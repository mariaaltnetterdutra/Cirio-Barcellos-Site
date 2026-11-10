import { FAQ_CONTENT as CONTENT } from "../../content";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: CONTENT.items.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

const serialized = JSON.stringify(structuredData).replace(/</g, "\\u003c");

export function FaqJsonLd() {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serialized }} />;
}
