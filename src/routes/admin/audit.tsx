import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/page-head";
import { DataTable, FilterBar, GhostButton, PageHeader, Panel } from "@/components/adex/kit";
import { auditLogs } from "@/lib/adex-data";

export const Route = createFileRoute("/admin/audit")({
  head: pageHead(
    "Audit Logs | ADEX Admin",
    "Admin-only audit trail across authentication, KYC, stones, auctions, settlement, certification and configuration changes.",
  ),
  component: AdminAudit,
});

function AdminAudit() {
  return (
    <>
      <PageHeader
        title="Audit"
        description="Immutable record of every privileged action on the platform."
        actions={<GhostButton>Export log</GhostButton>}
      />
      <FilterBar fields={["Actor", "Action", "Entity", "Date"]} />
      <DataTable rows={auditLogs} />

      <Panel title="Audited domains" className="mt-6">
        <ul className="grid grid-cols-2 gap-2 text-sm sm:grid-cols-3">
          {[
            "Authentication",
            "User & role changes",
            "KYC / AML decisions",
            "Stone lifecycle",
            "Valuation & pricing",
            "Auction & bidding",
            "Orders & settlement",
            "Certification",
            "Shipments & returns",
            "Configuration changes",
          ].map((d) => (
            <li key={d} className="bg-panel rounded-sm px-3 py-2">
              {d}
            </li>
          ))}
        </ul>
      </Panel>
    </>
  );
}
