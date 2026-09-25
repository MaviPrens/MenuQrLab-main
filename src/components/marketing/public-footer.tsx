import Link from "next/link";
import { footerNav } from "@/lib/navigation";
import { routes } from "@/lib/routes";
import { appConfig, displayValue } from "@/lib/config/app-config";
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
      <div className="mx-auto grid w-full max-w-[1240px] grid-cols-[repeat(auto-fit,minmax(210px,1fr))] gap-11 px-8 pt-[clamp(52px,5vw,76px)]">
        <div>
          <BrandLogo size="footer" className="mb-[18px]" />
          <p className="mb-[22px] max-w-[26em] font-mql-body text-[.9rem] leading-[1.6] text-mql-secondary">
            Professionally managed digital menus and QR infrastructure for modern restaurants.
          </p>
          <p className="mb-[6px] font-mql-body text-[.82rem] leading-[1.5] text-mql-muted">
            Support: {displayValue(appConfig.support.email)}
          </p>
          <a
            href="sms:+19546811177"
            className="inline-block font-mql-mono text-base font-medium text-mql-ink transition-colors hover:text-mql-text-accent"
          >
            (954) 681-1177
          </a>
          <p className="mt-[5px] font-mql-body text-[.78rem] leading-[1.5] text-mql-muted">
            Text only — no calls
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
            Managed service · No restaurant-owner accounts
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
