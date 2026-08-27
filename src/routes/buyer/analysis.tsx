import { useState } from "react";
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
  StatusBadge,
} from "@/components/adex/kit";
import type { Row } from "@/lib/adex-data";
import { useSession } from "@/lib/session";

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

const cuttingPlans = [
  {
    name: "Yield estimate",
    price: "$180",
    detail: "AI cut-and-yield projection from existing scan data — no new scan required.",
  },
  {
    name: "Cutting plan + report",
    price: "$520",
    detail: "Full cutting option analysis with polished-yield modelling and a signed plan.",
  },
];

function AnalysisPage() {
  const { isCleared } = useSession();

  return (
    <>
      <PageHeader
        title="Paid analysis service"
        description="Most desks carry portable machines for a quick read. Order a paid analysis when you want an independent, documented opinion before payment."
      />

      {!isCleared ? (
        <div className="adex-panel mb-6 border-l-4 border-warning bg-warning/10 p-4">
          <p className="text-sm font-semibold">
            Paid Analysis and Cutting Plans are available once your KYC/AML and eligibility review are
            approved.
          </p>
          <Link to="/buyer/kyc" className="adex-link mt-1 inline-block text-sm">
            Review KYC / AML status →
          </Link>
        </div>
      ) : null}

      <div className="mb-6 grid gap-3 md:grid-cols-3">
        {tiers.map((t) => (
          <div key={t.name} className="adex-panel flex flex-col gap-2 p-4">
            <p className="adex-eyebrow">{t.name}</p>
            <p className="font-display text-2xl">{t.price}</p>
            <p className="text-sm text-muted-foreground">{t.detail}</p>
            <GhostButton className="mt-auto self-start" type="button" disabled={!isCleared}>
              Select
            </GhostButton>
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
            <GoldButton type="button" disabled={!isCleared}>
              Pay and submit
            </GoldButton>
            <GhostButton type="button" disabled={!isCleared}>
              Add to a showroom visit
            </GhostButton>
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
        <Panel title="AI Cutting & Yield Plans">
          <p className="mb-4 max-w-2xl text-sm text-muted-foreground">
            A separate service from lab verification above: order an AI-modelled cutting and yield
            plan for a rough stone. Unlike lab analysis, the plan fee is{" "}
            <strong>credited against your final invoice</strong> if the stone is cut through ADEX's
            partner network — you only pay the difference.
          </p>
          <div className="grid gap-3 md:grid-cols-2">
            {cuttingPlans.map((p) => (
              <div key={p.name} className="adex-panel flex flex-col gap-2 p-4">
                <div className="flex items-center justify-between">
                  <p className="adex-eyebrow">{p.name}</p>
                  <StatusBadge value="Credited if cut with ADEX" />
                </div>
                <p className="font-display text-2xl">{p.price}</p>
                <p className="text-sm text-muted-foreground">{p.detail}</p>
                <GoldButton className="mt-auto self-start" type="button" disabled={!isCleared}>
                  Order plan
                </GoldButton>
              </div>
            ))}
          </div>
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
