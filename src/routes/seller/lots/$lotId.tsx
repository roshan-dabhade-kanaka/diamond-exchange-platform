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
import { CertificateCards } from "@/components/adex/stone-gallery";
import { findLot } from "@/lib/adex-records";

export const Route = createFileRoute("/seller/lots/$lotId")({
  loader: ({ params }) => {
    const lot = findLot(params.lotId);
    if (!lot) throw notFound();
    return { lot };
  },
  head: ({ params }) =>
    pageHead(
      `Lot ${params.lotId} | ADEX Seller Portal`,
      "Single lot record: classification, composition, valuation, auction, shipment, payment and certificates.",
    )(),
  notFoundComponent: LotNotFound,
  component: LotRecordPage,
});

function LotNotFound() {
  return (
    <EmptyState
      message="No lot found with that ADEX Lot ID."
      action={
        <Link to="/seller/lots" className="adex-link text-sm">
          Back to My Lots
        </Link>
      }
    />
  );
}

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "composition", label: "Composition" },
  { id: "valuation", label: "Valuation" },
  { id: "auction", label: "Auction & sale" },
  { id: "shipment", label: "Shipment" },
  { id: "payment", label: "Payment" },
  { id: "certificates", label: "Certificates" },
  { id: "history", label: "History" },
];

function LotRecordPage() {
  const { lot } = Route.useLoaderData();
  const [tab, setTab] = useState("overview");
  const [editing, setEditing] = useState(false);

  return (
    <>
      <nav className="mb-3 text-xs text-muted-foreground">
        <Link to="/seller/lots" className="adex-link">
          My Lots
        </Link>{" "}
        / {lot.id}
      </nav>

      <PageHeader
        title={`${lot.id} · ${lot.name}`}
        description={`${lot.classification} · ${lot.stoneCount} stones · ${lot.totalCarat} ct total`}
        actions={
          <>
            <StatusBadge value={lot.status} />
            {lot.editable ? (
              <GoldButton onClick={() => setEditing((v) => !v)}>
                {editing ? "Cancel edit" : "Edit lot"}
              </GoldButton>
            ) : (
              <GhostButton onClick={() => setEditing((v) => !v)}>
                {editing ? "Cancel" : "Request correction"}
              </GhostButton>
            )}
          </>
        }
      />

      <Tabs tabs={tabs} active={tab} onChange={setTab} />

      {editing ? (
        <Panel title={lot.editable ? "Edit lot" : "Request correction"} className="mb-6">
          <p className="mb-4 text-sm text-muted-foreground">
            {lot.editable
              ? "This lot is still editable — changes are recorded in the lot history."
              : "This lot is locked because it has been valued or listed. Submit a correction request for ADEX review."}
          </p>
          <FormGrid
            fields={[
              { label: "Lot name" },
              { label: "Classification" },
              { label: "Number of stones" },
              { label: "Total carat" },
              { label: "Description", type: "textarea" },
              { label: "Reason for change", type: "textarea" },
            ]}
          />
          <div className="mt-4 flex gap-2">
            <GoldButton onClick={() => setEditing(false)}>
              {lot.editable ? "Save changes" : "Submit request"}
            </GoldButton>
            <GhostButton onClick={() => setEditing(false)}>Cancel</GhostButton>
          </div>
        </Panel>
      ) : null}

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
            <Panel title="Lifecycle">
              <Timeline steps={lot.lifecycle} />
            </Panel>
          </div>
        </div>
      ) : null}

      {tab === "composition" ? (
        <div className="space-y-4">
          <DataTable rows={lot.composition} linkBase="seller" dense />
          {lot.editable ? (
            <div className="flex gap-2">
              <GhostButton>Add stone</GhostButton>
              <GhostButton>Remove stone</GhostButton>
            </div>
          ) : null}
        </div>
      ) : null}

      {tab === "valuation" ? (
        lot.valuation ? (
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
            <Panel title={`Valuation ${lot.valuation.reference}`}>
              <DefinitionList items={lot.valuation.items} />
            </Panel>
            <Panel title="Valuation history">
              <Timeline steps={lot.valuation.history} />
            </Panel>
          </div>
        ) : (
          <EmptyState
            message="No valuation requested for this lot yet."
            action={<GoldButton className="mt-2">Request valuation</GoldButton>}
          />
        )
      ) : null}

      {tab === "auction" ? (
        lot.auction.length ? (
          <DataTable rows={lot.auction} linkBase="seller" />
        ) : (
          <EmptyState
            message="This lot is not in an auction."
            action={<GoldButton className="mt-2">Submit to next auction</GoldButton>}
          />
        )
      ) : null}

      {tab === "shipment" ? (
        lot.shipment ? (
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
            <Panel title={`Shipment ${lot.shipment.id}`}>
              <DefinitionList items={lot.shipment.items} />
            </Panel>
            <Panel title="Status">
              <Timeline steps={lot.shipment.steps} />
            </Panel>
          </div>
        ) : (
          <Panel title="Arrange shipment">
            <FormGrid
              fields={[
                { label: "Logistics provider" },
                { label: "Pickup location" },
                { label: "Destination" },
                { label: "Requested pickup date", type: "date" },
                { label: "Declared value" },
                { label: "Instructions", type: "textarea" },
              ]}
            />
            <div className="mt-4 flex gap-2">
              <GoldButton>Request shipment</GoldButton>
              <GhostButton>Save draft</GhostButton>
            </div>
          </Panel>
        )
      ) : null}

      {tab === "payment" ? (
        lot.payment ? (
          <div className="grid gap-6 lg:grid-cols-2">
            <Panel title="Payment">
              <DefinitionList items={lot.payment.items} />
            </Panel>
            <Panel title="Payment composition">
              <DataTable rows={lot.payment.breakdown} dense />
            </Panel>
          </div>
        ) : (
          <EmptyState message="No payment raised for this lot yet." />
        )
      ) : null}

      {tab === "certificates" ? (
        <div className="space-y-6">
          <CertificateCards />
          {lot.certificates.length ? <DataTable rows={lot.certificates} dense /> : null}
          <Panel title="Attach a certificate">
            <FormGrid
              fields={[
                { label: "Certificate type" },
                { label: "Certificate number" },
                { label: "Issuing body" },
                { label: "Issue date", type: "date" },
                { label: "Document", type: "file" },
                { label: "Applies to", type: "textarea" },
              ]}
            />
            <div className="mt-4 flex gap-2">
              <GoldButton>Attach to {lot.id}</GoldButton>
              <GhostButton>Cancel</GhostButton>
            </div>
          </Panel>
        </div>
      ) : null}

      {tab === "history" ? <DataTable rows={lot.history} dense /> : null}
    </>
  );
}
