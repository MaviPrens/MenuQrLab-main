export type ShowcaseKind = "wet-wipes" | "magnets";
export type ShowcaseItem = { id: string; image: string; alt: string };
export type ShowcaseConfig = { seconds: number; items: ShowcaseItem[] };

export const SHOWCASE_SECTIONS: Record<ShowcaseKind, string> = {
  "wet-wipes": "wet-wipes-showcase",
  magnets: "magnets-showcase",
};

export const DEFAULT_SHOWCASES: Record<ShowcaseKind, ShowcaseConfig> = {
  "wet-wipes": {
    seconds: 28,
    items: [{
      id: "village-pizza",
      image: "/images/showcase/village-pizza-wet-wipe.png",
      alt: "Village Pizza wet wipe design",
    }],
  },
  magnets: {
    seconds: 28,
    items: [{
      id: "best-pizza",
      image: "/images/showcase/best-pizza-magnet.png",
      alt: "Best Pizza magnet design",
    }],
  },
};

export function parseShowcase(raw: string | undefined, kind: ShowcaseKind): ShowcaseConfig {
  if (!raw) return DEFAULT_SHOWCASES[kind];
  try {
    const data: unknown = JSON.parse(raw);
    if (!data || typeof data !== "object") return DEFAULT_SHOWCASES[kind];
    const value = data as Record<string, unknown>;
    const seconds = typeof value.seconds === "number" && Number.isFinite(value.seconds)
      ? Math.min(80, Math.max(12, value.seconds))
      : DEFAULT_SHOWCASES[kind].seconds;
    const items = Array.isArray(value.items)
      ? value.items.filter((item): item is ShowcaseItem =>
          !!item && typeof item.id === "string" &&
          typeof item.image === "string" &&
          (item.image.startsWith("/images/") || item.image.startsWith("https://")) &&
          typeof item.alt === "string")
      : DEFAULT_SHOWCASES[kind].items;
    return { seconds, items: items.slice(0, 40) };
  } catch {
    return DEFAULT_SHOWCASES[kind];
  }
}
