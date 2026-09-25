import type { Metadata } from "next";
import Image from "next/image";
import { MqlPageHeader } from "@/components/marketing/mql-page-header";
import { MqlFeatureTile } from "@/components/marketing/mql-feature-tile";
import { MqlClosingBand } from "@/components/marketing/mql-closing-band";
import { ScrollReveal } from "@/components/marketing/scroll-reveal";
import { routes } from "@/lib/routes";
import { loadWebsiteCopy } from "@/lib/website-content";

export const metadata: Metadata = {
  title: "Platform Features",
  description:
    "Branded restaurant homepage, digital menu, product detail, contact & location, external ordering, QR, campaigns, languages, analytics and managed updates.",
};

const features = [
  { title: "Restaurant homepage", description: "A branded landing page built around your four key customer actions." },
  { title: "Digital menu", description: "Searchable categories, products, prices, photos and dietary labels." },
  { title: "Product detail", description: "Rich product pages with variants, allergen notes and availability." },
  { title: "Contact & location", description: "Phone, WhatsApp, email, address, map directions and opening hours." },
  { title: "External ordering", description: "Link directly to your existing online ordering and delivery platforms." },
  { title: "QR codes", description: "Custom QR codes for tables, windows, stickers and printed cards." },
  { title: "Campaigns", description: "Promotions and reward mechanics like Scan & Win, managed end to end." },
  { title: "Languages", description: "Multi-language experiences with a primary and additional languages." },
  { title: "Analytics", description: "Interaction reporting on scans, taps, menu views and action clicks." },
  { title: "Managed updates", description: "Send changes anytime — our team keeps everything accurate." },
  { title: "Reviewed publishing", description: "Nothing goes live without your review and approval." },
];

// Reflect admin-published content without a rebuild.
export const revalidate = 30;

export default async function FeaturesPage() {
  const copy = await loadWebsiteCopy();
  return (
    <>
      <section className="mx-auto w-full max-w-[1240px] px-8 pt-[clamp(52px,6vw,92px)]">
        <MqlPageHeader
          eyebrow="Platform Features"
          title={copy("features", "lead", "Everything we build, configure and maintain for you")}
          titleMaxWidth="22em"
        />
        <ScrollReveal>
          <div className="mt-[clamp(44px,5vw,72px)] grid grid-cols-[repeat(auto-fit,minmax(268px,1fr))] border-t border-l border-mql-hairline-grid bg-mql-surface-alt">
            {features.map((f, index) => (
              <MqlFeatureTile
                key={f.title}
                numeral={String(index + 1).padStart(2, "0")}
                title={f.title}
                description={f.description}
              />
            ))}
            <div className="relative min-h-[210px] border-r border-b border-mql-hairline">
              <Image
                src="/images/restaurants/pizza-house/cover.jpg"
                alt=""
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 33vw, 90vw"
              />
            </div>
          </div>
        </ScrollReveal>
      </section>

      <MqlClosingBand
        image={{ src: "/images/restaurants/bosphorus-kitchen/cover.jpg", alt: "" }}
        title="See the features in a live demo"
        description="Explore the Pizza House demo, then request a tailored quote."
        primary={{ label: "View Demo", href: routes.restaurant.home("pizza-house") }}
        secondary={{ label: "Request a Quote", href: routes.marketing.contact() }}
      />
    </>
  );
}
