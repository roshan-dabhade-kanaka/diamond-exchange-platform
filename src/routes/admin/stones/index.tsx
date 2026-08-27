import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/page-head";
import {
  DataTable,
  DefinitionList,
  FilterBar,
  GhostButton,
  PageHeader,
  Panel,
  Timeline,
} from "@/components/adex/kit";
import { adminStones, sellerLots } from "@/lib/adex-data";

export const Route = createFileRoute("/admin/stones/")({
  head: pageHead(
    "Stones & Lots | ADEX Admin",
    "Operational stone lifecycle management: receiving, scanning, fingerprinting, processing, certification and auction readiness.",
  ),
  component: AdminStones,
});

function AdminStones() {
  return (
    <>
      <PageHeader
        title="Stones & Lots"
        description="Full inventory across sellers with lifecycle and operations status."
        actions={<GhostButton>Bulk receive</GhostButton>}
      />
      <FilterBar fields={["Stone ID", "Seller", "Location", "Scan", "Status"]} />
      <DataTable rows={adminStones} linkBase="admin" />

      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <Panel title="Stone record — ADX-S-04409">
          <DefinitionList
            items={[
              { label: "Seller", value: "Kono Cooperative" },
              { label: "Lot", value: "ADX-L-0308" },
              { label: "Location", value: "Kinshasa Hub — Cage 4" },
              { label: "Scans", value: "Queued (3D + spectral)" },
              { label: "Fingerprinting", value: "Not started" },
              { label: "Valuation", value: "Under review" },
              { label: "Certification", value: "Pending scan" },
              { label: "Auction", value: "Not scheduled" },
            ]}
          />
        </Panel>
        <Panel title="Processing history">
          <Timeline
            steps={[
              { label: "Registered", detail: "04 Aug 2026 · Seller", done: true },
              { label: "Received", detail: "06 Aug 2026 · Kinshasa Hub", done: true },
              { label: "Scan queued", detail: "07 Aug 2026", done: true },
              { label: "Valuation", detail: "Awaiting scan output", done: false },
              { label: "Auction listing", detail: "Blocked on valuation", done: false },
            ]}
          />
        </Panel>
      </div>

      <Panel title="Lots" className="mt-6">
        <DataTable rows={sellerLots} dense linkBase="admin" />
      </Panel>
    </>
  );
}
