import Image from "next/image";
import { cn } from "@/lib/utils";

const ACTION_ROWS = ["Call Order", "Pick Your Meal", "Online Order", "Visit Us"];

/** The hero's floating restaurant-menu-card visual: table label, dish photo, 4 tap rows. */
export function MenuCardPreview() {
  return (
    <div className="absolute right-[-6px] bottom-[34px] w-[min(236px,44%)] border border-[rgba(20,20,20,.22)] bg-white">
      <div className="border-b border-mql-hairline px-4 pt-4 pb-[13px] text-center">
        <div className="mb-[7px] font-mql-mono text-[8.5px] font-medium tracking-[0.14em] text-mql-text-accent uppercase">
          Table 12
        </div>
        <div className="font-mql-display text-[17px] leading-[1.15] font-bold text-mql-ink">
          Pizza House
        </div>
      </div>
      <div className="relative h-[104px] border-b border-mql-hairline">
        <Image
          src="/images/restaurants/pizza-house/cover.jpg"
          alt=""
          fill
          className="object-cover"
          sizes="236px"
        />
      </div>
      <div className="px-[14px] pt-[6px] pb-[14px]">
        {ACTION_ROWS.map((label, index) => (
          <div
            key={label}
            className={cn(
              "flex items-baseline gap-2 py-[10px]",
              index < ACTION_ROWS.length - 1 && "border-b border-[rgba(20,20,20,.10)]",
            )}
          >
            <span className="font-mql-body text-[12.5px] font-medium text-mql-ink">{label}</span>
            <span className="-translate-y-[3px] flex-1 border-b border-mql-hairline" />
            <span className="font-mql-mono text-[8.5px] font-medium tracking-[0.08em] text-mql-text-accent">
              TAP
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
