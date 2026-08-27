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
import { useSession, type KycStatus } from "@/lib/session";

export const Route = createFileRoute("/buyer/kyc")({
  head: pageHead(
    "KYC / AML | ADEX Buyer Portal",
    "Complete buyer verification: identity, company registration, source of funds and compliance documentation.",
  ),
  component: BuyerKyc,
});

const statusLabel: Record<KycStatus, string> = {
  NOT_STARTED: "Not started",
  PENDING: "Under review",
  APPROVED: "Approved",
  REJECTED: "Rejected",
};

function currentStepIndex(status: KycStatus): number {
  switch (status) {
    case "NOT_STARTED":
      return 0;
    case "PENDING":
      return 2;
    case "REJECTED":
      return 2;
    case "APPROVED":
      return 4;
  }
}

function BuyerKyc() {
  const { session, resubmitDocument, setKycStatus } = useSession();
  const stepIndex = currentStepIndex(session.kycStatus);

  return (
    <>
      <PageHeader
        title="KYC / AML"
        description="Bidding and Paid Analysis are enabled only for approved buyer accounts."
        actions={<StatusBadge value={statusLabel[session.kycStatus]} />}
      />

      {session.kycStatus === "REJECTED" && session.rejectionReason ? (
        <div className="adex-panel mb-6 border-l-4 border-destructive bg-destructive/5 p-4">
          <p className="text-sm font-semibold text-destructive">Submission rejected</p>
          <p className="mt-1 text-sm text-muted-foreground">{session.rejectionReason}</p>
        </div>
      ) : null}

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
              <GoldButton
                type="button"
                onClick={() => setKycStatus("PENDING")}
              >
                {session.kycStatus === "NOT_STARTED" ? "Submit for review" : "Update submission"}
              </GoldButton>
              <GhostButton type="button">Save draft</GhostButton>
            </div>
          </Panel>
          <Panel title="Documents">
            <DataTable
              dense
              rows={session.documents.map((d) => ({
                Document: d.label,
                Status: d.status,
              }))}
            />
            {session.kycStatus === "REJECTED" ? (
              <div className="mt-3 flex flex-wrap gap-2">
                {session.documents
                  .filter((d) => d.status !== "Approved")
                  .map((d) => (
                    <GhostButton key={d.id} type="button" onClick={() => resubmitDocument(d.id)}>
                      Resubmit {d.label}
                    </GhostButton>
                  ))}
              </div>
            ) : null}
          </Panel>
        </div>

        <div className="space-y-6">
          <Panel title="Compliance status">
            <Timeline
              steps={[
                { label: "Submitted", detail: "Application received", done: stepIndex >= 1 },
                { label: "Under review", detail: "Identity and source documents", done: stepIndex >= 2 },
                { label: "AML screening", detail: "Risk and sanctions checks", done: stepIndex >= 3 },
                {
                  label: session.kycStatus === "REJECTED" ? "Rejected" : "Approved",
                  detail: session.kycStatus === "REJECTED" ? "See reason above" : "Trading enabled",
                  done: stepIndex >= 4,
                },
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
