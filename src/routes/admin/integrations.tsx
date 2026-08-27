import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/page-head";
import { KpiGrid, PageHeader, Panel, StatusBadge } from "@/components/adex/kit";

export const Route = createFileRoute("/admin/integrations")({
  head: pageHead(
    "External Integrations | ADEX Admin",
    "Status of every external system the platform depends on — scanning, traceability, certification, banking, funding and logistics providers.",
  ),
  component: AdminIntegrations,
});

type Integration = {
  name: string;
  category: string;
  detail: string;
  status: "MOCKED" | "PLANNED";
};

const integrations: Integration[] = [
  {
    name: "Sarine / Da Vinci",
    category: "Scanning",
    detail: "3D scan and cut-planning data for individually processed stones.",
    status: "MOCKED",
  },
  {
    name: "Spacecode",
    category: "Traceability",
    detail: "Optical fingerprinting for high-value stones only.",
    status: "MOCKED",
  },
  {
    name: "Reference Pricing Software",
    category: "Valuation",
    detail: "Market reference prices used to compute valuation estimates.",
    status: "MOCKED",
  },
  {
    name: "Government / CCC",
    category: "Certification",
    detail: "Kimberley Process certification authority.",
    status: "MOCKED",
  },
  {
    name: "Banks / Revolut",
    category: "Payments",
    detail: "Buyer payment-in and FX handling, kept distinct from payout-out.",
    status: "MOCKED",
  },
  {
    name: "Swiss Transaction Bank",
    category: "Settlement",
    detail: "Escrow holding and miner/partner payout-out.",
    status: "MOCKED",
  },
  {
    name: "FOMIN",
    category: "Funding",
    detail: "Partner funding commitments and settlement share.",
    status: "MOCKED",
  },
  {
    name: "Malca Amit + logistics partners",
    category: "Logistics",
    detail: "Secure, insured transport and chain-of-custody tracking.",
    status: "MOCKED",
  },
  {
    name: "Fair Trade Office / UN",
    category: "Certification",
    detail: "Fair Trade certification. Not part of this release.",
    status: "PLANNED",
  },
];

function AdminIntegrations() {
  const mocked = integrations.filter((i) => i.status === "MOCKED").length;

  return (
    <>
      <PageHeader
        title="External Integrations"
        description="Every external system the platform will eventually connect to. Phase 1 is frontend-only — nothing here is a live connection."
      />
      <KpiGrid
        items={[
          { label: "Total integrations", value: String(integrations.length) },
          { label: "Mocked", value: String(mocked) },
          { label: "Planned (future)", value: String(integrations.length - mocked) },
          { label: "Live connections", value: "0" },
        ]}
      />

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {integrations.map((i) => (
          <Panel key={i.name} title={i.name}>
            <p className="adex-eyebrow">{i.category}</p>
            <p className="mt-2 text-sm text-muted-foreground">{i.detail}</p>
            <div className="mt-4">
              <StatusBadge value={i.status === "MOCKED" ? "Mocked" : "Planned"} />
            </div>
          </Panel>
        ))}
      </div>
    </>
  );
}
