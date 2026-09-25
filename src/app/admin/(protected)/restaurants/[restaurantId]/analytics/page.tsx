"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { demoStore } from "@/lib/storage/demo-store";
import { getRestaurantAnalytics } from "@/data/analytics/actions";
import type { AnalyticsView } from "@/data/analytics/compute";
import { routes } from "@/lib/routes";
import type { Restaurant } from "@/domain/entities";
import { RestaurantContextHeader } from "@/components/admin/restaurant-context-header";
import { RestaurantWorkspaceTabs } from "@/components/admin/restaurant-workspace-tabs";
import { AdminSection } from "@/components/admin/admin-section";
import { AdminMetricCard } from "@/components/admin/admin-metric-card";
import { InteractionAnalyticsChart } from "@/components/charts/interaction-analytics-chart";
import { EmptyState } from "@/components/shared/states";
import { Icon } from "@/components/shared/icon";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const RANGES = [
  { days: 7, label: "7 days" },
  { days: 30, label: "30 days" },
  { days: 90, label: "90 days" },
];

const ACTION_LABELS: Record<string, string> = {
  "call-order": "Call Order",
  "pick-your-meal": "Pick Your Meal",
  "online-order": "Online Order",
  "visit-us": "Add Contact",
  "add-contact": "Add Contact",
  whatsapp: "WhatsApp",
  email: "Email",
  instagram: "Instagram",
  "save-contact": "Save Contact",
  share: "Share",
  custom: "Custom button",
};

export default function RestaurantAnalyticsPage() {
  const params = useParams<{ restaurantId: string }>();
  const id = params.restaurantId;

  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [view, setView] = useState<AnalyticsView | null>(null);
  const [days, setDays] = useState(30);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setRestaurant(demoStore.getRestaurant(id));
  }, [id]);

  const refresh = useCallback(() => {
    setLoading(true);
    getRestaurantAnalytics(id, days)
      .then((data) => setView(data))
      .catch(() => setView(null))
      .finally(() => setLoading(false));
  }, [id, days]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  if (!restaurant) {
    return (
      <div className="border-border bg-canvas text-small text-text-secondary rounded-[16px] border p-8 text-center">
        Loading…
      </div>
    );
  }

  const breadcrumb = [
    { label: "Admin", href: routes.admin.dashboard() },
    { label: "Restaurants", href: routes.admin.restaurants() },
    { label: restaurant.displayName, href: routes.admin.restaurant(id) },
    { label: "Analytics" },
  ];

  const hasData = (view?.totalEvents ?? 0) > 0;
  const actionTotal = view?.actionBreakdown.reduce((s, a) => s + a.value, 0) ?? 0;
  const channelTotal = view ? view.channelSplit.qr + view.channelSplit.direct : 0;

  return (
    <div className="flex flex-col gap-6">
      <RestaurantContextHeader restaurant={restaurant} breadcrumb={breadcrumb} />
      <RestaurantWorkspaceTabs restaurantId={id} />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-small text-text-secondary">
          Real interaction analytics from QR visits and button taps.
        </p>
        <div className="border-border bg-canvas flex items-center gap-1 rounded-full border p-1">
          {RANGES.map((r) => (
            <button
              key={r.days}
              type="button"
              onClick={() => setDays(r.days)}
              className={cn(
                "rounded-full px-3 py-1 text-xs font-semibold",
                days === r.days
                  ? "bg-primary text-white"
                  : "text-text-secondary hover:text-text-primary",
              )}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      <section aria-label="Interaction metrics" className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <AdminMetricCard label="QR scans" value={view?.totalScans ?? 0} icon="QrCode" />
        <AdminMetricCard label="Menu views" value={view?.menuViews ?? 0} icon="BookOpen" />
        <AdminMetricCard
          label="Action taps"
          value={view?.actionClicks ?? 0}
          icon="MousePointerClick"
        />
        <AdminMetricCard label="Page views" value={view?.pageViews ?? 0} icon="Eye" />
      </section>

      {!hasData ? (
        <AdminSection title="Engagement" icon="ChartColumn">
          <EmptyState
            title={loading ? "Loading analytics…" : "No interactions recorded yet"}
            description={
              loading
                ? "Fetching real event data."
                : "Analytics appear here once visitors open this restaurant's public page or tap its buttons. Publish the restaurant and share its QR/link to start collecting data."
            }
            icon="ChartColumn"
          />
        </AdminSection>
      ) : (
        <>
          <AdminSection
            title="Engagement trend"
            description={`Daily interactions (last ${days} days)`}
            icon="ChartColumn"
          >
            <InteractionAnalyticsChart series={view!.series} />
          </AdminSection>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <AdminSection title="Button taps" icon="MousePointerClick">
              {view!.actionBreakdown.length === 0 ? (
                <p className="text-small text-text-secondary">No button taps yet.</p>
              ) : (
                <ul className="flex flex-col gap-2">
                  {view!.actionBreakdown.map((a) => {
                    const pct = actionTotal ? Math.round((a.value / actionTotal) * 100) : 0;
                    return (
                      <li key={a.label} className="flex flex-col gap-1">
                        <div className="text-small flex items-center justify-between">
                          <span className="text-text-primary font-medium">
                            {ACTION_LABELS[a.label] ?? a.label}
                          </span>
                          <span className="text-text-secondary">
                            {a.value} · {pct}%
                          </span>
                        </div>
                        <div className="bg-surface-muted h-1.5 w-full overflow-hidden rounded-full">
                          <div className="bg-primary h-full" style={{ width: `${pct}%` }} />
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </AdminSection>

            <AdminSection title="Arrival channel" icon="Radio">
              <ul className="text-small flex flex-col gap-2">
                {[
                  { label: "QR code", value: view!.channelSplit.qr, icon: "QrCode" },
                  { label: "Direct link", value: view!.channelSplit.direct, icon: "Link" },
                ].map((c) => {
                  const pct = channelTotal ? Math.round((c.value / channelTotal) * 100) : 0;
                  return (
                    <li key={c.label} className="flex items-center justify-between gap-3">
                      <span className="text-text-primary flex items-center gap-2 font-medium">
                        <Icon name={c.icon} className="text-primary size-4" aria-hidden />
                        {c.label}
                      </span>
                      <span className="text-text-secondary">
                        {c.value} · {pct}%
                      </span>
                    </li>
                  );
                })}
              </ul>
            </AdminSection>
          </div>

          {view!.topTargets.length > 0 ? (
            <AdminSection title="Most viewed products" icon="TrendingUp">
              <ul className="text-small flex flex-col gap-2">
                {view!.topTargets.map((t) => (
                  <li key={t.label} className="flex items-center justify-between gap-3">
                    <span className="text-text-primary font-medium">{t.label}</span>
                    <span className="text-text-secondary">{t.value} views</span>
                  </li>
                ))}
              </ul>
            </AdminSection>
          ) : null}
        </>
      )}

      <div className="border-border bg-canvas text-text-tertiary flex items-center gap-2 rounded-[12px] border p-3 text-xs">
        <Icon name="Info" className="size-4 shrink-0" aria-hidden />
        <span>
          Counts respect visitor cookie consent. Share this restaurant&apos;s QR/link with{" "}
          <code className="bg-surface-muted rounded px-1">?via=qr</code> to attribute the arrival
          channel.
        </span>
      </div>

      <div>
        <Button asChild variant="ghost" size="sm">
          <Link href={routes.admin.restaurant(id)}>Back to overview</Link>
        </Button>
      </div>
    </div>
  );
}
