export type HeroSceneKind = "wipes" | "magnets" | "fresheners";
export type HeroScene = { id: string; image: string; alt: string };
export type HeroSceneConfig = { seconds: number; items: HeroScene[] };

export const HERO_SCENE_SECTIONS: Record<HeroSceneKind, string> = {
  wipes: "hero-wipe-scenes",
  magnets: "hero-magnet-scenes",
  fresheners: "hero-freshener-scenes",
};

export const DEFAULT_HERO_SCENES: Record<HeroSceneKind, HeroSceneConfig> = {
  wipes: { seconds: 5, items: [
    { id: "rinaldis-table", image: "/images/lifestyle/table-rinaldis-pizzeria-v2.webp", alt: "Rinaldi's Pizza wet wipes on a pizzeria counter" },
    { id: "empire-table", image: "/images/lifestyle/table-empire-pizzeria-v2.webp", alt: "Empire Pizza wet wipes on a pizzeria counter" },
    { id: "golden-table", image: "/images/lifestyle/table-golden-pizzeria-v2.webp", alt: "Golden Pizza wet wipes on a pizzeria counter" },
  ] },
  magnets: { seconds: 6, items: [
    { id: "golden-palace-fridge", image: "/images/lifestyle/fridge-golden-palace-v3.webp", alt: "Golden Pizza and Palace Pizza magnets on a refrigerator" },
    { id: "palace-fridge", image: "/images/lifestyle/fridge-palace-liberty-v2.webp", alt: "Palace Pizza and Liberty Pizza magnets on a refrigerator" },
    { id: "liberty-fridge", image: "/images/lifestyle/fridge-liberty-house-v2.webp", alt: "Liberty Pizza and Pizza House magnets on a refrigerator" },
  ] },
  fresheners: { seconds: 7, items: [
    { id: "rinaldis-car", image: "/images/lifestyle/car-product.webp", alt: "Rinaldi's Pizza custom air freshener in a car" },
    { id: "husky-car", image: "/images/lifestyle/car-husky-product.webp", alt: "Husky Pizza custom air freshener in a car" },
    { id: "palace-car", image: "/images/lifestyle/car-palace-product.webp", alt: "Palace Pizza custom air freshener in a car" },
  ] },
};

export function parseHeroScenes(raw: string | undefined, kind: HeroSceneKind): HeroSceneConfig {
  if (!raw) return DEFAULT_HERO_SCENES[kind];
  try {
    const value: unknown = JSON.parse(raw);
    if (!value || typeof value !== "object") return DEFAULT_HERO_SCENES[kind];
    const data = value as Record<string, unknown>;
    const seconds = typeof data.seconds === "number" && Number.isFinite(data.seconds)
      ? Math.min(15, Math.max(2, data.seconds)) : DEFAULT_HERO_SCENES[kind].seconds;
    const items = Array.isArray(data.items) ? data.items.filter((item): item is HeroScene =>
      item && typeof item.id === "string" && typeof item.image === "string" &&
      (item.image.startsWith("/images/") || item.image.startsWith("https://")) &&
      typeof item.alt === "string") : DEFAULT_HERO_SCENES[kind].items;
    return { seconds, items: items.slice(0, 20) };
  } catch {
    return DEFAULT_HERO_SCENES[kind];
  }
}
