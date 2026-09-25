import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  /** Heading level — use "h1" for the page's primary heading. */
  as?: "h1" | "h2";
  /** "dark" inverts the text colors for use on navy section bands. */
  tone?: "light" | "dark";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  as: Heading = "h2",
  tone = "light",
  className,
}: SectionHeadingProps) {
  const dark = tone === "dark";
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl text-left",
        className,
      )}
    >
      {eyebrow ? (
        <span
          className={cn(
            "font-body text-small font-bold tracking-wide uppercase",
            dark ? "text-teal-300" : "text-primary-dark",
          )}
        >
          {eyebrow}
        </span>
      ) : null}
      <Heading className={cn("font-display text-h1", dark ? "text-white" : "text-text-primary")}>
        {title}
      </Heading>
      {description ? (
        <p className={cn("text-body", dark ? "text-white/70" : "text-text-secondary")}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
