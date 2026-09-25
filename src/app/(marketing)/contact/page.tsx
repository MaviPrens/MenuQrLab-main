import type { Metadata } from "next";
import { Container } from "@/components/shared/container";
import { SectionDivider } from "@/components/shared/section-divider";
import { Card } from "@/components/ui/card";
import { Icon } from "@/components/shared/icon";
import { EnquiryForm } from "@/components/forms/enquiry-form";
import { appConfig, displayValue } from "@/lib/config/app-config";

export const metadata: Metadata = {
  title: `Contact & Enquiry · ${appConfig.appName}`,
  description:
    "Tell us what your restaurant needs. MenuQrLab is a fully managed QR menu and ordering setup — request a quote, book a demo, or ask a question.",
};

const STEPS = [
  {
    title: "We review",
    body: "Our team looks at your restaurant and requirements and confirms the best fit.",
  },
  {
    title: "Custom quote",
    body: "We send a tailored proposal outlining scope, products and timelines.",
  },
  {
    title: "Managed setup",
    body: "Once approved, we build and deliver everything — you don't lift a finger.",
  },
];

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ design?: string }>;
}) {
  const { design } = await searchParams;
  return (
    <div className="bg-surface pb-20">
      {/* Hero */}
      <section className="bg-canvas relative overflow-hidden py-12 md:py-16">
        <div
          className="bg-dot-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black_40%,transparent_100%)] opacity-[0.35]"
          aria-hidden
        />
        <Container className="relative">
          <div className="max-w-2xl">
            <p className="text-small text-primary-dark font-bold tracking-wide uppercase">
              {appConfig.appName} · Contact
            </p>
            <h1 className="font-display text-h1 text-text-primary md:text-display mt-2">
              Tell us what your restaurant needs
            </h1>
            <p className="text-body text-text-secondary mt-4">
              We provide a fully managed setup, so your digital menu and QR experiences are up and
              running smoothly without you lifting a finger. No accounts, no checkout — just tell us
              about your restaurant.
            </p>
          </div>
        </Container>
      </section>

      <SectionDivider topBg="bg-canvas" bottomFill="text-surface" />

      <Container className="mt-10">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Form */}
          <div className="lg:col-span-2">
            <EnquiryForm presetDesign={design} />
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="space-y-6 lg:sticky lg:top-24">
              <Card className="bg-navy text-white">
                <div className="space-y-5 p-6">
                  <h2 className="font-heading text-h3 text-white">What happens next?</h2>
                  <ol className="space-y-4">
                    {STEPS.map((step, i) => (
                      <li key={step.title} className="flex gap-3">
                        <span className="bg-primary text-small flex size-8 shrink-0 items-center justify-center rounded-full font-bold text-white">
                          {i + 1}
                        </span>
                        <div>
                          <h3 className="text-small font-semibold text-white">{step.title}</h3>
                          <p className="text-small mt-0.5 text-white/70">{step.body}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              </Card>

              <Card>
                <div className="space-y-3 p-6">
                  <h2 className="font-heading text-h3 text-text-primary">
                    Prefer to reach out directly?
                  </h2>
                  <ul className="text-small text-text-secondary space-y-2">
                    <li className="flex items-center gap-2">
                      <Icon name="Mail" className="text-primary size-4" aria-hidden />
                      {displayValue(appConfig.support.email)}
                    </li>
                    <li className="flex items-center gap-2">
                      <Icon name="Phone" className="text-primary size-4" aria-hidden />
                      {displayValue(appConfig.support.phone)}
                    </li>
                    <li className="flex items-center gap-2">
                      <Icon name="MessageCircle" className="text-primary size-4" aria-hidden />
                      {displayValue(appConfig.support.whatsapp)}
                    </li>
                  </ul>
                  <p className="text-text-tertiary text-xs">
                    Managed service: we don&apos;t offer owner accounts or self-service checkout.
                  </p>
                </div>
              </Card>
            </div>
          </aside>
        </div>
      </Container>
    </div>
  );
}
