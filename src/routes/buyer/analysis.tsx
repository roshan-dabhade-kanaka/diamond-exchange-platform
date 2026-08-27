import { createFileRoute, Link } from "@tanstack/react-router";
import { pageHead } from "@/lib/page-head";
import {
  DataTable,
  DefinitionList,
  FormGrid,
  GhostButton,
  GoldButton,
  PageHeader,
  Panel,
} from "@/components/adex/kit";
import type { Row } from "@/lib/adex-data";

export const Route = createFileRoute("/buyer/analysis")({
  head: pageHead(
    "Paid Stone Analysis | ADEX Buyer Portal",
    "Order an independent laboratory analysis of a stone before you commit — spectroscopy, fluorescence, inclusion mapping and a signed report.",
  ),
  component: AnalysisPage,
});

const requests: Row[] = [
  {
    "Request ID": "ANL-8841",
    Stone: "ADX-L-0312",
    Service: "Full lab report",
    Fee: "$450",
    Status: "In progress",
  },
  {
    "Request ID": "ANL-8830",
    Stone: "ADX-S-04412",
    Service: "Portable screening",
    Fee: "$120",
    Status: "Completed",
  },
  {
    "Request ID": "ANL-8812",
    Stone: "ADX-S-04390",
    Service: "Colour re-grade",
    Fee: "$260",
    Status: "Pending",
  },
];

const tiers = [
  {
    name: "Portable screening",
    price: "$120",
    detail: "Handheld verification at the showroom table. Same day, on the spot.",
  },
  {
    name: "Full lab report",
    price: "$450",
    detail: "Spectroscopy, fluorescence and inclusion mapping with a signed PDF report.",
  },
  {
    name: "Colour re-grade",
    price: "$260",
    detail: "Independent second opinion on colour and clarity grading.",
  },
];

function AnalysisPage() {
  return (
    <>
      <PageHeader
        title="Paid analysis service"
        description="Most desks carry portable machines for a quick read. Order a paid analysis when you want an independent, documented opinion before payment."
      />

      <div className="mb-6 grid gap-3 md:grid-cols-3">
        {tiers.map((t) => (
          <div key={t.name} className="adex-panel flex flex-col gap-2 p-4">
            <p className="adex-eyebrow">{t.name}</p>
            <p className="font-display text-2xl">{t.price}</p>
            <p className="text-sm text-muted-foreground">{t.detail}</p>
            <GhostButton className="mt-auto self-start">Select</GhostButton>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Panel title="Order an analysis">
          <FormGrid
            fields={[
              { label: "Stone or lot ID" },
              { label: "Service tier" },
              { label: "Laboratory" },
              { label: "Turnaround" },
              { label: "Billing reference" },
              { label: "Instructions for the lab", type: "textarea" },
            ]}
          />
          <div className="mt-5 flex flex-wrap gap-2">
            <GoldButton>Pay and submit</GoldButton>
            <GhostButton>Add to a showroom visit</GhostButton>
          </div>
        </Panel>

        <Panel title="What you receive">
          <DefinitionList
            items={[
              { label: "Report format", value: "Signed PDF + machine readable JSON" },
              { label: "Turnaround", value: "24h screening · 3–5 days full report" },
              { label: "Validity", value: "12 months from issue" },
              { label: "Applies to", value: "Rough and polished goods" },
              { label: "Fee handling", value: "Charged at order, non-refundable" },
              { label: "Linked to", value: "Your bid and order records" },
            ]}
          />
          <p className="mt-4 text-xs text-muted-foreground">
            Polished purchases still require an approved KYC file.{" "}
            <Link to="/buyer/kyc" className="adex-link">
              Complete KYC
            </Link>
            .
          </p>
        </Panel>
      </div>

      <div className="mt-6">
        <Panel title="Your analysis requests">
          <DataTable rows={requests} />
        </Panel>
      </div>
    </>
  );
}
