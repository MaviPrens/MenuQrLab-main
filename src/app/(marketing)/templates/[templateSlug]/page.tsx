import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Container } from "@/components/shared/container";
import { SectionDivider } from "@/components/shared/section-divider";
import { Icon } from "@/components/shared/icon";
import { Button } from "@/components/ui/button";
import { getRepositories } from "@/data/repositories";
import { routes } from "@/lib/routes";
import { slugify, titleCase } from "@/lib/utils";
import { presetForTemplate } from "@/lib/template-presets";
import type { Template } from "@/domain/entities";

interface PageProps {
  params: Promise<{ templateSlug: string }>;
}

const INCLUDED = [
  { icon: "Store", text: "Branded restaurant homepage with your four key actions" },
  { icon: "BookOpen", text: "Full digital menu — categories, prices, photos, dietary labels" },
  { icon: "QrCode", text: "Custom QR codes that open this page" },
  { icon: "ShoppingBag", text: "External ordering link, maps, directions and opening hours" },
  { icon: "Languages", text: "Multi-language support tailored to your guests" },
  { icon: "RefreshCw", text: "Fully managed setup and ongoing updates by our team" },
];

async function findTemplate(slug: string): Promise<Template | null> {
  const templates = await getRepositories().content.templates();
  return templates.find((t) => slugify(t.name) === slug) ?? null;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { templateSlug } = await params;
  const template = await findTemplate(templateSlug);
  if (!template) return { title: "Template not found" };
  return {
    title: `${template.name} — Restaurant Template`,
    description: template.description,
  };
}

export default async function TemplateDetailPage({ params }: PageProps) {
  const { templateSlug } = await params;
  const template = await findTemplate(templateSlug);
  if (!template) notFound();

  // A published restaurant in the same visual direction, to preview it live.
  const { items } = await getRepositories().restaurants.list({
    publishingStatus: "published",
    pageSize: 50,
  });
  const liveExample = items.find((r) => r.visualDirection === template.direction) ?? null;

  return (
    <div className="pb-20">
      <section className="bg-canvas py-6">
        <Container>
          <Link
            href={routes.marketing.templates()}
            className="text-small text-primary-dark inline-flex items-center gap-1.5 font-semibold hover:underline"
          >
            <Icon name="ArrowLeft" className="size-4" aria-hidden />
            All templates
          </Link>
        </Container>
      </section>

      <SectionDivider topBg="bg-canvas" bottomFill="text-surface" />

      <section className="bg-surface py-12 md:py-16">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-start">
            {/* Preview */}
            <div className="border-border bg-surface shadow-card relative aspect-[16/10] w-full overflow-hidden rounded-[20px] border">
              {template.image ? (
                <Image
                  src={template.image}
                  alt={`${template.name} visual direction preview`}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  priority
                />
              ) : (
                <div className="from-warm to-surface flex h-full w-full items-center justify-center bg-gradient-to-br">
                  <Icon name="Palette" className="text-primary/40 size-12" aria-hidden />
                </div>
              )}
            </div>

            {/* Details */}
            <div className="flex flex-col gap-5">
              <p className="text-small text-primary-dark font-bold tracking-wide uppercase">
                {titleCase(template.direction)} direction
              </p>
              <h1 className="font-display text-h1 text-text-primary md:text-display">
                {template.name}
              </h1>
              <p className="text-body text-text-secondary">{template.description}</p>
              <p className="text-small text-primary-dark inline-flex items-center gap-2 font-semibold">
                <Icon name="Sparkles" className="size-4" aria-hidden />
                Best for: {template.bestFor}
              </p>

              {/* Palette preview from the direction's branding preset. */}
              <div className="flex items-center gap-2">
                <span className="text-text-tertiary text-xs font-semibold tracking-wide uppercase">
                  Palette
                </span>
                <div className="flex gap-1.5">
                  {Object.values(presetForTemplate(template).colors).map((c) => (
                    <span
                      key={c}
                      className="border-border size-6 rounded-full border"
                      style={{ backgroundColor: c }}
                      title={c}
                    />
                  ))}
                </div>
              </div>

              <div className="mt-2 flex flex-wrap gap-3">
                <Button asChild size="lg">
                  <Link
                    href={`${routes.marketing.contact()}?design=${encodeURIComponent(template.name)}`}
                  >
                    <Icon name="ArrowRight" className="size-4" aria-hidden />
                    Request this design
                  </Link>
                </Button>
                {liveExample ? (
                  <Button asChild size="lg" variant="outline">
                    <Link
                      href={routes.restaurant.home(liveExample.slug)}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Icon name="Eye" className="size-4" aria-hidden />
                      See it live
                    </Link>
                  </Button>
                ) : null}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <SectionDivider topBg="bg-surface" bottomFill="text-canvas" flip />

      {/* What's included */}
      <section className="bg-canvas relative overflow-hidden py-14">
        <div
          className="bg-dot-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_10%,black_30%,transparent_100%)] opacity-[0.35]"
          aria-hidden
        />
        <Container className="relative">
          <h2 className="font-heading text-h2 text-text-primary font-bold">What&apos;s included</h2>
          <p className="text-small text-text-secondary mt-2 max-w-2xl">
            Every direction is delivered as a fully managed build — we tailor it to your brand,
            colours and photography. You never log in or manage software.
          </p>
          <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {INCLUDED.map((item) => (
              <li
                key={item.text}
                className="border-border bg-canvas shadow-card flex items-start gap-3 rounded-[16px] border p-5"
              >
                <span className="bg-surface-warm text-primary flex size-9 shrink-0 items-center justify-center rounded-[10px]">
                  <Icon name={item.icon} className="size-5" aria-hidden />
                </span>
                <span className="text-small text-text-primary">{item.text}</span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <SectionDivider topBg="bg-canvas" bottomFill="text-surface" />

      {/* Closing CTA */}
      <section className="bg-surface py-14">
        <Container>
          <div className="border-border bg-canvas shadow-card flex flex-col items-start gap-4 rounded-[20px] border p-8 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-heading text-h3 text-text-primary font-bold">
                Want your restaurant in the {template.name} style?
              </h2>
              <p className="text-small text-text-secondary mt-1">
                Tell us about your restaurant and we&apos;ll tailor this direction in your quote.
              </p>
            </div>
            <Button asChild size="lg">
              <Link
                href={`${routes.marketing.contact()}?design=${encodeURIComponent(template.name)}`}
              >
                Request this design
                <Icon name="ArrowRight" className="size-4" aria-hidden />
              </Link>
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
}
