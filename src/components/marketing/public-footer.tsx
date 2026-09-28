import Link from "next/link";
import { footerNav } from "@/lib/navigation";
import { routes } from "@/lib/routes";
import { appConfig } from "@/lib/config/app-config";
import { BrandLogo } from "@/components/marketing/brand-logo";

const COLUMNS: { heading: string; key: keyof typeof footerNav }[] = [
  { heading: "Platform", key: "platform" },
  { heading: "Company", key: "company" },
  { heading: "Legal", key: "legal" },
];

export function PublicFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-mql-hairline-grid bg-mql-surface-alt">
      <div className="bg-[#fff0e2] px-5 py-10 sm:px-8 sm:py-14">
        <div className="mx-auto flex max-w-[1240px] flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-bold tracking-[.14em] text-[#bc4f22] uppercase">Let&apos;s make it happen</p>
            <h2 className="mt-2 font-mql-body text-2xl font-extrabold tracking-tight text-[#173047] sm:text-3xl">Good ideas can fit your budget.</h2>
            <p className="mt-2 max-w-[570px] text-sm leading-6 text-[#4d6070]">Tell us what your business needs. We&apos;ll recommend a practical option shaped around your goals and budget.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href={`tel:${appConfig.support.phone}`} className="inline-flex min-h-12 items-center justify-center rounded-xl border border-[#db9a79] px-5 text-sm font-bold text-[#a8431b] transition hover:bg-white">Just a call away</a>
            <Link href={appConfig.support.email ? `mailto:${appConfig.support.email}?subject=${encodeURIComponent("Request a quote")}` : `${routes.marketing.contact()}#enquiry-form`} className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#ed5b25] px-5 text-sm font-bold text-white transition hover:bg-[#d84e1d]">{appConfig.support.email ? "Get a quote by email" : "Request your quote"}</Link>
          </div>
        </div>
      </div>
      <div className="mx-auto grid w-full max-w-[1240px] grid-cols-[repeat(auto-fit,minmax(210px,1fr))] gap-11 px-8 pt-[clamp(52px,5vw,76px)]">
        <div>
          <BrandLogo size="footer" className="mb-[18px]" />
          <p className="mb-[22px] max-w-[26em] font-mql-body text-[.9rem] leading-[1.6] text-mql-secondary">
            Custom print products, digital menus and marketing support for local restaurants.
          </p>
          <p className="mb-[6px] font-mql-body text-[.82rem] leading-[1.5] text-mql-muted">
            Support: {appConfig.support.email ? <a href={`mailto:${appConfig.support.email}`} className="hover:underline">{appConfig.support.email}</a> : <Link href={`${routes.marketing.contact()}#enquiry-form`} className="hover:underline">Send a message</Link>}
          </p>
          <a
            href={`tel:${appConfig.support.phone}`}
            className="inline-block font-mql-mono text-base font-medium text-mql-ink transition-colors hover:text-mql-text-accent"
          >
            +1 (954) 681-1177
          </a>
          <p className="mt-[5px] font-mql-body text-[.78rem] leading-[1.5] text-mql-muted">
            Call or message us
          </p>
        </div>

        {COLUMNS.map((col) => (
          <div key={col.key}>
            <h2 className="mb-[18px] font-mql-mono text-[10.5px] font-medium tracking-[0.1em] text-mql-text-accent uppercase">
              {col.heading}
            </h2>
            <ul className="flex flex-col gap-[11px]">
              {footerNav[col.key].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="font-mql-body text-[.9rem] text-mql-secondary transition-colors hover:text-mql-ink"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mx-auto w-full max-w-[1240px] px-8">
        <div className="mt-[clamp(40px,4vw,60px)] flex flex-wrap items-center gap-x-[26px] gap-y-[10px] border-t border-mql-hairline-grid py-[22px] pb-[30px]">
          <span className="text-[.78rem] tracking-[0.02em] text-mql-muted">
            © {year} MenuQrLab. All rights reserved.
          </span>
          <a
            href="https://paksoft.com.tr"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex gap-[5px] text-[.78rem] text-mql-muted transition-colors hover:text-mql-ink"
          >
            <span>Developed by</span>
            <span className="font-semibold text-mql-text-accent">PakSoft</span>
          </a>
          <span className="min-w-[20px] flex-1" aria-hidden />
          <span className="text-[.78rem] tracking-[0.02em] text-mql-muted">
            Made for businesses of every size
          </span>
          <Link
            href={routes.admin.login()}
            className="border border-[rgba(20,20,20,.24)] px-[13px] py-[9px] font-mql-mono text-[9.5px] font-medium tracking-[0.1em] text-mql-text-accent uppercase transition-colors hover:border-mql-ink hover:text-mql-ink"
          >
            Staff access
          </Link>
        </div>
      </div>
    </footer>
  );
}
