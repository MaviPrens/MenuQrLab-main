import Link from "next/link";
import Image from "next/image";
import { MenuCardPreview } from "@/components/marketing/menu-card-preview";
import { QrMark } from "@/components/marketing/qr-mark";

export interface HeroCta {
  label: string;
  href: string;
}

interface HeroProps {
  eyebrow: string;
  title: string;
  description: string;
  primaryCta: HeroCta;
  secondaryCta: HeroCta;
  assurances: string[];
}

/** Home hero: eyebrow, H1, lead, CTAs, assurance line, and an in-scene photo with overlaid cards. */
export function Hero({ eyebrow, title, description, primaryCta, secondaryCta, assurances }: HeroProps) {
  return (
    <section className="mx-auto w-full max-w-[1240px] px-4 sm:px-8">
      <div className="grid grid-cols-1 items-center gap-8 pt-[clamp(48px,6vw,92px)] md:grid-cols-2 md:gap-[56px]">
        <div>
          <div className="mb-[30px] flex items-center gap-[14px]">
            <span className="block h-px w-[34px] bg-mql-graphic" />
            <span className="font-mql-mono text-[11px] font-medium tracking-[0.12em] text-mql-text-accent uppercase">
              {eyebrow}
            </span>
          </div>
          <h1 className="font-mql-display text-[clamp(2.55rem,5vw,4.35rem)] font-[640] leading-[1.035] tracking-[-0.012em] text-mql-ink [text-wrap:pretty]">
            {title}
          </h1>
          <p className="mt-[26px] max-w-[34em] font-mql-body text-[clamp(1.02rem,1.35vw,1.16rem)] leading-[1.62] text-mql-body">
            {description}
          </p>
          <div className="mt-9 flex flex-wrap gap-[14px]">
            <Link
              href={primaryCta.href}
              className="border border-mql-text-accent bg-mql-text-accent px-[30px] py-[19px] font-mql-body text-[11.5px] font-bold tracking-[0.16em] text-white uppercase transition-colors hover:border-mql-ink hover:bg-mql-ink"
            >
              {primaryCta.label}
            </Link>
            <Link
              href={secondaryCta.href}
              className="border border-mql-outline px-[30px] py-[19px] font-mql-body text-[11.5px] font-bold tracking-[0.16em] text-mql-ink uppercase transition-colors hover:border-mql-ink hover:bg-[rgba(20,20,20,.05)]"
            >
              {secondaryCta.label}
            </Link>
          </div>
          <div className="mt-10 flex flex-wrap gap-[30px] border-t border-mql-hairline pt-[18px]">
            {assurances.map((item) => (
              <span
                key={item}
                className="flex items-center gap-[9px] text-[13.5px] tracking-[0.01em] text-mql-body"
              >
                <span className="block h-[5px] w-[5px] bg-mql-graphic" />
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="relative flex min-h-[400px] md:min-h-[min(620px,78vh)]">
          <div className="relative min-h-[400px] flex-1 bg-mql-surface-alt md:min-h-[520px]">
            <Image
              src="/images/restaurants/pizza-house/category-pizzas.jpg"
              alt="Table setting with fresh pizzas"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 45vw, 90vw"
              priority
            />
          </div>
          <MenuCardPreview />
          <QrMark className="absolute top-[44px] left-[-10px] z-10 border border-[rgba(20,20,20,.22)] bg-white px-[13px] pt-[13px] pb-[10px]" />
        </div>
      </div>
    </section>
  );
}
