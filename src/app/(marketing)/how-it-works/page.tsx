import type { Metadata } from "next";
import { MqlPageHeader } from "@/components/marketing/mql-page-header";
import { Steps, type Step } from "@/components/marketing/steps";
import { MqlClosingBand } from "@/components/marketing/mql-closing-band";
import { ScrollReveal } from "@/components/marketing/scroll-reveal";
import { routes } from "@/lib/routes";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "How MenuQrLab's fully managed service takes a restaurant from first enquiry to a live, QR-ready digital experience — and keeps it updated.",
};

const steps: Step[] = [
  {
    title: "Restaurant enquiry",
    description: "You tell us about your restaurant and goals. No accounts, no setup work on your side.",
  },
  {
    title: "Information collection",
    description: "Our team gathers your menu, brand assets, contact details and locations.",
  },
  {
    title: "Design & setup",
    description: "We build your branded restaurant page in one of five managed visual directions.",
  },
  {
    title: "Menu preparation",
    description: "We structure categories, products, prices, photos and dietary labels for you.",
  },
  { title: "QR configuration", description: "We configure QR codes that open your live experience." },
  { title: "Review", description: "You review a private preview. Nothing goes live until you approve it." },
  { title: "Publication", description: "We publish your experience and hand over the QR products." },
  {
    title: "Managed updates",
    description: "Send changes anytime — we keep menus, hours and campaigns up to date.",
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <section className="mx-auto w-full max-w-[1240px] px-8 pt-[clamp(52px,6vw,92px)]">
        <MqlPageHeader
          eyebrow="How It Works"
          title="From first enquiry to a live, QR-ready experience"
          titleMaxWidth="24em"
          description="How MenuQrLab's fully managed service takes a restaurant from first enquiry to a live, QR-ready digital experience — and keeps it updated."
          descriptionMaxWidth="36em"
        />
        <ScrollReveal>
          <Steps steps={steps} />
        </ScrollReveal>
      </section>

      <MqlClosingBand
        image={{ src: "/images/restaurants/anatolia-grill/cover.jpg", alt: "" }}
        eyebrow="Managed end to end"
        title="Ready to start your restaurant's setup?"
        description="Send an enquiry and our team will prepare a tailored plan."
        primary={{ label: "Request a Quote", href: routes.marketing.contact() }}
        secondary={{ label: "View Demo", href: routes.restaurant.home("pizza-house") }}
      />
    </>
  );
}
