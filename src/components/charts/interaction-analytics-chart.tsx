"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface SeriesPoint {
  label: string;
  value: number;
}

interface InteractionAnalyticsChartProps {
  series: SeriesPoint[];
  title?: string;
}

/**
 * Illustrative interaction analytics chart with an accessible data-table summary.
 * The chart is decorative (aria-hidden); the table is the accessible source.
 */
export function InteractionAnalyticsChart({
  series,
  title = "Interaction volume",
}: InteractionAnalyticsChartProps) {
  const total = series.reduce((sum, point) => sum + point.value, 0);

  return (
    <div className="flex flex-col gap-4">
      <div className="h-56 w-full" aria-hidden>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={series} margin={{ top: 8, right: 8, bottom: 0, left: -16 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
            <XAxis
              dataKey="label"
              tick={{ fontSize: 12, fill: "#667085" }}
              tickLine={false}
              axisLine={{ stroke: "#E5E7EB" }}
            />
            <YAxis
              tick={{ fontSize: 12, fill: "#667085" }}
              tickLine={false}
              axisLine={false}
              width={48}
            />
            <Tooltip
              cursor={{ fill: "rgba(240,68,36,0.06)" }}
              contentStyle={{
                borderRadius: 12,
                border: "1px solid #E5E7EB",
                fontSize: 12,
              }}
            />
            <Bar dataKey="value" fill="#F04424" radius={[6, 6, 0, 0]} maxBarSize={42} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <details className="border-border bg-surface rounded-[12px] border p-3">
        <summary className="text-small text-text-primary cursor-pointer font-semibold">
          {title} — data table ({total.toLocaleString()} total interactions)
        </summary>
        <table className="text-small mt-3 w-full text-left">
          <caption className="sr-only">{title}: interaction values per period.</caption>
          <thead>
            <tr className="border-border border-b">
              <th scope="col" className="text-text-secondary py-2 pr-4 font-semibold">
                Period
              </th>
              <th scope="col" className="text-text-secondary py-2 font-semibold">
                Interactions
              </th>
            </tr>
          </thead>
          <tbody>
            {series.map((point) => (
              <tr key={point.label} className="border-border border-b last:border-0">
                <th scope="row" className="text-text-primary py-2 pr-4 font-normal">
                  {point.label}
                </th>
                <td className="text-text-primary py-2">{point.value.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </details>
    </div>
  );
}
