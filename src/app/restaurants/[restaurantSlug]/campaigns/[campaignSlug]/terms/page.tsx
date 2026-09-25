import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getRepositories } from "@/data/repositories";
import { routes } from "@/lib/routes";
import { resolveText } from "@/lib/i18n/locales";
import { formatDate } from "@/lib/utils";
import { Container } from "@/components/shared/container";
import { Icon } from "@/components/shared/icon";
import { restaurantMetadata } from "../../../metadata";

interface PageProps {
  params: Promise<{ restaurantSlug: string; campaignSlug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { restaurantSlug, campaignSlug } = await params;
  const repos = getRepositories();
  const restaurant = await repos.restaurants.getBySlug(restaurantSlug);
  if (!restaurant) return {};
  const campaign = await repos.campaigns.getBySlug(restaurant.id, campaignSlug);
  if (!campaign) return {};
  const title = resolveText(campaign.localizedTitle, "en");
  return restaurantMetadata(restaurant, {
    title: `${title} — Terms · ${restaurant.displayName || restaurant.name}`,
    description: `Campaign terms and reward rules for ${title}.`,
  });
}

const TBC = "To be confirmed";

export default async function CampaignTermsPage({ params }: PageProps) {
  const { restaurantSlug, campaignSlug } = await params;
  const repos = getRepositories();
  const restaurant = await repos.restaurants.getBySlug(restaurantSlug);
  if (!restaurant) notFound();

  const campaign = await repos.campaigns.getBySlug(restaurant.id, campaignSlug);
  if (!campaign) notFound();

  const title = resolveText(campaign.localizedTitle, "en");
  const rewardTitle = resolveText(campaign.reward.title, "en");
  const rewardDescription = resolveText(campaign.reward.description, "en");
  const organizer =
    campaign.organizer ?? restaurant.legalName ?? restaurant.displayName ?? restaurant.name;

  const glance: { label: string; value: string }[] = [
    { label: "Organizer", value: organizer || TBC },
    {
      label: "Campaign period",
      value:
        campaign.startDate || campaign.endDate
          ? `${formatDate(campaign.startDate)} – ${formatDate(campaign.endDate)}`
          : TBC,
    },
    {
      label: "Claim deadline",
      value: campaign.claimDeadline ? formatDate(campaign.claimDeadline) : TBC,
    },
    { label: "Terms version", value: campaign.termsVersion || TBC },
  ];

  return (
    <Container className="py-8">
      <div className="max-w-shell mx-auto">
        <Link
          href={routes.restaurant.campaign(restaurant.slug, campaign.slug)}
          className="text-button text-primary focus-visible:outline-primary mb-4 inline-flex items-center gap-1.5 font-bold hover:underline focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          <Icon name="ArrowLeft" className="size-4" aria-hidden />
          Back to campaign
        </Link>

        <span className="bg-surface-container text-text-secondary inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold tracking-wide uppercase">
          <Icon name="Scale" className="size-4" aria-hidden />
          Campaign terms &amp; conditions
        </span>

        <h1 className="font-display text-h1 text-text-primary mt-4 font-extrabold tracking-tight">
          {title} — rules &amp; details
        </h1>

        <dl className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {glance.map((item) => (
            <div
              key={item.label}
              className="border-border bg-canvas shadow-card rounded-[16px] border p-4"
            >
              <dt className="text-small text-text-secondary">{item.label}</dt>
              <dd className="font-heading text-body text-text-primary mt-1 font-bold">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-8 flex flex-col gap-6">
          <section className="border-border bg-canvas shadow-card rounded-[16px] border p-5">
            <h2 className="border-border font-heading text-h2 text-text-primary border-b pb-2 font-bold">
              1. Campaign organizer
            </h2>
            <p className="text-body text-text-secondary mt-3">
              This promotional campaign is organized and operated by {organizer || TBC}. Any
              organizer contact details not shown here are to be confirmed.
            </p>
          </section>

          <section className="border-border bg-canvas shadow-card rounded-[16px] border p-5">
            <h2 className="border-border font-heading text-h2 text-text-primary border-b pb-2 font-bold">
              2. Campaign period
            </h2>
            <p className="text-body text-text-secondary mt-3">
              {campaign.startDate || campaign.endDate
                ? `The campaign runs from ${formatDate(campaign.startDate)} to ${formatDate(
                    campaign.endDate,
                  )}. Participation outside this period is not eligible.`
                : "The campaign period is to be confirmed."}
            </p>
          </section>

          <section className="border-border bg-canvas shadow-card rounded-[16px] border p-5">
            <h2 className="border-border font-heading text-h2 text-text-primary border-b pb-2 font-bold">
              3. Eligibility
            </h2>
            <p className="text-body text-text-secondary mt-3">
              {campaign.eligibility ?? "Eligibility details are to be confirmed."}
            </p>
          </section>

          <section className="border-border bg-canvas shadow-card rounded-[16px] border p-5">
            <h2 className="border-border font-heading text-h2 text-text-primary border-b pb-2 font-bold">
              4. How to participate
            </h2>
            <ol className="text-body text-text-secondary mt-3 list-inside list-decimal space-y-2">
              <li>Visit {restaurant.displayName || restaurant.name} during the campaign period.</li>
              <li>Scan the official campaign QR code in-store.</li>
              <li>Reveal your reward and show this screen to staff when you order.</li>
            </ol>
            {campaign.attemptRules ? (
              <p className="text-small text-text-secondary mt-3">{campaign.attemptRules}</p>
            ) : null}
          </section>

          <section className="border-border bg-canvas shadow-card rounded-[16px] border p-5">
            <h2 className="border-border font-heading text-h2 text-text-primary border-b pb-2 font-bold">
              5. Available reward
            </h2>
            <p className="text-body text-text-secondary mt-3">
              <span className="text-text-primary font-semibold">{rewardTitle}</span>
              {campaign.reward.value ? ` — ${campaign.reward.value}` : ""}.
            </p>
            {rewardDescription ? (
              <p className="text-body text-text-secondary mt-2">{rewardDescription}</p>
            ) : null}
            {campaign.claimDeadline ? (
              <p className="text-small text-text-secondary mt-2">
                Rewards must be claimed by {formatDate(campaign.claimDeadline)}.
              </p>
            ) : null}
          </section>

          <section className="border-border bg-surface rounded-[16px] border p-5">
            <h2 className="font-heading text-h3 text-text-primary font-bold">
              No purchase of attempts
            </h2>
            <p className="text-small text-text-secondary mt-2">
              This is a simple thank-you offer. There is no gambling, no paid attempts and no
              customer account required. Rewards are fixed and revealed in a single tap.
            </p>
          </section>
        </div>
      </div>
    </Container>
  );
}
