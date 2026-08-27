import { createFileRoute } from "@tanstack/react-router";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { pageHead } from "@/lib/page-head";
import { DataTable, GhostButton, KpiGrid, PageHeader, Panel } from "@/components/adex/kit";
import { revenueSeries } from "@/lib/adex-data";

export const Route = createFileRoute("/admin/reports")({
  head: pageHead(
    "Reports & Analytics | ADEX Admin",
    "Sales, auction, logistics and compliance analytics: revenue, volume, sold versus unsold and provider performance.",
  ),
  component: AdminReports,
});

function AdminReports() {
  return (
    <>
      <PageHeader
        title="Reports & Analytics"
        description="Commercial, operational and compliance performance."
        actions={<GhostButton>Export CSV</GhostButton>}
      />
      <KpiGrid
        items={[
          { label: "Revenue (MTD)", value: "$7.42M" },
          { label: "Sales volume", value: "326 stones" },
          { label: "Average sale value", value: "$22,760" },
          { label: "Sold vs unsold", value: "87% / 13%" },
        ]}
      />

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Panel title="Revenue by period ($M)">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueSeries}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="period" stroke="var(--muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--muted-foreground)" fontSize={12} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="var(--gold)"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel title="Sales volume (stones)">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueSeries}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="period" stroke="var(--muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--muted-foreground)" fontSize={12} />
                <Tooltip />
                <Bar dataKey="volume" fill="var(--primary)" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Panel title="Auction performance">
          <DataTable
            dense
            rows={[
              { Auction: "AUC-2026-08-A", Lots: 84, "Sell-through": "91%", "Avg. uplift": "+12.4%", Status: "Active" },
              { Auction: "AUC-2026-07-C", Lots: 78, "Sell-through": "82%", "Avg. uplift": "+6.1%", Status: "Completed" },
              { Auction: "AUC-2026-07-B", Lots: 66, "Sell-through": "88%", "Avg. uplift": "+9.7%", Status: "Completed" },
            ]}
          />
        </Panel>
        <Panel title="Logistics & compliance">
          <DataTable
            dense
            rows={[
              { Metric: "On-time delivery", Provider: "Brinks Global", Value: "96%", Status: "Active" },
              { Metric: "On-time delivery", Provider: "Malca-Amit", Value: "91%", Status: "Active" },
              { Metric: "KYC pending", Provider: "Compliance", Value: "34", Status: "Pending" },
              { Metric: "AML cases open", Provider: "Compliance", Value: "6", Status: "Under Review" },
            ]}
          />
        </Panel>
      </div>
    </>
  );
}
