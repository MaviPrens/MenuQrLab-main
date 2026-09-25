import type { CustomerAction } from "@/domain/entities";
import { resolveText } from "@/lib/i18n/locales";
import { Icon } from "@/components/shared/icon";
import { cn } from "@/lib/utils";
import { resolveActionLink } from "./action-link";

interface ContactCardProps {
  actions: CustomerAction[];
  className?: string;
}

interface ContactRow {
  id: string;
  icon: string;
  label: string;
  value: string;
  href: string;
  external: boolean;
}

/**
 * Read-only contact methods (phone, WhatsApp, email) rendered as tappable
 * rows. Only configured actions appear — we never fabricate a contact value.
 */
export function ContactCard({ actions, className }: ContactCardProps) {
  const rows: ContactRow[] = [];

  for (const action of actions) {
    if (!action.enabled) continue;
    if (action.type !== "call-order" && action.type !== "whatsapp" && action.type !== "email") {
      continue;
    }
    const { href, external } = resolveActionLink(action);
    if (!href) continue;

    const icon =
      action.type === "call-order"
        ? "Phone"
        : action.type === "whatsapp"
          ? "MessageCircle"
          : "Mail";
    const label =
      action.type === "call-order" ? "Call" : action.type === "whatsapp" ? "WhatsApp" : "Email";

    rows.push({
      id: action.id,
      icon,
      label,
      value: action.destination ?? resolveText(action.label, "en"),
      href,
      external,
    });
  }

  if (rows.length === 0) {
    return (
      <div
        className={cn(
          "border-border bg-canvas text-small text-text-secondary shadow-card rounded-[16px] border p-5",
          className,
        )}
      >
        Contact details to be confirmed.
      </div>
    );
  }

  return (
    <div
      className={cn(
        "divide-border border-border bg-canvas shadow-card divide-y overflow-hidden rounded-[16px] border",
        className,
      )}
    >
      {rows.map((row) => (
        <a
          key={row.id}
          href={row.href}
          {...(row.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          className="hover:bg-surface focus-visible:outline-primary flex min-h-[56px] items-center gap-3 px-4 py-3 transition-colors focus-visible:outline-2 focus-visible:outline-offset-[-2px]"
        >
          <span className="bg-surface-warm text-primary flex size-9 shrink-0 items-center justify-center rounded-full">
            <Icon name={row.icon} className="size-5" aria-hidden />
          </span>
          <span className="flex min-w-0 flex-1 flex-col">
            <span className="text-text-tertiary text-xs font-semibold tracking-wide uppercase">
              {row.label}
            </span>
            <span className="text-body text-text-primary truncate font-semibold">{row.value}</span>
          </span>
          <Icon name="ChevronRight" className="text-text-tertiary size-5 shrink-0" aria-hidden />
        </a>
      ))}
    </div>
  );
}
