import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/page-head";
import {
  DataTable,
  DefinitionList,
  GhostButton,
  GoldButton,
  KpiGrid,
  PageHeader,
  Panel,
  Timeline,
} from "@/components/adex/kit";

export const Route = createFileRoute("/admin/valuation")({
  head: pageHead(
    "Valuation Service | ADEX Admin",
    "Monitor valuation requests sent to the third-party valuation provider, review returned values and record overrides.",
  ),
  component: AdminValuation,
});

const requests = [
  {
    Request: "VAL-8841",
    Item: "ADX-S-04412",
    Provider: "GemPrice Analytics",
    Sent: "10 Aug 2026",
    Returned: "$184,500",
    Status: "Approved",
  },
  {
    Request: "VAL-8836",
    Item: "ADX-L-0308",
    Provider: "GemPrice Analytics",
    Sent: "10 Aug 2026",
    Returned: "—",
    Status: "Under Review",
  },
  {
    Request: "VAL-8829",
    Item: "ADX-S-04388",
    Provider: "GemPrice Analytics",
    Sent: "—",
    Returned: "—",
    Status: "Submitted",
  },
];

function AdminValuation() {
  return (
    <>
      <PageHeader
        title="Valuation Service"
        description="Valuations are produced by an accredited third-party provider. ADEX sends the scan and stone data, receives the value, and can approve or override it with a recorded reason."
        actions={
          <>
            <GhostButton>Provider settings</GhostButton>
            <GoldButton>Send batch to provider</GoldButton>
          </>
        }
      />

      <KpiGrid
        items={[
          { label: "Awaiting send", value: "12" },
          { label: "With provider", value: "9" },
          { label: "Returned today", value: "5" },
          { label: "Overrides (30d)", value: "2" },
        ]}
      />

      <div className="mt-6 space-y-6">
        <Panel title="Valuation requests">
          <DataTable rows={requests} linkBase="admin" dense />
        </Panel>

        <div className="grid gap-6 lg:grid-cols-2">
          <Panel title="Provider — GemPrice Analytics">
            <DefinitionList
              items={[
                { label: "Integration", value: "Secure API · v3" },
                { label: "Scope", value: "Rough stones, parcels, baskets" },
                { label: "Inputs sent", value: "3D scan, spectral data, carat, classification" },
                { label: "Turnaround (avg)", value: "38 hours" },
                { label: "Contract", value: "Renews 31 Dec 2026" },
                { label: "Connection status", value: "Active" },
              ]}
            />
            <div className="mt-4 flex gap-2">
              <GhostButton>Test connection</GhostButton>
              <GhostButton>View provider log</GhostButton>
            </div>
          </Panel>

          <Panel title="Request lifecycle — VAL-8836">
            <Timeline
              steps={[
                { label: "Queued by ADEX", detail: "10 Aug 2026", done: true },
                { label: "Sent to provider", detail: "10 Aug 2026 · payload accepted", done: true },
                { label: "Provider assessment", detail: "In progress", done: false },
                { label: "Value returned", detail: "Awaiting", done: false },
                { label: "ADEX approval / override", detail: "Pending", done: false },
              ]}
            />
            <div className="mt-4 flex gap-2">
              <GhostButton>Chase provider</GhostButton>
              <GhostButton>Record override</GhostButton>
            </div>
          </Panel>
        </div>
      </div>
    </>
  );
}
