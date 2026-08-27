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
import { shipments } from "@/lib/adex-data";

export const Route = createFileRoute("/seller/shipments")({
  head: pageHead(
    "Shipments | ADEX Seller Portal",
    "Create shipment requests, track logistics providers, export documents and delivery status for sold stones.",
  ),
  component: SellerShipments,
});

function SellerShipments() {
  return (
    <>
      <PageHeader
        title="Shipments"
        description="Movement of stones between collection points, vaults and buyers."
        actions={<GhostButton>New shipment request</GhostButton>}
      />
      <FilterBar fields={["Shipment ID", "Provider", "Status", "Destination"]} />
      <DataTable rows={shipments} linkBase="seller" />

      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <Panel title="Shipment details — SHP-51204">
          <DefinitionList
            items={[
              { label: "Logistics provider", value: "Brinks Global" },
              { label: "Tracking number", value: "BR-99120445" },
              { label: "Pickup", value: "Kinshasa Hub · 18 Aug 2026" },
              { label: "Destination", value: "Antwerp Vault" },
              { label: "Expected delivery", value: "24 Aug 2026" },
              { label: "Required documents", value: "KP certificate, export licence, invoice" },
            ]}
          />
        </Panel>
        <Panel title="Status">
          <Timeline
            steps={[
              { label: "Requested", detail: "16 Aug 2026", done: true },
              { label: "Picked up", detail: "18 Aug 2026", done: true },
              { label: "In transit", detail: "Currently with carrier", done: true },
              { label: "Customs", detail: "Antwerp clearance", done: false },
              { label: "Delivered", detail: "Expected 24 Aug 2026", done: false },
            ]}
          />
        </Panel>
      </div>
    </>
  );
}
