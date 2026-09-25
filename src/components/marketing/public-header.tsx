"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { marketingNav, primaryMarketingNav } from "@/lib/navigation";
import { routes } from "@/lib/routes";
import { appConfig } from "@/lib/config/app-config";
import { BrandLogo } from "@/components/marketing/brand-logo";
import { Icon } from "@/components/shared/icon";
import { LanguageSelector } from "@/components/shared/language-selector";
import { cn } from "@/lib/utils";

export function PublicHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-[60] border-b border-mql-hairline bg-white">
      <div className="mx-auto flex h-[78px] w-full max-w-[1240px] items-center gap-10 px-8">
        <Link href={routes.marketing.home()} aria-label={`${appConfig.appName} — home`}>
          <BrandLogo />
        </Link>

        <nav aria-label="Primary" className="ml-auto hidden items-center gap-[34px] lg:flex">
          {primaryMarketingNav.map((item) => {
            const active = pathname === item.href;
            return (
              <div key={item.href} className="flex flex-col items-center gap-[6px]">
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className="font-mql-body text-[11px] font-semibold tracking-[0.17em] text-mql-ink uppercase"
                >
                  {item.label}
                </Link>
                <span
                  className={cn("block h-px w-full", active ? "bg-mql-graphic" : "bg-transparent")}
                  aria-hidden
                />
              </div>
            );
          })}
          <LanguageSelector className="hidden xl:inline-flex" />
          <Link
            href={routes.marketing.contact()}
            className="border border-mql-ink bg-mql-ink px-[22px] py-[14px] font-mql-body text-[11px] font-bold tracking-[0.17em] text-white uppercase transition-colors hover:border-mql-text-accent hover:bg-mql-text-accent"
          >
            Request a Quote
          </Link>
        </nav>

        <button
          type="button"
          className="ml-auto inline-flex size-11 items-center justify-center text-mql-ink lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <Icon name={open ? "X" : "Menu"} className="size-6" aria-hidden />
        </button>
      </div>

      {open ? (
        <div id="mobile-nav" className="border-t border-mql-hairline bg-white lg:hidden">
          <nav aria-label="Mobile" className="mx-auto flex w-full max-w-[1240px] flex-col px-8 py-3">
            {marketingNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="py-3 font-mql-body text-[13px] font-semibold tracking-[0.08em] text-mql-ink uppercase"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-3 flex flex-col gap-3 border-t border-mql-hairline pt-3">
              <Link
                href={routes.marketing.contact()}
                onClick={() => setOpen(false)}
                className="border border-mql-ink bg-mql-ink px-[22px] py-[14px] text-center font-mql-body text-[11px] font-bold tracking-[0.17em] text-white uppercase"
              >
                Request a Quote
              </Link>
              <LanguageSelector className="px-1 pt-1" />
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
