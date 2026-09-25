import type { Metadata } from "next";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { FeatureCard } from "@/components/marketing/feature-card";
import { CtaSection } from "@/components/marketing/cta-section";
import { appConfig } from "@/lib/config/app-config";
import { routes } from "@/lib/routes";
import { loadWebsiteCopy } from "@/lib/website-content";

export const metadata: Metadata = {
  title: "About",
  description:
    "MenuQrLab is a fully managed QR restaurant platform. We design, build and maintain restaurant experiences so restaurant teams can focus on the food.",
};

const pillars = [
  {
    icon: "Handshake",
    title: "A fully managed service",
    description:
      "We do the technical work. Restaurant owners never log in, build pages or manage software.",
  },
  {
    icon: "UtensilsCrossed",
    title: "Restaurant-focused design",
    description: "Every experience is designed around how guests actually order and visit.",
  },
  {
    icon: "QrCode",
    title: "QR connection",
    description: "Physical QR products open the same branded experience, instantly.",
  },
  {
    icon: "Eye",
    title: "A clear review process",
    description: "Nothing is published without your review and approval.",
  },
  {
    icon: "LifeBuoy",
    title: "Ongoing support",
    description: "Send changes anytime — menus, hours and campaigns stay accurate.",
  },
  {
    icon: "ShieldCheck",
    title: "Honest by default",
    description: "We don't invent statistics or claims. Demo content is always labelled as such.",
  },
];

// Reflect admin-published content without a rebuild.
export const revalidate = 30;

export default async function AboutPage() {
  const copy = await loadWebsiteCopy();
  return (
    <>
      <section className="bg-surface py-16 md:py-20">
        <Container>
          <SectionHeading
            as="h1"
            eyebrow={`About ${appConfig.appName}`}
            title={copy("about", "intro", "We manage the technology so you can manage the food")}
            description="MenuQrLab creates and maintains branded restaurant experiences connected to QR codes — delivered as a managed service, not a self-service tool."
          />
        </Container>
      </section>

      <section className="relative overflow-hidden py-16 md:py-20">
        <div
          className="bg-dot-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_20%,black_30%,transparent_100%)] opacity-[0.35]"
          aria-hidden
        />
        <Container className="relative">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {pillars.map((p) => (
              <FeatureCard
                key={p.title}
                icon={p.icon}
                title={p.title}
                description={p.description}
              />
            ))}
          </div>
        </Container>
      </section>

      <CtaSection
        title="Let's build your restaurant's experience"
        description="Start with an enquiry — our team takes it from there."
        primary={{ label: "Contact us", href: routes.marketing.contact(), icon: "ArrowRight" }}
        secondary={{ label: "How it works", href: routes.marketing.howItWorks() }}
      />
    </>
  );
}
