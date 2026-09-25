import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/marketing/hero";
import { PrimaryActions, type PrimaryAction } from "@/components/marketing/primary-actions";
import { MqlSectionIntro } from "@/components/marketing/mql-section-intro";
import { MqlClosingBand } from "@/components/marketing/mql-closing-band";
import { ScrollReveal } from "@/components/marketing/scroll-reveal";
import { routes } from "@/lib/routes";
import { appConfig } from "@/lib/config/app-config";
import { loadWebsiteCopy } from "@/lib/website-content";
import { cn } from "@/lib/utils";
import { getRepositories } from "@/data/repositories";
import { SHOWCASE_SECTIONS, parseShowcase } from "@/lib/showcase";
import { ShowcaseStrip } from "@/components/marketing/showcase-strip";
import { isDatabaseConfigured } from "@/data/db/client";

export const metadata: Metadata = {
  title: `${appConfig.appName} — Managed QR Restaurant Experiences`,
  description:
    "We manage the technology so you can manage the food. A fully branded digital menu and ordering experience for restaurants, powered by managed QR.",
};

const capabilityStrip = ["Branded Page", "Digital Menu", "Custom QR Codes", "Fully Managed"];

const primaryActions: PrimaryAction[] = [
  {
    icon: "Phone",
    title: "Call Order",
    description: "A direct line to your front desk. One tap to dial and place an order.",
  },
  {
    icon: "UtensilsCrossed",
    title: "Pick Your Meal",
    description:
      "High-resolution, appetizing digital menus that load instantly — no app download required.",
  },
  {
    icon: "ShoppingBag",
    title: "Online Order with Pay",
    description: "Links directly to your existing external ordering and delivery platforms.",
  },
  {
    icon: "MapPin",
    title: "Visit Us",
    description: "Integrated maps, directions and live operating hours.",
  },
];

// Reflect admin-published content without a rebuild.
export const revalidate = 30;

export default async function HomePage() {
  const copy = await loadWebsiteCopy();
  const showcaseBlocks = await getRepositories().content.websiteContent();
  const wipes = parseShowcase(showcaseBlocks.find((b) => b.page === "home" && b.section === SHOWCASE_SECTIONS["wet-wipes"])?.body, "wet-wipes");
  const magnets = parseShowcase(showcaseBlocks.find((b) => b.page === "home" && b.section === SHOWCASE_SECTIONS.magnets)?.body, "magnets");
  const dbBacked = isDatabaseConfigured();
  return (
    <main>
      <Hero
        eyebrow="Managed Digital Experience"
        title={copy("home", "hero", "Turn Every QR Scan Into a Better Restaurant Experience")}
        description="We manage the technology so you can manage the food. A fully branded, high-speed digital menu and ordering experience built for modern restaurants."
        primaryCta={{ label: "Request Your QR Package", href: routes.marketing.contact() }}
        secondaryCta={{
          label: "View Demo Restaurant",
          href: routes.restaurant.home("pizza-house"),
        }}
        assurances={["No fixed setup fees", "Custom-tailored pricing"]}
      />

      <div className="mx-auto w-full max-w-[1240px] px-4 sm:px-8">
        <div className="mt-[clamp(44px,5vw,72px)] grid grid-cols-2 border-t border-b border-mql-hairline sm:grid-cols-4">
          {capabilityStrip.map((label, index) => (
            <span
              key={label}
              className={cn(
                "px-2 py-[22px] text-center font-mql-mono text-[10.5px] font-medium tracking-[0.1em] text-mql-body uppercase",
                index < capabilityStrip.length - 1 && "border-r border-mql-hairline-light",
              )}
            >
              {label}
            </span>
          ))}
        </div>
      </div>

      <ScrollReveal>
        <section className="mx-auto w-full max-w-[1240px] px-4 pt-[clamp(64px,7vw,110px)] sm:px-8">
          <MqlSectionIntro
            numeral="01"
            eyebrow="Four Essential Actions"
            title="Everything Your Customer Needs, Instantly"
            description="A streamlined interface designed for fast, confident decisions from the moment a guest sits down."
          />
          <PrimaryActions actions={primaryActions} />
        </section>
      </ScrollReveal>

      <section className="mt-[clamp(72px,8vw,120px)] bg-[#fffdfa] py-[clamp(52px,6vw,88px)]" aria-labelledby="showcase-title">
        <div className="mx-auto w-full max-w-[1240px] px-4 sm:px-8">
          <div className="mb-[clamp(44px,5vw,76px)] text-center">
            <p className="font-mql-mono text-[11px] font-medium tracking-[.24em] text-mql-text-accent uppercase">
              Print. Digital. Together.
            </p>
            <h2 id="showcase-title" className="mt-4 font-serif text-[clamp(2.55rem,5.4vw,4.5rem)] font-normal leading-[1.04] tracking-[-.045em] text-mql-ink">
              Made for your restaurant
            </h2>
            <span className="mx-auto mt-5 block h-px w-16 bg-mql-text-accent" aria-hidden />
          </div>

          <ShowcaseStrip config={wipes} kind="wet-wipes" dbBacked={dbBacked}
            title="Custom Wet Wipes" description="Practical. Branded. Always remembered." />

          <div className="my-[clamp(38px,5vw,64px)] grid gap-6 border-y border-mql-hairline py-[clamp(28px,4vw,48px)] md:grid-cols-[1fr_1fr] md:items-center md:gap-16">
            <h3 className="max-w-[11em] font-serif text-[clamp(2.15rem,4.2vw,3.8rem)] font-normal leading-[1.02] tracking-[-.045em] text-mql-ink">
              Your brand,<br />in their hands
            </h3>
            <div className="md:border-l md:border-mql-hairline md:pl-16">
              <p className="max-w-[30em] text-base leading-[1.65] text-mql-body">
                Useful take-home print products keep your restaurant in mind long after the last bite. Every design is prepared around your own brand.
              </p>
              <Link href={routes.marketing.contact()}
                className="mt-5 inline-flex min-h-11 items-center rounded-full bg-mql-text-accent px-6 text-sm font-semibold text-white transition-colors hover:bg-mql-ink">
                Explore print products <span className="ml-3" aria-hidden>→</span>
              </Link>
            </div>
          </div>

          <ShowcaseStrip config={magnets} kind="magnets" dbBacked={dbBacked}
            title="Custom Fridge Magnets" description="Everyday reminders of great food." />
        </div>
      </section>

      <ScrollReveal>
        <MqlClosingBand
          size="home"
          image={{ src: "/images/restaurants/pizza-house/category-pizzas.jpg", alt: "" }}
          eyebrow="Managed end to end"
          title={copy("home", "cta", "Ready to upgrade your restaurant's digital experience?")}
          description="Let our team handle the technical details while you run the floor."
          primary={{ label: "Request a Quote", href: routes.marketing.contact() }}
          secondary={{ label: "View Demo", href: routes.restaurant.home("pizza-house") }}
        />
      </ScrollReveal>
    </main>
  );
}
