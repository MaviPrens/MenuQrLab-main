import type { Metadata } from "next";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { SectionDivider } from "@/components/shared/section-divider";
import { TemplateCard } from "@/components/marketing/template-card";
import { CtaSection } from "@/components/marketing/cta-section";
import { routes } from "@/lib/routes";
import { slugify } from "@/lib/utils";
import { getRepositories } from "@/data/repositories";

export const metadata: Metadata = {
  title: "Restaurant Templates",
  description:
    "Five managed visual directions — Modern Fast Food, Warm Mediterranean, Premium Dining, Fresh & Healthy, and Café & Bakery — tailored to your brand by our team.",
};

// Reflect admin-published content without a rebuild.
export const revalidate = 30;

export default async function TemplatesPage() {
  const templates = await getRepositories().content.templates();
  return (
    <>
      <section className="bg-canvas relative overflow-hidden py-16 md:py-20">
        <div
          className="bg-dot-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black_40%,transparent_100%)] opacity-[0.35]"
          aria-hidden
        />
        <Container className="relative">
          <SectionHeading
            as="h1"
            eyebrow="Templates"
            title="Five managed starting directions"
            description="These are managed visual directions, not self-service themes. Our team tailors the chosen direction to your brand, colours and photography."
          />
        </Container>
      </section>

      <SectionDivider topBg="bg-canvas" bottomFill="text-surface" />

      <section className="bg-surface pt-10 pb-20">
        <Container>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {templates.map((t) => (
              <TemplateCard
                key={t.id}
                name={t.name}
                description={t.description}
                bestFor={t.bestFor}
                image={t.image}
                href={`/templates/${slugify(t.name)}`}
              />
            ))}
          </div>
        </Container>
      </section>

      <CtaSection
        title="Not sure which direction fits your restaurant?"
        description="Tell us about your brand and we'll recommend a direction in your quote."
        primary={{ label: "Request a Quote", href: routes.marketing.contact(), icon: "ArrowRight" }}
        secondary={{ label: "See examples", href: routes.marketing.restaurantExamples() }}
      />
    </>
  );
}
