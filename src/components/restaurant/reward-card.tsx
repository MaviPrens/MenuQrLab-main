import type { CampaignReward } from "@/domain/entities";
import { resolveText } from "@/lib/i18n/locales";
import { formatDate } from "@/lib/utils";
import { Icon } from "@/components/shared/icon";

interface RewardCardProps {
  reward: CampaignReward;
  /** ISO deadline by which the reward must be claimed. */
  claimDeadline?: string | null;
}

const REWARD_TYPE_LABEL: Record<CampaignReward["type"], string> = {
  discount: "Discount",
  "free-item": "Free item",
  points: "Loyalty points",
  voucher: "Voucher",
};

/**
 * Revealed reward result. Shows the configured reward, its value and claim
 * validity. Presentation only — the reveal interaction lives in the client
 * participation component.
 */
export function RewardCard({ reward, claimDeadline }: RewardCardProps) {
  const title = resolveText(reward.title, "en");
  const description = resolveText(reward.description, "en");

  return (
    <div className="border-success/30 bg-success/5 overflow-hidden rounded-[20px] border">
      <div className="bg-success flex items-center gap-2 px-5 py-3 text-white">
        <Icon name="PartyPopper" className="size-5" aria-hidden />
        <span className="text-button font-bold">Reward unlocked</span>
      </div>
      <div className="space-y-4 p-5 text-center">
        <span className="bg-surface-warm text-primary mx-auto flex size-16 items-center justify-center rounded-full">
          <Icon name="Gift" className="size-8" aria-hidden />
        </span>
        <div>
          <span className="bg-surface-container text-text-secondary inline-block rounded-full px-3 py-0.5 text-xs font-semibold">
            {REWARD_TYPE_LABEL[reward.type]}
          </span>
          <h3 className="font-heading text-h2 text-text-primary mt-2 font-bold">{title}</h3>
          {reward.value ? (
            <p className="text-body text-primary mt-1 font-semibold">{reward.value}</p>
          ) : null}
          {description ? (
            <p className="text-small text-text-secondary mt-2">{description}</p>
          ) : null}
        </div>

        <div className="border-border bg-canvas rounded-[12px] border p-4 text-left">
          <p className="text-small text-text-primary flex items-center gap-2 font-semibold">
            <Icon name="BadgeCheck" className="text-primary size-4" aria-hidden />
            How to claim
          </p>
          <p className="text-small text-text-secondary mt-1">
            Show this screen to a member of staff at the counter when you order. No screenshot,
            account or payment is required.
          </p>
          {claimDeadline ? (
            <p className="text-text-secondary mt-2 flex items-center gap-2 text-xs">
              <Icon name="Clock" className="size-3.5" aria-hidden />
              Claim by {formatDate(claimDeadline)}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
