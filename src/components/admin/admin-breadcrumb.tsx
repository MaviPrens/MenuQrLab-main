import Link from "next/link";
import { Icon } from "@/components/shared/icon";

export interface Crumb {
  label: string;
  href?: string;
}

/** Accessible admin breadcrumb trail. The last crumb is the current page. */
export function AdminBreadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="text-small text-text-secondary flex flex-wrap items-center gap-1.5">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={`${item.label}-${i}`} className="flex items-center gap-1.5">
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="hover:text-primary focus-visible:outline-primary rounded-[6px] px-0.5 focus-visible:outline-2 focus-visible:outline-offset-2"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className={isLast ? "text-text-primary font-semibold" : undefined}
                  aria-current={isLast ? "page" : undefined}
                >
                  {item.label}
                </span>
              )}
              {!isLast ? (
                <Icon name="ChevronRight" className="text-text-tertiary size-3.5" aria-hidden />
              ) : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
