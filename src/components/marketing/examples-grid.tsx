"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/shared/icon";
import { EmptyState } from "@/components/shared/states";
import { cn } from "@/lib/utils";

export interface ExampleRestaurant {
  slug: string;
  name: string;
  tagline: string;
  direction: string;
  directionLabel: string;
  cuisines: string[];
  href: string;
  /** Branding cover image; falls back to a neutral placeholder when absent. */
  image?: string | null;
}

interface ExamplesGridProps {
  restaurants: ExampleRestaurant[];
  directions: { id: string; label: string }[];
}

const ALL = "all";

/** Client-filtered grid of demo restaurant experiences. */
export function ExamplesGrid({ restaurants, directions }: ExamplesGridProps) {
  const [active, setActive] = useState<string>(ALL);

  const filtered = useMemo(
    () => (active === ALL ? restaurants : restaurants.filter((r) => r.direction === active)),
    [restaurants, active],
  );

  const tabs = [{ id: ALL, label: "All Examples" }, ...directions];

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter examples by style">
        {tabs.map((tab) => {
          const isActive = active === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActive(tab.id)}
              aria-pressed={isActive}
              className={cn(
                "text-small inline-flex min-h-11 items-center rounded-full border px-4 font-semibold transition-colors",
                isActive
                  ? "border-primary bg-primary text-white"
                  : "border-border bg-canvas text-text-secondary hover:border-primary hover:text-primary",
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon="Store"
          title="No demo experiences yet"
          description="Sample restaurant experiences will appear here as they are published."
        />
      ) : (
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((restaurant) => (
            <li key={restaurant.slug}>
              <article className="border-border bg-canvas shadow-card hover:shadow-lift flex h-full flex-col overflow-hidden rounded-[16px] border transition-shadow">
                <div className="bg-surface relative aspect-[16/10] w-full overflow-hidden">
                  <Image
                    src={restaurant.image ?? "/placeholders/restaurant.svg"}
                    alt={`${restaurant.name} demo experience`}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 33vw, 100vw"
                  />
                  <Badge intent="info" className="absolute top-3 left-3">
                    Demo
                  </Badge>
                </div>
                <div className="flex flex-1 flex-col gap-3 p-5">
                  <div className="text-small text-text-tertiary flex items-center gap-2 font-semibold">
                    <Icon name="Palette" className="text-primary size-4" aria-hidden />
                    <span>{restaurant.directionLabel}</span>
                  </div>
                  <h3 className="font-heading text-h3 text-text-primary font-bold">
                    {restaurant.name}
                  </h3>
                  {restaurant.tagline ? (
                    <p className="text-small text-text-secondary">{restaurant.tagline}</p>
                  ) : null}
                  {restaurant.cuisines.length ? (
                    <p className="text-small text-text-tertiary">
                      {restaurant.cuisines.join(" · ")}
                    </p>
                  ) : null}
                  <Button asChild variant="outline" size="sm" className="mt-auto w-fit">
                    <Link href={restaurant.href}>
                      View example
                      <Icon name="ArrowRight" aria-hidden />
                    </Link>
                  </Button>
                </div>
              </article>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
