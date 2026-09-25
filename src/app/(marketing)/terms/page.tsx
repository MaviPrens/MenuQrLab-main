import type { Metadata } from "next";
import { getLegalPage } from "@/content/legal";
import { getRepositories } from "@/data/repositories";
import { LegalPageLayout } from "@/components/legal/legal-page-layout";
import { appConfig } from "@/lib/config/app-config";

export const metadata: Metadata = {
  title: `Terms of Service · ${appConfig.appName}`,
  description:
    "The rules and guidelines for using the MenuQrLab website, a fully managed QR restaurant service.",
};

// Reflect admin-published content without a rebuild.
export const revalidate = 30;

export default async function TermsPage() {
  const page = (await getRepositories().legal.get("terms")) ?? getLegalPage("terms");
  return (
    <LegalPageLayout
      page={page}
      intro="These terms govern use of the MenuQrLab website. MenuQrLab is a fully managed service — restaurant owners do not register, log in, or manage content themselves."
    />
  );
}
