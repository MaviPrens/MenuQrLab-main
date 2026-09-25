"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { LegalPage, LegalSection } from "@/domain/entities";
import type { LegalPageType } from "@/domain/enums";
import { Container } from "@/components/shared/container";
import { SectionDivider } from "@/components/shared/section-divider";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Icon } from "@/components/shared/icon";
import { EmptyState } from "@/components/shared/states";
import { useToast } from "@/components/ui/toast";
import { routes } from "@/lib/routes";
import { appConfig, displayValue } from "@/lib/config/app-config";
import { formatDate } from "@/lib/utils";
import { StickyLegalTOC, type TocItem } from "@/components/legal/sticky-legal-toc";

interface RelatedLink {
  type: LegalPageType;
  href: string;
  title: string;
  description: string;
  icon: string;
}

const RELATED: Record<LegalPageType, RelatedLink> = {
  privacy: {
    type: "privacy",
    href: routes.marketing.privacy(),
    title: "Privacy Policy",
    description: "How we handle personal data across the platform.",
    icon: "ShieldCheck",
  },
  terms: {
    type: "terms",
    href: routes.marketing.terms(),
    title: "Terms of Service",
    description: "The rules for using the MenuQrLab website.",
    icon: "Gavel",
  },
  cookies: {
    type: "cookies",
    href: routes.marketing.cookies(),
    title: "Cookie Policy",
    description: "Cookie categories and how to manage your choices.",
    icon: "Cookie",
  },
  "campaign-terms": {
    type: "campaign-terms",
    href: routes.marketing.campaignTerms(),
    title: "Campaign Terms",
    description: "Generic rules for promotions and reward mechanics.",
    icon: "ClipboardList",
  },
};

/** Split a plain-text body into paragraphs (no dangerouslySetInnerHTML). */
function toParagraphs(body: string): string[] {
  return body
    .split(/\n+/)
    .map((p) => p.trim())
    .filter((p) => p.length > 0);
}

interface LegalPageLayoutProps {
  page: LegalPage;
  /** Intro shown beneath the title (the design's policy summary line). */
  intro?: string;
  /** Extra content rendered after the policy sections (e.g. cookie panel). */
  children?: React.ReactNode;
}

export function LegalPageLayout({ page, intro, children }: LegalPageLayoutProps) {
  const { toast } = useToast();
  const [query, setQuery] = useState("");

  const heading = TITLES[page.type];

  const filteredSections = useMemo<LegalSection[]>(() => {
    const q = query.trim().toLowerCase();
    if (!q) return page.sections;
    return page.sections.filter(
      (s) => s.title.toLowerCase().includes(q) || s.body.toLowerCase().includes(q),
    );
  }, [page.sections, query]);

  const tocItems: TocItem[] = useMemo(
    () => filteredSections.map((s) => ({ id: s.id, title: s.title })),
    [filteredSections],
  );

  const related = (Object.keys(RELATED) as LegalPageType[])
    .filter((t) => t !== page.type)
    .map((t) => RELATED[t]);

  const handlePrint = () => {
    if (typeof window !== "undefined") window.print();
  };

  const handleDownload = () => {
    toast({
      title: "Download coming soon",
      description: "A downloadable copy of this document isn't available yet. Use Print for now.",
      intent: "info",
    });
  };

  const handleCopyLink = async (id: string) => {
    const url =
      typeof window !== "undefined"
        ? `${window.location.origin}${window.location.pathname}#${id}`
        : `#${id}`;
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(url);
        toast({
          title: "Link copied",
          description: "Section link copied to your clipboard.",
          intent: "success",
        });
      } else {
        if (typeof window !== "undefined") window.location.assign(`#${id}`);
        toast({
          title: "Jumped to section",
          description: "Clipboard isn't available in this browser.",
          intent: "info",
        });
      }
    } catch {
      toast({
        title: "Couldn't copy link",
        description: "Please copy the address from your browser bar.",
        intent: "danger",
      });
    }
  };

  const backToTop = () => {
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="bg-canvas pb-20">
      {/* Hero */}
      <section className="bg-surface relative overflow-hidden py-12 md:py-16">
        <div
          className="bg-dot-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black_40%,transparent_100%)] opacity-[0.35]"
          aria-hidden
        />
        <Container className="relative text-center">
          <p className="text-small text-primary-dark font-bold tracking-wide uppercase">
            {appConfig.appName} · Legal
          </p>
          <h1 className="font-display text-h1 text-text-primary md:text-display mt-2">{heading}</h1>
          {intro ? (
            <p className="text-body text-text-secondary mx-auto mt-4 max-w-2xl">{intro}</p>
          ) : null}
          <dl className="text-small text-text-secondary mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-1">
            <div className="flex items-center gap-1.5">
              <dt className="text-text-primary font-semibold">Last updated:</dt>
              <dd>{formatDate(page.lastUpdated)}</dd>
            </div>
            <div className="flex items-center gap-1.5">
              <dt className="text-text-primary font-semibold">Version:</dt>
              <dd>{page.version}</dd>
            </div>
            {page.status === "draft" ? (
              <span className="bg-warning/10 text-warning inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium">
                <Icon name="FileWarning" className="size-3.5" aria-hidden /> Draft
              </span>
            ) : null}
          </dl>

          <div className="no-print mt-6 flex flex-wrap items-center justify-center gap-2">
            <Button type="button" variant="outline" size="sm" onClick={handlePrint}>
              <Icon name="Printer" className="size-4" aria-hidden /> Print
            </Button>
            <Button type="button" variant="outline" size="sm" onClick={handleDownload}>
              <Icon name="Download" className="size-4" aria-hidden /> Download
            </Button>
          </div>
        </Container>
      </section>

      <SectionDivider topBg="bg-surface" bottomFill="text-canvas" />

      <Container className="mt-10">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* TOC column */}
          <aside className="no-print lg:col-span-4 xl:col-span-3">
            <div className="lg:sticky lg:top-24">
              {/* Search within policy */}
              <div className="relative mb-4">
                <Icon
                  name="Search"
                  className="text-text-tertiary pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2"
                  aria-hidden
                />
                <Input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search this policy…"
                  aria-label="Search within this policy"
                  className="pl-9"
                />
              </div>

              {/* Mobile TOC */}
              <details className="border-border bg-canvas mb-4 rounded-[12px] border lg:hidden">
                <summary className="text-small text-text-primary cursor-pointer list-none px-4 py-3 font-semibold">
                  <span className="flex items-center justify-between">
                    On this page
                    <Icon name="ChevronDown" className="size-4" aria-hidden />
                  </span>
                </summary>
                <nav aria-label="On this page" className="border-border border-t px-2 py-2">
                  {tocItems.length === 0 ? (
                    <p className="text-small text-text-secondary px-2 py-1">
                      No matching sections.
                    </p>
                  ) : (
                    tocItems.map((item) => (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        className="text-small text-text-secondary hover:bg-surface hover:text-text-primary block rounded-md px-2 py-1.5"
                      >
                        {item.title}
                      </a>
                    ))
                  )}
                </nav>
              </details>

              {/* Desktop sticky TOC */}
              <div className="hidden lg:block">
                <p className="text-text-tertiary mb-3 text-xs font-semibold tracking-wide uppercase">
                  On this page
                </p>
                {tocItems.length === 0 ? (
                  <p className="text-small text-text-secondary">No matching sections.</p>
                ) : (
                  <StickyLegalTOC items={tocItems} />
                )}
              </div>
            </div>
          </aside>

          {/* Reading column */}
          <article className="lg:col-span-8 xl:col-span-9">
            {filteredSections.length === 0 ? (
              <EmptyState
                icon="SearchX"
                title="No matching sections"
                description="Try a different search term to find the part of this policy you need."
                action={{ label: "Clear search", onClick: () => setQuery("") }}
              />
            ) : (
              <div className="max-w-[760px] space-y-10">
                {filteredSections.map((section) => (
                  <section key={section.id} id={section.id} className="scroll-mt-28">
                    <div className="group flex items-start justify-between gap-3">
                      <h2 className="font-heading text-h2 text-text-primary">{section.title}</h2>
                      <button
                        type="button"
                        onClick={() => handleCopyLink(section.id)}
                        aria-label={`Copy link to “${section.title}”`}
                        className="no-print text-text-tertiary hover:bg-surface hover:text-primary focus-visible:outline-primary mt-1 shrink-0 rounded-md p-1.5 transition-colors focus-visible:outline-2 focus-visible:outline-offset-1"
                      >
                        <Icon name="Link" className="size-4" aria-hidden />
                      </button>
                    </div>
                    <div className="mt-3 space-y-3">
                      {toParagraphs(section.body).map((para, i) => (
                        <p key={i} className="text-body text-text-secondary leading-relaxed">
                          {para}
                        </p>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            )}

            {/* Extra content slot (e.g. cookie preferences panel) */}
            {children ? <div className="mt-12 max-w-[760px]">{children}</div> : null}

            {/* Contact panel */}
            <div className="mt-12 max-w-[760px]">
              <Card className="bg-navy text-white">
                <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="font-heading text-h3 text-white">
                      Questions about this document?
                    </h2>
                    <p className="text-small mt-1 text-white/70">
                      Our team can help with privacy, terms and cookie questions.
                    </p>
                    <p className="text-small mt-2 text-white/70">
                      Email:{" "}
                      <span className="font-semibold text-white">
                        {displayValue(appConfig.support.email)}
                      </span>
                    </p>
                  </div>
                  <Button asChild className="no-print shrink-0">
                    <Link href={routes.marketing.contact()}>
                      <Icon name="Mail" className="size-4" aria-hidden />
                      Contact us
                    </Link>
                  </Button>
                </div>
              </Card>
            </div>
          </article>
        </div>

        {/* Related legal pages */}
        <section className="no-print border-border mt-16 border-t pt-10">
          <h2 className="font-heading text-h3 text-text-primary">Related legal documents</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
            {related.map((link) => (
              <Link
                key={link.type}
                href={link.href}
                className="group border-border bg-canvas shadow-card hover:border-primary flex items-start gap-3 rounded-[16px] border p-4 transition-colors"
              >
                <span className="bg-surface text-text-secondary group-hover:text-primary flex size-9 shrink-0 items-center justify-center rounded-full transition-colors">
                  <Icon name={link.icon} className="size-4" aria-hidden />
                </span>
                <span>
                  <span className="text-small text-text-primary group-hover:text-primary block font-semibold transition-colors">
                    {link.title}
                  </span>
                  <span className="text-small text-text-secondary mt-0.5 block">
                    {link.description}
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Back to top */}
        <div className="no-print mt-10 flex justify-center">
          <Button type="button" variant="ghost" size="sm" onClick={backToTop}>
            <Icon name="ArrowUp" className="size-4" aria-hidden />
            Back to top
          </Button>
        </div>
      </Container>
    </div>
  );
}

const TITLES: Record<LegalPageType, string> = {
  privacy: "Privacy Policy",
  terms: "Terms of Service",
  cookies: "Cookie Policy",
  "campaign-terms": "Campaign Terms",
};
