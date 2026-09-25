import type { OpeningHours } from "@/domain/entities";
import { Icon } from "@/components/shared/icon";
import { EmptyState } from "@/components/shared/states";
import { cn } from "@/lib/utils";
import { DAY_LABELS, formatPeriods, getOpenState, orderedHours } from "./opening-hours";

interface OpeningHoursCardProps {
  hours: OpeningHours[];
  className?: string;
}

/** Weekly opening hours with today highlighted and a live open/closed line. */
export function OpeningHoursCard({ hours, className }: OpeningHoursCardProps) {
  if (hours.length === 0) {
    return (
      <EmptyState
        icon="Clock"
        title="Opening hours to be confirmed"
        description="Hours for this restaurant haven't been added yet."
        className={className}
      />
    );
  }

  const { isOpen, todayKey } = getOpenState(hours);
  const rows = orderedHours(hours);

  return (
    <div
      className={cn(
        "border-border bg-canvas shadow-card overflow-hidden rounded-[16px] border",
        className,
      )}
    >
      <ul>
        {rows.map((row) => {
          const isToday = row.day === todayKey;
          const closed = row.status === "closed" || row.periods.length === 0;
          return (
            <li
              key={row.day}
              className={cn(
                "border-border/60 flex items-center justify-between gap-3 border-b px-4 py-3 last:border-b-0",
                isToday && "border-l-primary bg-surface-warm border-l-4",
              )}
            >
              <div className="flex flex-col">
                <span className="font-body text-text-primary flex items-center gap-2 font-semibold">
                  {DAY_LABELS[row.day]}
                  {isToday ? (
                    <span className="bg-primary rounded px-1.5 py-0.5 text-[10px] font-bold tracking-wide text-white uppercase">
                      Today
                    </span>
                  ) : null}
                </span>
                {isToday ? (
                  <span
                    className={cn(
                      "flex items-center gap-1 text-xs font-bold",
                      isOpen ? "text-success" : "text-danger",
                    )}
                  >
                    <Icon
                      name={isOpen ? "CheckCircle2" : "XCircle"}
                      className="size-3.5"
                      aria-hidden
                    />
                    {isOpen ? "Open now" : "Closed now"}
                  </span>
                ) : null}
              </div>
              <span
                className={cn("text-body", closed ? "text-text-secondary" : "text-text-primary")}
              >
                {formatPeriods(row)}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
