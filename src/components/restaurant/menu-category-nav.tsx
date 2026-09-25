"use client";

import { Icon } from "@/components/shared/icon";
import { cn } from "@/lib/utils";

export interface MenuCategoryNavItem {
  id: string;
  name: string;
}

interface MenuCategoryNavProps {
  categories: MenuCategoryNavItem[];
  /** Current search query (controlled). */
  search: string;
  onSearchChange: (value: string) => void;
  /** Currently active category id, or "all" for everything. */
  activeId: string;
  onSelect: (id: string) => void;
}

/**
 * Search input + horizontally scrollable category chips for the digital menu.
 * Selecting a chip filters the product list (handled by the parent). The whole
 * control is sticky beneath the header so it stays reachable while scrolling.
 */
export function MenuCategoryNav({
  categories,
  search,
  onSearchChange,
  activeId,
  onSelect,
}: MenuCategoryNavProps) {
  const chips: MenuCategoryNavItem[] = [{ id: "all", name: "All" }, ...categories];

  return (
    <div className="border-border bg-canvas/95 sticky top-14 z-30 -mx-5 border-b px-5 pt-3 pb-3 backdrop-blur md:-mx-8 md:px-8">
      <div className="relative">
        <Icon
          name="Search"
          className="text-text-tertiary pointer-events-none absolute top-1/2 left-3 size-5 -translate-y-1/2"
          aria-hidden
        />
        <input
          type="search"
          inputMode="search"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search the menu"
          aria-label="Search the menu"
          className="border-input-border bg-canvas text-body text-text-primary placeholder:text-text-tertiary focus-visible:outline-primary h-11 w-full rounded-[12px] border pr-4 pl-10 focus-visible:outline-2 focus-visible:outline-offset-1"
        />
      </div>

      <div
        className="mt-3 flex [scrollbar-width:none] gap-2 overflow-x-auto [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        role="tablist"
        aria-label="Menu categories"
      >
        {chips.map((chip) => {
          const isActive = chip.id === activeId;
          return (
            <button
              key={chip.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onSelect(chip.id)}
              className={cn(
                "text-button focus-visible:outline-primary min-h-[40px] shrink-0 rounded-full border px-4 font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2",
                isActive
                  ? "bg-primary border-transparent text-white"
                  : "border-border bg-canvas text-text-secondary hover:bg-surface",
              )}
            >
              {chip.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
