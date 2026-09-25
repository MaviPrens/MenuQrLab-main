import { Icon } from "@/components/shared/icon";
import { cn } from "@/lib/utils";

export interface PrimaryAction {
  icon: string;
  title: string;
  description: string;
}

/** The four primary restaurant actions as a flat, shared-hairline tile row. */
export function PrimaryActions({ actions }: { actions: PrimaryAction[] }) {
  return (
    <div className="grid grid-cols-1 border border-mql-hairline-grid bg-mql-surface-alt sm:grid-cols-2 xl:grid-cols-4">
      {actions.map((action, index) => (
        <div
          key={action.title}
          className={cn(
            "flex flex-col gap-[18px] p-[clamp(26px,2.6vw,36px)] transition-colors hover:bg-mql-surface-hover",
            index < actions.length - 1 && "border-r border-mql-hairline",
          )}
        >
          <div className="flex items-center justify-between">
            <span className="font-mql-mono text-[13px] tracking-[0.06em] text-mql-text-accent">
              {String(index + 1).padStart(2, "0")}
            </span>
            <Icon name={action.icon} className="size-[26px] text-mql-graphic" strokeWidth={1.25} />
          </div>
          <h3 className="font-mql-display text-[1.42rem] leading-[1.16] font-[640] text-mql-ink">
            {action.title}
          </h3>
          <span className="block h-px w-[38px] bg-[rgba(20,20,20,.20)]" />
          <p className="font-mql-body text-[.95rem] leading-[1.62] text-mql-secondary [text-wrap:pretty]">
            {action.description}
          </p>
        </div>
      ))}
    </div>
  );
}
