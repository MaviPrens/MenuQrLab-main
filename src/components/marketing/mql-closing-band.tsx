import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface BandCta {
  label: string;
  href: string;
}

interface MqlClosingBandProps {
  /** "home" gets the eyebrow row and the larger vertical rhythm; "interior" (default) omits it. */
  size?: "home" | "interior";
  image: { src: string; alt: string };
  eyebrow?: string;
  title: string;
  description: string;
  primary: BandCta;
  secondary?: BandCta;
}

/** Full-bleed dark CTA band: photo at low opacity under a flat dark scrim. */
export function MqlClosingBand({
  size = "interior",
  image,
  eyebrow,
  title,
  description,
  primary,
  secondary,
}: MqlClosingBandProps) {
  const home = size === "home";
  return (
    <section
      className={cn(
        "relative overflow-hidden bg-mql-ink",
        home ? "mt-[clamp(64px,7vw,110px)]" : "mt-[clamp(64px,7vw,104px)]",
      )}
    >
      <div className={cn("absolute inset-0", home ? "opacity-30" : "opacity-[0.28]")}>
        <Image src={image.src} alt={image.alt} fill className="object-cover" sizes="100vw" />
      </div>
      <div className="absolute inset-0 bg-mql-scrim" />
      <div
        className={cn(
          "relative mx-auto w-full max-w-[1240px] px-8",
          home ? "py-[clamp(72px,8vw,128px)]" : "py-[clamp(64px,7vw,108px)]",
        )}
      >
        <div className={home ? "max-w-[46rem]" : undefined}>
          {home && eyebrow ? (
            <div className="mb-[26px] flex items-center gap-[14px]">
              <span className="block h-px w-[34px] bg-mql-on-dark" />
              <span className="font-mql-mono text-[11px] font-medium tracking-[0.12em] text-mql-dark-text uppercase">
                {eyebrow}
              </span>
            </div>
          ) : null}
          <h2
            className={cn(
              "font-mql-display font-[640] text-white [text-wrap:pretty]",
              home
                ? "text-[clamp(2rem,4vw,3.4rem)] leading-[1.07] tracking-[-0.01em]"
                : "max-w-[28em] text-[clamp(1.9rem,3.4vw,2.9rem)] leading-[1.08]",
            )}
          >
            {title}
          </h2>
          <p
            className={cn(
              "max-w-[32em] font-mql-body text-mql-dark-text",
              home ? "mt-6 text-[1.08rem] leading-[1.62]" : "mt-[22px] text-[1.06rem] leading-[1.6]",
            )}
          >
            {description}
          </p>
          <div className={cn("flex flex-wrap gap-[14px]", home ? "mt-[38px]" : "mt-[34px]")}>
            <Link
              href={primary.href}
              className="border border-white bg-white px-[30px] py-[19px] font-mql-body text-[11.5px] font-bold tracking-[0.16em] text-mql-ink uppercase transition-colors hover:border-mql-on-dark hover:bg-mql-on-dark"
            >
              {primary.label}
            </Link>
            {secondary ? (
              <Link
                href={secondary.href}
                className="border border-mql-on-dark-border px-[30px] py-[19px] font-mql-body text-[11.5px] font-bold tracking-[0.16em] text-white uppercase transition-colors hover:border-white hover:bg-mql-on-dark-hover"
              >
                {secondary.label}
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
