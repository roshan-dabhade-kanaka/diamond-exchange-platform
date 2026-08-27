import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/page-head";
import {
  DataTable,
  FormGrid,
  GhostButton,
  GoldButton,
  PageHeader,
  Panel,
  StatusBadge,
  Timeline,
} from "@/components/adex/kit";

export const Route = createFileRoute("/buyer/kyc")({
  head: pageHead(
    "KYC / AML | ADEX Buyer Portal",
    "Complete buyer verification: identity, company registration, source of funds and compliance documentation.",
  ),
  component: BuyerKyc,
});

function BuyerKyc() {
  return (
    <>
      <PageHeader
        title="KYC / AML"
        description="Bidding is enabled only for approved buyer accounts."
        actions={<StatusBadge value="Approved" />}
      />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
        <div className="space-y-6">
          <Panel title="KYC registration">
            <FormGrid
              fields={[
                { label: "Buyer type" },
                { label: "Company name" },
                { label: "Registration number" },
                { label: "Country" },
                { label: "Business activity" },
                { label: "Source of funds" },
                { label: "Authorised representative" },
                { label: "Bank account" },
              ]}
            />
            <div className="mt-4 flex gap-2">
              <GoldButton>Update submission</GoldButton>
              <GhostButton>Save draft</GhostButton>
            </div>
          </Panel>
          <Panel title="Documents">
            <DataTable
              dense
              rows={[
                {
                  Document: "Government ID",
                  Uploaded: "04 Jul 2026",
                  Expiry: "12 Sep 2031",
                  Status: "Approved",
                },
                {
                  Document: "Company registration",
                  Uploaded: "04 Jul 2026",
                  Expiry: "—",
                  Status: "Approved",
                },
                {
                  Document: "Proof of funds",
                  Uploaded: "04 Jul 2026",
                  Expiry: "04 Jul 2027",
                  Status: "Approved",
                },
                {
                  Document: "Trade licence",
                  Uploaded: "04 Jul 2026",
                  Expiry: "31 Mar 2027",
                  Status: "Approved",
                },
              ]}
            />
          </Panel>
        </div>

        <div className="space-y-6">
          <Panel title="Compliance status">
            <Timeline
              steps={[
                { label: "Submitted", detail: "04 Jul 2026", done: true },
                { label: "Under review", detail: "06 Jul 2026", done: true },
                { label: "AML screening", detail: "Low risk", done: true },
                { label: "Approved", detail: "09 Jul 2026", done: true },
              ]}
            />
          </Panel>
          <Panel title="Trading limits">
            <p className="text-sm">
              Approved bidding limit <strong>$1,500,000</strong> per auction cycle. Increases
              require updated proof of funds and compliance re-review.
            </p>
          </Panel>
        </div>
      </div>
    </>
  );
}
