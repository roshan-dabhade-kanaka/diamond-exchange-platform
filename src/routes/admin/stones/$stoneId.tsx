import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { pageHead } from "@/lib/page-head";
import {
  DataTable,
  DefinitionList,
  EmptyState,
  FormGrid,
  GhostButton,
  GoldButton,
  PageHeader,
  Panel,
  StatusBadge,
  Tabs,
  Timeline,
} from "@/components/adex/kit";
import { StoneGallery } from "@/components/adex/stone-gallery";
import { findStone } from "@/lib/adex-records";

export const Route = createFileRoute("/admin/stones/$stoneId")({
  loader: ({ params }) => {
    const stone = findStone(params.stoneId);
    if (!stone) throw notFound();
    return { stone };
  },
  head: ({ params }) =>
    pageHead(
      `Stone ${params.stoneId} | ADEX Admin`,
      "Operational stone record: processing, valuation, auction assignment, logistics documents and audit history.",
    )(),
  notFoundComponent: AdminStoneNotFound,
  component: AdminStoneRecord,
});

function AdminStoneNotFound() {
  return (
    <EmptyState
      message="No stone found with that ADEX Stone ID."
      action={
        <Link to="/admin/stones" className="adex-link text-sm">
          Back to Stones & Lots
        </Link>
      }
    />
  );
}

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "valuation", label: "Valuation" },
  { id: "auction", label: "Auction" },
  { id: "logistics", label: "Logistics & documents" },
  { id: "certificates", label: "Certificates" },
  { id: "history", label: "Audit history" },
];

function AdminStoneRecord() {
  const { stone } = Route.useLoaderData();
  const [tab, setTab] = useState("overview");

  return (
    <>
      <nav className="mb-3 text-xs text-muted-foreground">
        <Link to="/admin/stones" className="adex-link">
          Stones &amp; Lots
        </Link>{" "}
        / {stone.id}
      </nav>

      <PageHeader
        title={`${stone.id} · ${stone.carat} ct`}
        description={`${stone.seller} · ${stone.classification} · ${stone.location}`}
        actions={
          <>
            <StatusBadge value={stone.status} />
            <GhostButton>Edit record</GhostButton>
            <GoldButton>Add to auction</GoldButton>
          </>
        }
      />

      <Tabs tabs={tabs} active={tab} onChange={setTab} />

      {tab === "overview" ? (
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
          <div className="min-w-0 space-y-6">
            <StoneGallery stoneId={stone.id} />
            <Panel title="Registration">
              <DefinitionList items={stone.registration} />
            </Panel>
          </div>
          <Panel title="Processing history">
            <Timeline steps={stone.lifecycle} />
          </Panel>
        </div>
      ) : null}

      {tab === "valuation" ? (
        stone.valuation ? (
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
            <Panel title={`Valuation ${stone.valuation.reference} — third-party provider`}>
              <DefinitionList items={stone.valuation.items} />
              <div className="mt-4 flex gap-2">
                <GhostButton>Re-request valuation</GhostButton>
                <GhostButton>Override with reason</GhostButton>
              </div>
            </Panel>
            <Panel title="Provider exchange">
              <Timeline steps={stone.valuation.history} />
            </Panel>
          </div>
        ) : (
          <EmptyState
            message="No valuation requested from the provider yet."
            action={<GoldButton className="mt-2">Send to valuation provider</GoldButton>}
          />
        )
      ) : null}

      {tab === "auction" ? (
        stone.auction.length ? (
          <DataTable rows={stone.auction} linkBase="admin" />
        ) : (
          <Panel title="Add to auction">
            <p className="mb-4 text-sm text-muted-foreground">
              Auctions are assembled from stones and lots. Assign this stone to an auction cycle and
              set its reserve.
            </p>
            <FormGrid
              fields={[
                { label: "Auction cycle" },
                { label: "Start price" },
                { label: "Reserve price" },
                { label: "Bid increment" },
                { label: "Opens", type: "date" },
                { label: "Closes", type: "date" },
              ]}
            />
            <div className="mt-4 flex gap-2">
              <GoldButton>Assign to auction</GoldButton>
              <GhostButton>Cancel</GhostButton>
            </div>
          </Panel>
        )
      ) : null}

      {tab === "logistics" ? (
        <div className="space-y-6">
          {stone.shipment ? (
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
              <Panel title={`Shipment ${stone.shipment.id}`}>
                <DefinitionList items={stone.shipment.items} />
              </Panel>
              <Panel title="Status">
                <Timeline steps={stone.shipment.steps} />
              </Panel>
            </div>
          ) : (
            <EmptyState message="No shipment linked to this stone." />
          )}
          <Panel title={`Documents attached to ${stone.id}`}>
            <DataTable
              dense
              rows={[
                {
                  Document: "Export licence CD-EX-4471",
                  Attached: "17 Aug 2026",
                  "Uploaded By": "L. Okafor",
                  Status: "Approved",
                },
                {
                  Document: "Customs declaration",
                  Attached: "18 Aug 2026",
                  "Uploaded By": "L. Okafor",
                  Status: "Under Review",
                },
              ]}
            />
            <div className="mt-4">
              <FormGrid
                fields={[
                  { label: "Document type" },
                  { label: "Linked shipment" },
                  { label: "File", type: "file" },
                  { label: "Notes", type: "textarea" },
                ]}
              />
              <div className="mt-4 flex gap-2">
                <GoldButton>Upload against {stone.id}</GoldButton>
                <GhostButton>Cancel</GhostButton>
              </div>
            </div>
          </Panel>
        </div>
      ) : null}

      {tab === "certificates" ? (
        stone.certificates.length ? (
          <DataTable rows={stone.certificates} dense linkBase="admin" />
        ) : (
          <EmptyState message="No certificates issued for this stone." />
        )
      ) : null}

      {tab === "history" ? <DataTable rows={stone.history} dense /> : null}
    </>
  );
}
