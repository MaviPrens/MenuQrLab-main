import type { Metadata } from "next";
import { MqlPageHeader } from "@/components/marketing/mql-page-header";
import { PackageCard } from "@/components/marketing/package-card";
import { MqlClosingBand } from "@/components/marketing/mql-closing-band";
import { ScrollReveal } from "@/components/marketing/scroll-reveal";
import { routes } from "@/lib/routes";
import { getRepositories } from "@/data/repositories";

export const metadata: Metadata = {
  title: "Packages & Pricing",
  description:
    "Managed packages: Digital Starter, QR Business, Complete Restaurant Experience, and Multi-Location & Custom. Pricing is tailored — request a quote.",
};

// Reflect admin-published content without a rebuild.
export const revalidate = 30;

export default async function PackagesPage() {
  const packages = await getRepositories().content.packages();
  return (
    <>
      <section className="mx-auto w-full max-w-[1240px] px-8 pt-[clamp(52px,6vw,92px)]">
        <MqlPageHeader
          eyebrow="Packages"
          title="Managed packages, tailored pricing"
          titleMaxWidth="20em"
          description="Every restaurant is different, so pricing is custom-tailored. Tell us what you need and we'll prepare a quote — no fixed setup fees."
          descriptionMaxWidth="38em"
        />
        <ScrollReveal>
          <div className="mt-[clamp(44px,5vw,72px)] grid grid-cols-[repeat(auto-fit,minmax(272px,1fr))] border-t border-l border-mql-hairline-grid">
            {packages.map((p, index) => (
              <PackageCard
                key={p.id}
                numeral={String(index + 1).padStart(2, "0")}
                name={p.name}
                summary={p.summary}
                features={p.features}
                ctaHref={routes.marketing.contact()}
                highlighted={p.highlighted}
                badge={p.badge ?? undefined}
              />
            ))}
          </div>
        </ScrollReveal>
      </section>

      <MqlClosingBand
        image={{ src: "/images/restaurants/green-bowl/cover.jpg", alt: "" }}
        title="Tell us what your restaurant needs"
        description="Share your goals and we'll recommend the right package with clear pricing."
        primary={{ label: "Request a Quote", href: routes.marketing.contact() }}
      />
    </>
  );
}
