import { cn } from "@/lib/utils";

interface SectionDividerProps {
  /** Background utility class for the flat area above the wave (the section ending). */
  topBg?: string;
  /** Text-color utility class controlling the wave fill via currentColor (the section starting below). */
  bottomFill?: string;
  /** Mirror the wave horizontally so consecutive dividers don't look identical. */
  flip?: boolean;
  className?: string;
}

/**
 * Self-contained wave transition between two sections of different background
 * colors. Renders as a short band: `topBg` fills the top, and the curved SVG
 * shape (colored via `bottomFill` + currentColor) reads as the next section
 * rising up — replaces flat 1px borders with real visual rhythm.
 */
export function SectionDivider({
  topBg = "bg-canvas",
  bottomFill = "text-surface",
  flip = false,
  className,
}: SectionDividerProps) {
  return (
    <div
      className={cn("relative h-10 w-full overflow-hidden md:h-16", topBg, className)}
      aria-hidden
    >
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className={cn(
          "absolute inset-x-0 -bottom-px h-full w-full",
          bottomFill,
          flip && "scale-x-[-1]",
        )}
      >
        <path
          d="M0,64 C180,112 360,8 600,46 C840,84 1020,28 1260,54 C1350,66 1410,70 1440,62 L1440,120 L0,120 Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}
