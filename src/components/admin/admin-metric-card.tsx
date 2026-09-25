import { Icon } from "@/components/shared/icon";
import { cn } from "@/lib/utils";

interface AdminMetricCardProps {
  label: string;
  value: string | number;
  icon?: string;
  hint?: string;
  /** Marks the figure as illustrative demo data. */
  demo?: boolean;
  trend?: { direction: "up" | "down" | "flat"; label: string };
  intent?: "neutral" | "primary" | "success" | "warning";
  className?: string;
}

const INTENT_BG: Record<NonNullable<AdminMetricCardProps["intent"]>, string> = {
  neutral: "bg-surface-warm text-primary",
  primary: "bg-primary/10 text-primary",
  success: "bg-success/10 text-success",
  warning: "bg-warning/10 text-warning",
};

const TREND_ICON: Record<NonNullable<AdminMetricCardProps["trend"]>["direction"], string> = {
  up: "TrendingUp",
  down: "TrendingDown",
  flat: "Minus",
};

/** Calm metric card for admin dashboards. */
export function AdminMetricCard({
  label,
  value,
  icon,
  hint,
  demo,
  trend,
  intent = "neutral",
  className,
}: AdminMetricCardProps) {
  return (
    <div
      className={cn(
        "border-border bg-canvas shadow-card flex flex-col gap-3 rounded-[16px] border p-5",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <p className="text-small text-text-secondary font-medium">{label}</p>
        {icon ? (
          <span
            className={cn(
              "flex size-9 shrink-0 items-center justify-center rounded-[10px]",
              INTENT_BG[intent],
            )}
          >
            <Icon name={icon} className="size-5" aria-hidden />
          </span>
        ) : null}
      </div>
      <p className="font-display text-h1 text-text-primary leading-none">{value}</p>
      <div className="flex flex-wrap items-center gap-2">
        {trend ? (
          <span
            className={cn(
              "inline-flex items-center gap-1 text-xs font-semibold",
              trend.direction === "up" && "text-success",
              trend.direction === "down" && "text-danger",
              trend.direction === "flat" && "text-text-secondary",
            )}
          >
            <Icon name={TREND_ICON[trend.direction]} className="size-3.5" aria-hidden />
            {trend.label}
          </span>
        ) : null}
        {hint ? <span className="text-text-secondary text-xs">{hint}</span> : null}
        {demo ? (
          <span className="bg-accent/20 text-warning rounded-full px-2 py-0.5 text-[10px] font-semibold tracking-wide uppercase">
            Demo Data
          </span>
        ) : null}
      </div>
    </div>
  );
}
