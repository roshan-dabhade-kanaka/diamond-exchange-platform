import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/page-head";
import {
  DataTable,
  FilterBar,
  FormGrid,
  GhostButton,
  GoldButton,
  KpiGrid,
  PageHeader,
  Panel,
} from "@/components/adex/kit";
import { listings, returnsRows, shipments } from "@/lib/adex-data";

export const Route = createFileRoute("/admin/logistics")({
  head: pageHead(
    "Logistics | ADEX Admin",
    "Manage shipments, carrier tracking, returns with supporting documentation, and export documents attached to each stone or lot.",
  ),
  component: AdminLogistics,
});

function AdminLogistics() {
  const [exportStoneId, setExportStoneId] = useState("");
  const targetStone = listings.find((l) => l.id === exportStoneId);
  const canGenerate = targetStone ? targetStone.isKimberleyApproved : false;

  return (
    <>
      <PageHeader
        title="Logistics"
        description="Shipment supervision, provider performance, returns and export documents. Every document is filed against a stone or lot."
        actions={<GhostButton>Assign provider</GhostButton>}
      />
      <KpiGrid
        items={[
          { label: "Active shipments", value: "42" },
          { label: "In customs", value: "3" },
          { label: "Delayed", value: "2" },
          { label: "Open returns", value: "4" },
        ]}
      />
      <div className="mt-6">
        <FilterBar fields={["Shipment ID", "Provider", "Route", "Status"]} />
        <DataTable rows={shipments} linkBase="admin" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Panel title="Returns">
          <DataTable rows={returnsRows} dense linkBase="admin" />
          <p className="mt-3 text-xs text-muted-foreground">
            A return can only be resolved once the required documentation is on file.
          </p>
        </Panel>

        <Panel title="Return documentation — RET-2041 (ADX-S-04397)">
          <DataTable
            dense
            rows={[
              { Document: "Buyer inspection report", Required: "Yes", Uploaded: "10 Aug 2026", Status: "Approved" },
              { Document: "Photographs of stone", Required: "Yes", Uploaded: "10 Aug 2026", Status: "Approved" },
              { Document: "Courier damage proof", Required: "Yes", Uploaded: "—", Status: "Pending" },
              { Document: "Re-grading certificate", Required: "No", Uploaded: "—", Status: "Pending" },
            ]}
          />
          <div className="mt-4">
            <FormGrid
              fields={[
                { label: "Return reference" },
                { label: "Document type" },
                { label: "File", type: "file" },
                { label: "Reviewer notes", type: "textarea" },
              ]}
            />
            <div className="mt-4 flex gap-2">
              <GoldButton>Upload return document</GoldButton>
              <GhostButton>Resolve return</GhostButton>
            </div>
          </div>
        </Panel>
      </div>

      <Panel title="Export documents" className="mt-6">
        <DataTable
          dense
          linkBase="admin"
          rows={[
            {
              Document: "Export licence CD-EX-4471",
              Item: "ADX-S-04412",
              Shipment: "SHP-51204",
              Uploaded: "17 Aug 2026",
              Status: "Approved",
            },
            {
              Document: "Kimberley certificate KP-4471902",
              Item: "ADX-S-04412",
              Shipment: "SHP-51204",
              Uploaded: "17 Aug 2026",
              Status: "Approved",
            },
            {
              Document: "Customs declaration",
              Item: "ADX-L-0312",
              Shipment: "SHP-51188",
              Uploaded: "18 Aug 2026",
              Status: "Under Review",
            },
          ]}
        />
        <div className="mt-4">
          <label className="mb-4 flex flex-col gap-1 text-xs font-semibold">
            Stone / Lot ID
            <select
              value={exportStoneId}
              onChange={(e) => setExportStoneId(e.target.value)}
              className="h-9 w-full max-w-xs rounded-sm border border-input bg-background px-2 text-sm font-normal focus:border-ring focus:outline-none"
            >
              <option value="">Select an item…</option>
              {listings.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.id} — {l.title}
                </option>
              ))}
            </select>
          </label>
          {exportStoneId && !canGenerate ? (
            <p className="mb-4 border-l-4 border-destructive bg-destructive/5 p-3 text-sm text-destructive">
              Export documents cannot be generated for {exportStoneId} — its Kimberley Process
              certificate is not yet approved. Approve the certificate before proceeding.
            </p>
          ) : null}
          <FormGrid
            fields={[
              { label: "Linked shipment" },
              { label: "Document type" },
              { label: "File", type: "file" },
            ]}
          />
          <div className="mt-4 flex gap-2">
            <GoldButton type="button" disabled={!canGenerate}>
              Generate export document
            </GoldButton>
            <GhostButton type="button" disabled={!canGenerate}>
              Verify
            </GhostButton>
            <GhostButton type="button">Download</GhostButton>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Documents must be attached to a stone or lot — standalone uploads are not accepted.
          </p>
        </div>
      </Panel>
    </>
  );
}
