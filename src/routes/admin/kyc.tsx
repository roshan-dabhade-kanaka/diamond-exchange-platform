import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/page-head";
import {
  DefinitionList,
  FilterBar,
  GhostButton,
  GoldButton,
  KpiGrid,
  PageHeader,
  Panel,
  StatusBadge,
  Tabs,
} from "@/components/adex/kit";
import { amlCases, eligibilityCases, kycCases, type Row } from "@/lib/adex-data";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

export const Route = createFileRoute("/admin/kyc")({
  head: pageHead(
    "KYC / AML / Eligibility | ADEX Admin",
    "Review compliance cases across KYC, AML screening and regulatory eligibility; approve, reject, escalate or request further information.",
  ),
  component: AdminKyc,
});

type Tab = "kyc" | "aml" | "eligibility";

const documentChecklist: Record<string, string[]> = {
  "Buyer — Organization": [
    "Company registration",
    "Beneficial ownership declaration",
    "Source of funds",
    "Authorised representative ID",
  ],
};

function AdminKyc() {
  const [tab, setTab] = useState<Tab>("kyc");
  const [kycRows, setKycRows] = useState<Row[]>(kycCases);
  const [amlRows, setAmlRows] = useState<Row[]>(amlCases);
  const [eligRows, setEligRows] = useState<Row[]>(eligibilityCases);
  const [openCase, setOpenCase] = useState<Row | null>(null);
  const [comment, setComment] = useState("");

  const kycPending = kycRows.filter((r) => r["Status"] === "Under Review").length;
  const amlOpen = amlRows.filter((r) => r["Status"] !== "Approved").length;
  const eligUnderReview = eligRows.filter((r) => r["Status"] === "Under Review").length;
  const approved30d = kycRows.filter((r) => r["Status"] === "Approved").length;

  function decide(status: "Approved" | "Rejected" | "Escalated" | "Info Requested") {
    if (!openCase) return;
    const caseId = openCase["Case ID"];
    const apply = (rows: Row[]) =>
      rows.map((r) => (r["Case ID"] === caseId ? { ...r, Status: status } : r));
    setKycRows(apply);
    setAmlRows(apply);
    setEligRows((rows) =>
      rows.map((r) =>
        r["Case ID"] === caseId
          ? {
              ...r,
              Status:
                status === "Approved" ? "Eligible" : status === "Rejected" ? "Ineligible" : status,
            }
          : r,
      ),
    );
    setOpenCase(null);
    setComment("");
  }

  const rowsForTab = tab === "kyc" ? kycRows : tab === "aml" ? amlRows : eligRows;

  return (
    <>
      <PageHeader
        title="KYC / AML / Eligibility"
        description="Compliance case queues for buyer verification, AML screening and regulatory eligibility review."
      />
      <KpiGrid
        items={[
          { label: "KYC pending review", value: String(kycPending) },
          { label: "AML cases open", value: String(amlOpen) },
          { label: "Eligibility under review", value: String(eligUnderReview) },
          { label: "Approved (queue)", value: String(approved30d) },
        ]}
      />

      <div className="mt-6">
        <Tabs
          tabs={[
            { id: "kyc", label: "KYC", badge: String(kycRows.length) },
            { id: "aml", label: "AML", badge: String(amlRows.length) },
            { id: "eligibility", label: "Eligibility", badge: String(eligRows.length) },
          ]}
          active={tab}
          onChange={(id) => setTab(id as Tab)}
        />

        <FilterBar fields={["Case ID", "Applicant", "Risk Level", "Status"]} />
        <div className="adex-panel overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="bg-panel text-panel-foreground">
                {Object.keys(rowsForTab[0] ?? {}).map((c) => (
                  <th
                    key={c}
                    className="px-4 py-3 text-[10px] font-semibold tracking-[0.2em] uppercase"
                  >
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rowsForTab.map((row) => (
                <tr
                  key={String(row["Case ID"])}
                  onClick={() => setOpenCase(row)}
                  className="cursor-pointer border-t border-border hover:bg-muted/60"
                >
                  {Object.entries(row).map(([key, value]) => (
                    <td key={key} className="px-4 py-3">
                      {key === "Status" ? <StatusBadge value={String(value)} /> : String(value)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Sheet open={openCase !== null} onOpenChange={(open) => !open && setOpenCase(null)}>
        <SheetContent className="w-full overflow-y-auto sm:max-w-lg">
          {openCase ? (
            <>
              <SheetHeader>
                <SheetTitle>Case {openCase["Case ID"]}</SheetTitle>
                <SheetDescription>{String(openCase["Applicant"])}</SheetDescription>
              </SheetHeader>
              <div className="space-y-6 px-4 pb-6">
                <DefinitionList
                  items={Object.entries(openCase)
                    .filter(([k]) => k !== "Case ID")
                    .map(([label, value]) => ({ label, value: String(value) }))}
                />

                {tab === "kyc" ? (
                  <Panel title="Document checklist">
                    <ul className="space-y-2 text-sm">
                      {(
                        documentChecklist[String(openCase["Type"])] ??
                        documentChecklist["Buyer — Organization"] ??
                        []
                      ).map((doc) => (
                        <li key={doc} className="flex items-center justify-between">
                          {doc}
                          <StatusBadge value="Approved" />
                        </li>
                      ))}
                    </ul>
                  </Panel>
                ) : null}

                <Panel title="Reviewer comments">
                  <textarea
                    rows={3}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full rounded-sm border border-input bg-background px-3 py-2 text-sm font-normal focus:border-ring focus:outline-none"
                    placeholder="Add a note for the audit log…"
                  />
                </Panel>

                <div className="flex flex-col gap-2">
                  <GoldButton type="button" onClick={() => decide("Approved")}>
                    Approve
                  </GoldButton>
                  <GhostButton type="button" onClick={() => decide("Info Requested")}>
                    Request information
                  </GhostButton>
                  <GhostButton type="button" onClick={() => decide("Escalated")}>
                    Escalate
                  </GhostButton>
                  <GhostButton type="button" onClick={() => decide("Rejected")}>
                    Reject
                  </GhostButton>
                </div>
              </div>
            </>
          ) : null}
        </SheetContent>
      </Sheet>
    </>
  );
}
