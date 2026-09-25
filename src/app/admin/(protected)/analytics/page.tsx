"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { demoStore } from "@/lib/storage/demo-store";
import {
  getPlatformAnalytics,
  getPlatformRestaurantBreakdown,
  type RestaurantBreakdownRow,
} from "@/data/analytics/actions";
import type { AnalyticsView } from "@/data/analytics/compute";
import { routes } from "@/lib/routes";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminMetricCard } from "@/components/admin/admin-metric-card";
import { AdminSection } from "@/components/admin/admin-section";
import { InteractionAnalyticsChart } from "@/components/charts/interaction-analytics-chart";
import { EmptyState } from "@/components/shared/states";
import { Icon } from "@/components/shared/icon";
import { cn } from "@/lib/utils";

const RANGES = [
  { days: 7, label: "7 days" },
  { days: 30, label: "30 days" },
  { days: 90, label: "90 days" },
];

export default function PlatformAnalyticsPage() {
  const [view, setView] = useState<AnalyticsView | null>(null);
  const [breakdown, setBreakdown] = useState<RestaurantBreakdownRow[]>([]);
  const [days, setDays] = useState(30);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(() => {
    setLoading(true);
    Promise.all([getPlatformAnalytics(days), getPlatformRestaurantBreakdown(days)])
      .then(([v, b]) => {
        setView(v);
        setBreakdown(b);
      })
      .catch(() => {
        setView(null);
        setBreakdown([]);
      })
      .finally(() => setLoading(false));
  }, [days]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const nameFor = useMemo(() => {
    const all = demoStore.listRestaurants();
    const map = new Map(all.map((r) => [r.id, r.displayName || r.name]));
    return (id: string) => map.get(id) ?? id;
  }, []);

  const hasData = (view?.totalEvents ?? 0) > 0;

  return (
    <div className="flex flex-col gap-6">
      <AdminPageHeader
        title="Analytics"
        description="Real interaction analytics across every restaurant — QR visits, menu views and button taps."
        breadcrumb={[{ label: "Admin", href: routes.admin.dashboard() }, { label: "Analytics" }]}
        actions={
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
        }
      />

      <section aria-label="Platform metrics" className="grid grid-cols-2 gap-4 lg:grid-cols-4">
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
                : "Data appears here once visitors open published restaurant pages or tap their buttons."
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

          <AdminSection title="By restaurant" icon="Store">
            {breakdown.length === 0 ? (
              <p className="text-small text-text-secondary">
                No per-restaurant activity in this range.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="text-small w-full min-w-[560px]">
                  <thead>
                    <tr className="border-border text-text-secondary border-b text-left text-xs">
                      <th className="py-2 pr-3 font-semibold">Restaurant</th>
                      <th className="py-2 pr-3 font-semibold">Scans</th>
                      <th className="py-2 pr-3 font-semibold">Menu views</th>
                      <th className="py-2 pr-3 font-semibold">Action taps</th>
                      <th className="py-2 pr-3 font-semibold">Total</th>
                      <th className="py-2 font-semibold" />
                    </tr>
                  </thead>
                  <tbody>
                    {breakdown.map((r) => (
                      <tr key={r.restaurantId} className="border-border/60 border-b">
                        <td className="text-text-primary py-2 pr-3 font-medium">
                          {nameFor(r.restaurantId)}
                        </td>
                        <td className="text-text-secondary py-2 pr-3">{r.scans}</td>
                        <td className="text-text-secondary py-2 pr-3">{r.menuViews}</td>
                        <td className="text-text-secondary py-2 pr-3">{r.actionClicks}</td>
                        <td className="text-text-primary py-2 pr-3 font-semibold">{r.total}</td>
                        <td className="py-2 text-right">
                          <Link
                            href={routes.admin.restaurantAnalytics(r.restaurantId)}
                            className="text-primary text-xs font-semibold hover:underline"
                          >
                            View
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </AdminSection>
        </>
      )}

      <div className="border-border bg-canvas text-text-tertiary flex items-center gap-2 rounded-[12px] border p-3 text-xs">
        <Icon name="Info" className="size-4 shrink-0" aria-hidden />
        <span>Counts respect visitor cookie consent and update as new interactions arrive.</span>
      </div>
    </div>
  );
}
