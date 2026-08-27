import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/page-head";
import {
  DataTable,
  DefinitionList,
  FilterBar,
  GhostButton,
  GoldButton,
  KpiGrid,
  PageHeader,
  Panel,
} from "@/components/adex/kit";
import { kycCases } from "@/lib/adex-data";

export const Route = createFileRoute("/admin/kyc")({
  head: pageHead(
    "KYC / AML Review | ADEX Admin",
    "Review compliance cases, risk levels and reviewer assignment; approve, reject, escalate or request further information.",
  ),
  component: AdminKyc,
});

function AdminKyc() {
  return (
    <>
      <PageHeader
        title="KYC / AML"
        description="Compliance case queue for seller and buyer verification."
      />
      <KpiGrid
        items={[
          { label: "Pending review", value: "34" },
          { label: "Information requested", value: "11" },
          { label: "AML cases", value: "6" },
          { label: "Approved (30d)", value: "78" },
        ]}
      />
      <div className="mt-6">
        <FilterBar fields={["Case ID", "Applicant", "Risk Level", "Reviewer", "Status"]} />
        <DataTable rows={kycCases} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <Panel title="Case AML-4402">
          <DefinitionList
            items={[
              { label: "Applicant", value: "Kono Cooperative" },
              { label: "Type", value: "Seller — Organization" },
              { label: "Risk level", value: "High" },
              { label: "Assigned reviewer", value: "L. Okafor" },
              { label: "Screening result", value: "PEP match — director" },
              { label: "SLA", value: "Overdue by 2 days" },
            ]}
          />
          <label className="mt-4 flex flex-col gap-1 text-xs font-semibold">
            Reviewer comments
            <textarea
              rows={3}
              className="rounded-sm border border-input bg-background px-3 py-2 text-sm font-normal focus:border-ring focus:outline-none"
            />
          </label>
        </Panel>
        <Panel title="Resolution">
          <div className="flex flex-col gap-2">
            <GoldButton>Approve</GoldButton>
            <GhostButton>Request information</GhostButton>
            <GhostButton>Escalate</GhostButton>
            <GhostButton>Suspend applicant</GhostButton>
            <GhostButton>Reject</GhostButton>
          </div>
        </Panel>
      </div>
    </>
  );
}
