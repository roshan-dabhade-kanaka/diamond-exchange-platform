import { createFileRoute, Link } from "@tanstack/react-router";
import { pageHead } from "@/lib/page-head";
import { DataTable, KpiGrid, PageHeader, Panel } from "@/components/adex/kit";
import { adminKpis, adminStones, auditLogs, kycCases } from "@/lib/adex-data";

export const Route = createFileRoute("/admin/")({
  head: pageHead(
    "Admin Dashboard | ADEX",
    "Operational overview of users, stones, auctions, compliance queues and revenue across the ADEX platform.",
  ),
  component: AdminDashboard,
});

function AdminDashboard() {
  return (
    <>
      <PageHeader
        title="Admin Dashboard"
        description="Platform-wide operations, compliance and commercial performance."
      />
      <KpiGrid items={adminKpis} />

      <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
        <div className="min-w-0 space-y-6">
          <Panel
            title="Compliance queue"
            action={
              <Link to="/admin/kyc" className="adex-link text-sm">
                Open queue
              </Link>
            }
          >
            <DataTable
              rows={kycCases}
              only={["Case ID", "Applicant", "Risk Level", "Status"]}
              dense
            />
          </Panel>
          <Panel
            title="Stones in processing"
            action={
              <Link to="/admin/stones" className="adex-link text-sm">
                View all
              </Link>
            }
          >
            <DataTable rows={adminStones} only={["Stone ID", "Seller", "Carat", "Status"]} dense />
          </Panel>
        </div>

        <div className="min-w-0 space-y-6">
          <Panel title="Operational alerts">
            <ul className="space-y-3 text-sm">
              {[
                ["6 AML cases open", "2 escalated beyond SLA"],
                ["4 auctions closing today", "AUC-2026-08-A ends 16:00 WET"],
                ["3 shipments in customs", "Antwerp and Dubai"],
                ["2 pricing rules pending approval", "RT-2026-Q4 draft"],
              ].map(([t, d]) => (
                <li key={t} className="border-b border-border pb-2 last:border-0">
                  <p className="font-semibold">{t}</p>
                  <p className="text-xs text-muted-foreground">{d}</p>
                </li>
              ))}
            </ul>
          </Panel>
          <Panel
            title="Recent audit activity"
            action={
              <Link to="/admin/audit" className="adex-link text-sm">
                Audit log
              </Link>
            }
          >
            <ul className="space-y-2 text-xs">
              {auditLogs.slice(0, 4).map((a) => (
                <li
                  key={String(a["Timestamp"])}
                  className="border-b border-border pb-2 last:border-0"
                >
                  <p className="font-semibold">{String(a["Action"])}</p>
                  <p className="text-muted-foreground">
                    {String(a["Actor"])} · {String(a["Entity"])} · {String(a["Timestamp"])}
                  </p>
                </li>
              ))}
            </ul>
          </Panel>
        </div>
      </div>
    </>
  );
}
