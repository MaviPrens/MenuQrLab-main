"use client";

import { useState } from "react";
import type { CampaignReward } from "@/domain/entities";
import { resolveText } from "@/lib/i18n/locales";
import { Icon } from "@/components/shared/icon";
import { RewardCard } from "./reward-card";

interface CampaignRevealProps {
  reward: CampaignReward;
  claimDeadline?: string | null;
  /** Whether the campaign is currently active and rewards can be revealed. */
  active: boolean;
}

/**
 * Tasteful, single-tap reward reveal. No wheels, slots, countdowns or paid
 * attempts — the reward is fixed and simply revealed. Before the tap we show a
 * gift prompt; after, the configured reward and claim instructions.
 */
export function CampaignReveal({ reward, claimDeadline, active }: CampaignRevealProps) {
  const [revealed, setRevealed] = useState(false);
  const title = resolveText(reward.title, "en");

  if (!active) {
    return (
      <div className="border-border bg-canvas shadow-card rounded-[20px] border p-6 text-center">
        <span className="bg-surface-container text-text-secondary mx-auto flex size-16 items-center justify-center rounded-full">
          <Icon name="Clock" className="size-8" aria-hidden />
        </span>
        <h2 className="font-heading text-h3 text-text-primary mt-3 font-bold">
          This reward isn&apos;t available right now
        </h2>
        <p className="text-small text-text-secondary mt-1">
          The campaign is not currently active. Please check back during the campaign period.
        </p>
      </div>
    );
  }

  if (revealed) {
    return <RewardCard reward={reward} claimDeadline={claimDeadline} />;
  }

  return (
    <div className="border-border bg-canvas shadow-card relative overflow-hidden rounded-[20px] border p-6 text-center">
      <span className="bg-primary absolute inset-x-0 top-0 h-1.5" aria-hidden />
      <span className="bg-surface-warm text-primary mx-auto flex size-20 items-center justify-center rounded-full">
        <Icon name="Gift" className="size-10" aria-hidden />
      </span>
      <h2 className="font-heading text-h3 text-text-primary mt-4 font-bold">Tap to reveal</h2>
      <p className="text-small text-text-secondary mt-1">A special offer is waiting for you.</p>
      <button
        type="button"
        onClick={() => setRevealed(true)}
        className="bg-primary text-button shadow-card hover:bg-primary-dark focus-visible:outline-primary mt-5 flex min-h-[52px] w-full items-center justify-center gap-2 rounded-[12px] px-5 font-bold text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        Reveal my reward
        <Icon name="ArrowRight" className="size-5" aria-hidden />
      </button>
      <p className="sr-only">The reward you will receive is: {title}.</p>
    </div>
  );
}
