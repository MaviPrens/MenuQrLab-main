import type { Metadata } from "next";
import { HomeConcept } from "@/components/marketing/home-concept";
import { getRepositories } from "@/data/repositories";
import { isDatabaseConfigured } from "@/data/db/client";
import { parseShowcase, SHOWCASE_SECTIONS } from "@/lib/showcase";
import { HERO_SCENE_SECTIONS, parseHeroScenes } from "@/lib/hero-scenes";

export const metadata: Metadata = {
  title: "Homepage design preview",
  robots: { index: false, follow: false },
};

export const revalidate = 30;

export default async function HomePreviewPage() {
  const blocks = await getRepositories().content.websiteContent();
  const wipes = parseShowcase(blocks.find((block) => block.page === "home" && block.section === SHOWCASE_SECTIONS["wet-wipes"])?.body, "wet-wipes");
  const magnets = parseShowcase(blocks.find((block) => block.page === "home" && block.section === SHOWCASE_SECTIONS.magnets)?.body, "magnets");
  const scenes = {
    wipes: parseHeroScenes(blocks.find(block => block.page === "home" && block.section === HERO_SCENE_SECTIONS.wipes)?.body, "wipes"),
    magnets: parseHeroScenes(blocks.find(block => block.page === "home" && block.section === HERO_SCENE_SECTIONS.magnets)?.body, "magnets"),
    fresheners: parseHeroScenes(blocks.find(block => block.page === "home" && block.section === HERO_SCENE_SECTIONS.fresheners)?.body, "fresheners"),
  };
  return <HomeConcept wipes={wipes} magnets={magnets} scenes={scenes} dbBacked={isDatabaseConfigured()} />;
}
