import Link from "next/link";
import { footerNav } from "@/lib/navigation";
import { routes } from "@/lib/routes";
import { BrandLogo } from "@/components/marketing/brand-logo";

const COLUMNS: { heading: string; key: keyof typeof footerNav }[] = [
  { heading: "Platform", key: "platform" },
  { heading: "Company", key: "company" },
  { heading: "Legal", key: "legal" },
];

export function PublicFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden border-t border-[#234056] bg-[#112b40] text-white">
      <span aria-hidden className="mql-float pointer-events-none absolute -top-16 -right-12 size-44 rounded-full border-[24px] border-[#f26a31]/25 sm:size-64" />
      <span aria-hidden className="mql-float-delayed pointer-events-none absolute bottom-14 -left-12 size-28 rounded-full border-[18px] border-[#ffbe70]/15" />
      <div className="relative mx-auto grid w-full max-w-[1240px] grid-cols-[repeat(auto-fit,minmax(210px,1fr))] gap-11 px-8 pt-[clamp(52px,5vw,76px)]">
        <div>
          <BrandLogo size="footer" inverse className="mb-[18px]" />
          <p className="mb-[22px] max-w-[26em] font-mql-body text-[.9rem] leading-[1.6] text-[#d3e1e9]">
            Custom products and practical marketing that help local restaurants stay remembered.
          </p>
          <a href="mailto:sales@menuqrlab.com" className="block break-all font-mql-body text-sm text-[#ffd8b5] underline-offset-4 hover:underline">sales@menuqrlab.com</a>
          <a href="tel:+19546811177" className="mt-2 block font-mql-mono text-sm text-[#ffd8b5] underline-offset-4 hover:underline">(954) 681-1177</a>
          <a href="https://wa.me/19546811177" target="_blank" rel="noopener noreferrer" className="mt-2 inline-block font-mql-body text-sm text-[#ffd8b5] underline-offset-4 hover:underline">Chat on WhatsApp ↗</a>
        </div>

        {COLUMNS.map((col) => (
          <div key={col.key}>
            <h2 className="mb-[18px] font-mql-mono text-[10.5px] font-medium tracking-[0.1em] text-[#ffb983] uppercase">
              {col.heading}
            </h2>
            <ul className="flex flex-col gap-[11px]">
              {footerNav[col.key].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="font-mql-body text-[.9rem] text-[#d3e1e9] transition-colors hover:text-white hover:underline"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="relative mx-auto w-full max-w-[1240px] px-8">
        <div className="mt-[clamp(40px,4vw,60px)] flex flex-wrap items-center gap-x-[26px] gap-y-[10px] border-t border-white/15 py-[22px] pb-[30px]">
          <span className="text-[.78rem] tracking-[0.02em] text-[#a9c0ce]">
            © {year} MenuQrLab. All rights reserved.
          </span>
          <a
            href="https://paksoft.com.tr"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex gap-[5px] text-[.78rem] text-[#a9c0ce] transition-colors hover:text-white"
          >
            <span>Developed by</span>
            <span className="font-semibold text-[#ffb983]">PakSoft</span>
          </a>
          <span className="min-w-[20px] flex-1" aria-hidden />
          <span className="text-[.78rem] tracking-[0.02em] text-[#ffb983]">
            Good restaurants stay remembered.
          </span>
          <Link
            href={routes.admin.login()}
            className="border border-white/30 px-[13px] py-[9px] font-mql-mono text-[9.5px] font-medium tracking-[0.1em] text-white uppercase transition-colors hover:border-white"
          >
            Staff access
          </Link>
        </div>
      </div>
    </footer>
  );
}
