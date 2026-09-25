import Link from "next/link";
import { cn } from "@/lib/utils";

interface PackageCardProps {
  numeral: string;
  name: string;
  summary: string;
  features: string[];
  ctaHref: string;
  ctaLabel?: string;
  highlighted?: boolean;
  badge?: string;
}

/**
 * Package card. Shows a "Request a Quote" CTA — never invented prices, since
 * pricing is custom-tailored by the managed service.
 */
export function PackageCard({
  numeral,
  name,
  summary,
  features,
  ctaHref,
  ctaLabel = "Request a Quote",
  highlighted = false,
  badge,
}: PackageCardProps) {
  return (
    <div
      className={cn(
        "flex h-full flex-col border-r border-b border-mql-hairline-grid p-[34px_30px_30px]",
        highlighted ? "bg-mql-tint" : "bg-mql-surface-alt",
      )}
    >
      <div className="flex min-h-[22px] items-start justify-between gap-[10px]">
        <span className="font-mql-mono text-[12.5px] tracking-[0.08em] text-mql-text-accent">
          {numeral}
        </span>
        {badge ? (
          <span className="bg-mql-text-accent px-[10px] py-[6px] font-mql-body text-[9px] font-bold tracking-[0.18em] text-white uppercase">
            {badge}
          </span>
        ) : null}
      </div>
      <h3 className="mt-[14px] mb-3 font-mql-display text-[1.55rem] leading-[1.14] font-[640] text-mql-ink">
        {name}
      </h3>
      <p className="mb-5 font-mql-body text-[.93rem] leading-[1.6] text-mql-secondary [text-wrap:pretty]">
        {summary}
      </p>
      <div className="mb-5 border-t border-b border-mql-hairline-grid py-4">
        <span className="font-mql-mono text-[.98rem] leading-[1.3] tracking-[-0.01em] text-mql-ink">
          Custom-tailored pricing
        </span>
      </div>
      <ul className="mb-[26px] flex flex-1 flex-col gap-[11px]">
        {features.map((feature) => (
          <li
            key={feature}
            className="flex gap-[11px] font-mql-body text-[.9rem] leading-[1.5] text-mql-secondary"
          >
            <span className="flex-none text-mql-text-accent">—</span>
            {feature}
          </li>
        ))}
      </ul>
      <Link
        href={ctaHref}
        className={cn(
          "px-5 py-[17px] text-center font-mql-body text-[11px] font-bold tracking-[0.16em] uppercase transition-colors",
          highlighted
            ? "border border-mql-text-accent bg-mql-text-accent text-white hover:border-mql-ink hover:bg-mql-ink"
            : "border border-mql-outline text-mql-ink hover:border-mql-ink hover:bg-mql-ink hover:text-white",
        )}
      >
        {ctaLabel}
      </Link>
    </div>
  );
}
