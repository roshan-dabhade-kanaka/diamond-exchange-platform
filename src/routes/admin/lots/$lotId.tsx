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
  KpiGrid,
  PageHeader,
  Panel,
  StatusBadge,
  Tabs,
  Timeline,
} from "@/components/adex/kit";
import { findLot } from "@/lib/adex-records";

export const Route = createFileRoute("/admin/lots/$lotId")({
  loader: ({ params }) => {
    const lot = findLot(params.lotId);
    if (!lot) throw notFound();
    return { lot };
  },
  head: ({ params }) =>
    pageHead(
      `Lot ${params.lotId} | ADEX Admin`,
      "Operational lot record: composition, valuation provider status, auction assignment, logistics documents and audit history.",
    )(),
  notFoundComponent: AdminLotNotFound,
  component: AdminLotRecord,
});

function AdminLotNotFound() {
  return (
    <EmptyState
      message="No lot found with that ADEX Lot ID."
      action={
        <Link to="/admin/stones" className="adex-link text-sm">
          Back to Stones &amp; Lots
        </Link>
      }
    />
  );
}

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "composition", label: "Composition" },
  { id: "valuation", label: "Valuation" },
  { id: "auction", label: "Auction" },
  { id: "logistics", label: "Logistics & documents" },
  { id: "certificates", label: "Certificates" },
  { id: "history", label: "Audit history" },
];

function AdminLotRecord() {
  const { lot } = Route.useLoaderData();
  const [tab, setTab] = useState("overview");

  return (
    <>
      <nav className="mb-3 text-xs text-muted-foreground">
        <Link to="/admin/stones" className="adex-link">
          Stones &amp; Lots
        </Link>{" "}
        / {lot.id}
      </nav>

      <PageHeader
        title={`${lot.id} · ${lot.name}`}
        description={`${lot.classification} · ${lot.stoneCount} stones · ${lot.totalCarat} ct total`}
        actions={
          <>
            <StatusBadge value={lot.status} />
            <GhostButton>Edit record</GhostButton>
            <GoldButton>Add to auction</GoldButton>
          </>
        }
      />

      <Tabs tabs={tabs} active={tab} onChange={setTab} />

      {tab === "overview" ? (
        <div className="space-y-6">
          <KpiGrid
            items={[
              { label: "Stones", value: String(lot.stoneCount) },
              { label: "Total carat", value: `${lot.totalCarat} ct` },
              { label: "Classification", value: lot.classification },
              { label: "Estimated value", value: lot.estimatedValue },
            ]}
          />
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
            <Panel title="Lot details">
              <DefinitionList items={lot.registration} />
            </Panel>
            <Panel title="Processing history">
              <Timeline steps={lot.lifecycle} />
            </Panel>
          </div>
        </div>
      ) : null}

      {tab === "composition" ? <DataTable rows={lot.composition} linkBase="admin" dense /> : null}

      {tab === "valuation" ? (
        lot.valuation ? (
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
            <Panel title={`Valuation ${lot.valuation.reference} — third-party provider`}>
              <DefinitionList items={lot.valuation.items} />
              <div className="mt-4 flex gap-2">
                <GhostButton>Re-request valuation</GhostButton>
                <GhostButton>Override with reason</GhostButton>
              </div>
            </Panel>
            <Panel title="Provider exchange">
              <Timeline steps={lot.valuation.history} />
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
        lot.auction.length ? (
          <DataTable rows={lot.auction} linkBase="admin" />
        ) : (
          <Panel title="Add to auction">
            <p className="mb-4 text-sm text-muted-foreground">
              Auctions are assembled from stones and lots. Assign this lot to an auction cycle and
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
          {lot.shipment ? (
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
              <Panel title={`Shipment ${lot.shipment.id}`}>
                <DefinitionList items={lot.shipment.items} />
              </Panel>
              <Panel title="Status">
                <Timeline steps={lot.shipment.steps} />
              </Panel>
            </div>
          ) : (
            <EmptyState message="No shipment linked to this lot." />
          )}
          <Panel title={`Documents attached to ${lot.id}`}>
            <FormGrid
              fields={[
                { label: "Document type" },
                { label: "Linked shipment" },
                { label: "File", type: "file" },
                { label: "Notes", type: "textarea" },
              ]}
            />
            <div className="mt-4 flex gap-2">
              <GoldButton>Upload against {lot.id}</GoldButton>
              <GhostButton>Cancel</GhostButton>
            </div>
          </Panel>
        </div>
      ) : null}

      {tab === "certificates" ? (
        lot.certificates.length ? (
          <DataTable rows={lot.certificates} dense linkBase="admin" />
        ) : (
          <EmptyState message="No certificates issued for this lot." />
        )
      ) : null}

      {tab === "history" ? <DataTable rows={lot.history} dense /> : null}
    </>
  );
}
