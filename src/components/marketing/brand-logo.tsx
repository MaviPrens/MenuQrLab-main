import Image from "next/image";
import { cn } from "@/lib/utils";

interface BrandLogoProps {
  size?: "header" | "footer";
  inverse?: boolean;
  className?: string;
}

export function BrandLogo({ size = "header", inverse = false, className }: BrandLogoProps) {
  return (
    <span className={cn("inline-flex shrink-0 items-center", inverse && "drop-shadow-[0_0_2px_rgba(255,255,255,0.35)]", className)}>
      <Image
        src="/images/brand/menuqrlab-logo-ribbon.webp"
        alt="MenuQrLab — Production Prices. Agency-Quality Marketing."
        width={1000}
        height={500}
        priority={size === "header"}
        className={cn("block h-auto object-contain", size === "header" ? "w-[160px] sm:w-[186px]" : "w-[230px] sm:w-[260px]")}
      />
    </span>
  );
}
