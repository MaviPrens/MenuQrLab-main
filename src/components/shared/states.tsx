"use client";

import { Icon } from "@/components/shared/icon";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface StateProps {
  title: string;
  description?: string;
  icon?: string;
  className?: string;
  action?: { label: string; onClick: () => void };
  children?: React.ReactNode;
}

/** Reusable empty state. */
export function EmptyState({
  title,
  description,
  icon = "Inbox",
  className,
  action,
  children,
}: StateProps) {
  return (
    <div
      className={cn(
        "border-border bg-surface flex flex-col items-center justify-center gap-3 rounded-[16px] border border-dashed px-6 py-12 text-center",
        className,
      )}
      role="status"
    >
      <span className="bg-surface-container text-text-secondary flex size-12 items-center justify-center rounded-full">
        <Icon name={icon} className="size-6" aria-hidden />
      </span>
      <p className="font-heading text-h3 text-text-primary">{title}</p>
      {description ? (
        <p className="text-small text-text-secondary max-w-sm">{description}</p>
      ) : null}
      {action ? (
        <Button variant="secondary" size="sm" onClick={action.onClick}>
          {action.label}
        </Button>
      ) : null}
      {children}
    </div>
  );
}

/** Reusable error state with a retry affordance. */
export function ErrorState({
  title = "We couldn't load this section",
  description = "An unexpected problem occurred. You can retry without losing the rest of the page.",
  className,
  action,
}: Partial<StateProps>) {
  return (
    <div
      className={cn(
        "border-danger/20 bg-danger/5 flex flex-col items-center justify-center gap-3 rounded-[16px] border px-6 py-10 text-center",
        className,
      )}
      role="alert"
    >
      <span className="bg-danger/10 text-danger flex size-12 items-center justify-center rounded-full">
        <Icon name="AlertTriangle" className="size-6" aria-hidden />
      </span>
      <p className="font-heading text-h3 text-text-primary">{title}</p>
      {description ? (
        <p className="text-small text-text-secondary max-w-sm">{description}</p>
      ) : null}
      {action ? (
        <Button variant="secondary" size="sm" onClick={action.onClick}>
          {action.label}
        </Button>
      ) : null}
    </div>
  );
}
