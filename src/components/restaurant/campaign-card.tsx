import Link from "next/link";
import type { Campaign } from "@/domain/entities";
import { routes } from "@/lib/routes";
import { resolveText } from "@/lib/i18n/locales";
import { Icon } from "@/components/shared/icon";

interface CampaignCardProps {
  restaurantSlug: string;
  campaign: Campaign;
}

/**
 * Promo banner linking to a Scan & Win campaign. Warm orange/red surface with a
 * yellow accent badge — short, high-impact copy, no gambling visuals.
 */
export function CampaignCard({ restaurantSlug, campaign }: CampaignCardProps) {
  const title = resolveText(campaign.localizedTitle, "en");
  const description = resolveText(campaign.localizedDescription, "en");

  return (
    <Link
      href={routes.restaurant.campaign(restaurantSlug, campaign.slug)}
      className="group bg-primary shadow-card focus-visible:outline-primary relative block overflow-hidden rounded-[20px] p-6 text-white transition-transform focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.99]"
    >
      <div className="relative z-10">
        <div className="mb-3 flex items-center gap-3">
          <span className="bg-accent text-navy flex size-11 items-center justify-center rounded-[12px]">
            <Icon name="QrCode" className="size-6" aria-hidden />
          </span>
          <h2 className="font-heading text-h2 font-bold">{title}</h2>
        </div>
        {description ? (
          <p className="text-small mb-5 max-w-[90%] leading-relaxed text-white/90">{description}</p>
        ) : null}
        <span className="text-button text-primary shadow-card inline-flex items-center gap-2 rounded-[12px] bg-white px-5 py-2.5 font-bold transition-all group-hover:gap-3">
          Reveal today&apos;s reward
          <Icon name="ArrowRight" className="size-4" aria-hidden />
        </span>
      </div>
      <Icon
        name="UtensilsCrossed"
        className="pointer-events-none absolute -right-6 -bottom-6 size-44 rotate-12 text-white/10"
        aria-hidden
      />
    </Link>
  );
}
