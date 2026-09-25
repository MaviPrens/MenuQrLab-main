import type { Metadata } from "next";
import { HomeConcept } from "@/components/marketing/home-concept";
import { getRepositories } from "@/data/repositories";
import { isDatabaseConfigured } from "@/data/db/client";
import { parseShowcase, SHOWCASE_SECTIONS } from "@/lib/showcase";

export const metadata: Metadata = {
  title: "Homepage design preview",
  robots: { index: false, follow: false },
};

export const revalidate = 30;

export default async function HomePreviewPage() {
  const blocks = await getRepositories().content.websiteContent();
  const wipes = parseShowcase(blocks.find((block) => block.page === "home" && block.section === SHOWCASE_SECTIONS["wet-wipes"])?.body, "wet-wipes");
  const magnets = parseShowcase(blocks.find((block) => block.page === "home" && block.section === SHOWCASE_SECTIONS.magnets)?.body, "magnets");
  return <HomeConcept wipes={wipes} magnets={magnets} dbBacked={isDatabaseConfigured()} />;
}
