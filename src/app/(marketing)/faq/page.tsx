import type { Metadata } from "next";
import { MqlPageHeader } from "@/components/marketing/mql-page-header";
import { FaqAccordion, type FaqItem } from "@/components/marketing/faq-accordion";
import { MqlClosingBand } from "@/components/marketing/mql-closing-band";
import { routes } from "@/lib/routes";
import { getRepositories } from "@/data/repositories";
import { titleCase } from "@/lib/utils";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Frequently asked questions about MenuQrLab's managed QR restaurant service — how it works, products, languages, updates and ordering.",
};

// Friendly labels for known category slugs; unknown ones fall back to title case.
const CATEGORY_LABELS: Record<string, string> = {
  general: "General",
  managed: "Managed service",
  qr: "QR",
  menu: "Menu & ordering",
  updates: "Updates & support",
};

// Reflect admin-published content without a rebuild.
export const revalidate = 30;

export default async function FaqPage() {
  const entries = await getRepositories().content.faq();
  const items: FaqItem[] = entries.map((e) => ({
    id: e.id,
    category: e.category,
    question: e.question,
    answer: e.answer,
  }));
  const categories = Array.from(new Set(entries.map((e) => e.category))).map((id) => ({
    id,
    label: CATEGORY_LABELS[id] ?? titleCase(id),
  }));

  return (
    <>
      <section className="mx-auto w-full max-w-[1000px] px-8 pt-[clamp(52px,6vw,92px)]">
        <MqlPageHeader
          eyebrow="FAQ"
          title="Frequently asked questions"
          description="Search or browse by category. Can't find an answer? Get in touch and we'll help."
          descriptionMaxWidth="36em"
        />
        <FaqAccordion items={items} categories={categories} />
      </section>

      <MqlClosingBand
        image={{ src: "/images/restaurants/cafe-mimoza/cover.jpg", alt: "" }}
        title="Still have a question?"
        description="Our team is happy to help with anything not covered here."
        primary={{ label: "Contact us", href: routes.marketing.contact() }}
      />
    </>
  );
}
