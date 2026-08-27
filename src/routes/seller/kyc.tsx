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

export const Route = createFileRoute("/seller/kyc")({
  head: pageHead(
    "KYC / AML | ADEX Seller Portal",
    "Complete seller KYC and AML verification: identity, government registration, mine source, banking details and compliance documents.",
  ),
  component: SellerKyc,
});

function SellerKyc() {
  return (
    <>
      <PageHeader
        title="KYC / AML"
        description="Verification is mandatory before you can list, sell or receive settlement."
        actions={<StatusBadge value="Under Review" />}
      />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
        <div className="space-y-6">
          <Panel title="KYC registration">
            <FormGrid
              fields={[
                { label: "Seller identity" },
                { label: "Organization name" },
                { label: "Government registration number" },
                { label: "Mine / source reference" },
                { label: "Country of operation" },
                { label: "Contact person" },
                { label: "Bank / mobile payment account" },
                { label: "Tax identifier" },
              ]}
            />
            <div className="mt-4 flex gap-2">
              <GoldButton>Submit for review</GoldButton>
              <GhostButton>Save draft</GhostButton>
            </div>
          </Panel>

          <Panel title="Documents">
            <DataTable
              dense
              rows={[
                { Document: "Government ID", Uploaded: "12 Aug 2026", Expiry: "04 Mar 2030", Status: "Approved" },
                { Document: "Business registration", Uploaded: "12 Aug 2026", Expiry: "—", Status: "Approved" },
                { Document: "Mining / source documentation", Uploaded: "12 Aug 2026", Expiry: "31 Dec 2026", Status: "Under Review" },
                { Document: "Address proof", Uploaded: "—", Expiry: "—", Status: "Pending" },
                { Document: "Banking documentation", Uploaded: "13 Aug 2026", Expiry: "—", Status: "Under Review" },
              ]}
            />
            <div className="mt-4">
              <FormGrid fields={[{ label: "Upload document", type: "file" }]} />
            </div>
          </Panel>
        </div>

        <div className="space-y-6">
          <Panel title="KYC status">
            <Timeline
              steps={[
                { label: "Draft", detail: "Created 09 Aug 2026", done: true },
                { label: "Submitted", detail: "12 Aug 2026", done: true },
                { label: "Under review", detail: "Compliance team assigned", done: true },
                { label: "Additional information required", detail: "Address proof outstanding", done: false },
                { label: "Approved / Rejected", detail: "Pending outcome", done: false },
              ]}
            />
          </Panel>
          <Panel title="AML status">
            <p className="text-sm">
              Screening completed against sanctions and PEP lists on 13 Aug 2026. Risk rating{" "}
              <strong>Medium</strong>. Enhanced due diligence requested for the source
              documentation.
            </p>
          </Panel>
        </div>
      </div>
    </>
  );
}
