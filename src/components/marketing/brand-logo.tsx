import { cn } from "@/lib/utils";

interface BrandLogoProps {
  /** 23px in the header, 21px in the footer. */
  size?: "header" | "footer";
  inverse?: boolean;
  className?: string;
}

/** Two-tone "Menu"/"QrLab" wordmark with a letterhead-style underline rule. */
export function BrandLogo({ size = "header", inverse = false, className }: BrandLogoProps) {
  return (
    <span className={cn("inline-flex flex-col items-start gap-[5px]", className)}>
      <span
        className={cn(
          "font-mql-display leading-none font-bold tracking-[0.015em]",
          inverse ? "text-white" : "text-mql-ink",
          size === "header" ? "text-[23px]" : "text-[21px]",
        )}
      >
        Menu<span className="text-mql-text-accent">QrLab</span>
      </span>
      <span className={cn("block h-px w-full", inverse ? "bg-white/30" : "bg-mql-hairline-strong")} />
    </span>
  );
}
