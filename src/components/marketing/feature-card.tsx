import { Icon } from "@/components/shared/icon";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  tone?: "default" | "primary" | "dark" | "warm";
  className?: string;
}

const toneStyles: Record<NonNullable<FeatureCardProps["tone"]>, string> = {
  default: "border-border bg-canvas text-text-primary hover:border-primary/20",
  primary: "border-transparent bg-gradient-brand text-white shadow-glow",
  dark: "border-transparent bg-navy text-white",
  warm: "border-transparent bg-surface-warm text-text-primary",
};

/** Compact feature/benefit card with an icon, title and description. */
export function FeatureCard({
  icon,
  title,
  description,
  tone = "default",
  className,
}: FeatureCardProps) {
  const inverted = tone === "primary" || tone === "dark";
  return (
    <div
      className={cn(
        "group shadow-card hover:shadow-lift flex h-full flex-col gap-3 rounded-[16px] border p-6 transition-all duration-300 hover:-translate-y-1",
        toneStyles[tone],
        className,
      )}
    >
      <span
        className={cn(
          "flex size-12 items-center justify-center rounded-[12px] transition-transform duration-300 group-hover:scale-105",
          inverted ? "bg-white/15 text-white" : "bg-surface-warm text-primary",
        )}
      >
        <Icon name={icon} className="size-6" aria-hidden />
      </span>
      <h3 className="font-heading text-h3 font-bold">{title}</h3>
      <p className={cn("text-small", inverted ? "text-white/80" : "text-text-secondary")}>
        {description}
      </p>
    </div>
  );
}
