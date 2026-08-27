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
import { StoneGallery, CertificateCards } from "@/components/adex/stone-gallery";
import { findStone } from "@/lib/adex-records";

export const Route = createFileRoute("/seller/stones/$stoneId")({
  loader: ({ params }) => {
    const stone = findStone(params.stoneId);
    if (!stone) throw notFound();
    return { stone };
  },
  head: ({ params }) =>
    pageHead(
      `Stone ${params.stoneId} | ADEX Seller Portal`,
      "Single stone record: registration, valuation, auction, shipment, payment, certificates and full history.",
    )(),
  notFoundComponent: StoneNotFound,
  component: StoneRecordPage,
});

function StoneNotFound() {
  return (
    <EmptyState
      message="No stone found with that ADEX Stone ID."
      action={
        <Link to="/seller/stones" className="adex-link text-sm">
          Back to My Stones
        </Link>
      }
    />
  );
}

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "valuation", label: "Valuation" },
  { id: "auction", label: "Auction & sale" },
  { id: "shipment", label: "Shipment" },
  { id: "payment", label: "Payment" },
  { id: "certificates", label: "Certificates" },
  { id: "history", label: "History" },
];

function StoneRecordPage() {
  const { stone } = Route.useLoaderData();
  const [tab, setTab] = useState("overview");
  const [editing, setEditing] = useState(false);

  return (
    <>
      <nav className="mb-3 text-xs text-muted-foreground">
        <Link to="/seller/stones" className="adex-link">
          My Stones
        </Link>{" "}
        / {stone.id}
      </nav>

      <PageHeader
        title={`${stone.id} · ${stone.carat} ct`}
        description={`${stone.classification} · ${stone.origin} · currently at ${stone.location}`}
        actions={
          <>
            <StatusBadge value={stone.status} />
            {stone.editable ? (
              <GoldButton onClick={() => setEditing((v) => !v)}>
                {editing ? "Cancel edit" : "Edit registration"}
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
        <Panel
          title={stone.editable ? "Edit registration" : "Request correction"}
          className="mb-6"
        >
          <p className="mb-4 text-sm text-muted-foreground">
            {stone.editable
              ? "This stone is still editable — changes are recorded in the stone history."
              : "This stone is locked because it has been valued or listed. Submit a correction request; ADEX operations will review it and the change will appear in the history."}
          </p>
          <FormGrid
            fields={[
              { label: "Barcode" },
              { label: "Weight / carat" },
              { label: "Classification" },
              { label: "Collection location" },
              { label: "Source reference" },
              { label: "Reason for change", type: "textarea" },
            ]}
          />
          <div className="mt-4 flex gap-2">
            <GoldButton onClick={() => setEditing(false)}>
              {stone.editable ? "Save changes" : "Submit request"}
            </GoldButton>
            <GhostButton onClick={() => setEditing(false)}>Cancel</GhostButton>
          </div>
        </Panel>
      ) : null}

      {tab === "overview" ? (
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
          <div className="min-w-0 space-y-6">
            <StoneGallery stoneId={stone.id} />
            <Panel title="Registration details">
              <DefinitionList items={stone.registration} />
            </Panel>
          </div>
          <div className="min-w-0 space-y-6">
            <Panel title="Lifecycle">
              <Timeline steps={stone.lifecycle} />
            </Panel>
            <Panel title="At a glance">
              <DefinitionList
                items={[
                  { label: "Seller", value: stone.seller },
                  { label: "Lot", value: stone.lot },
                  { label: "Valuation", value: stone.valuation?.status ?? "Not requested" },
                  { label: "Auction", value: stone.auction[0]?.["Status"]?.toString() ?? "—" },
                  { label: "Shipment", value: stone.shipment?.id ?? "Not started" },
                  { label: "Payment", value: stone.payment?.items.at(-1)?.value ?? "—" },
                ]}
              />
            </Panel>
          </div>
        </div>
      ) : null}

      {tab === "valuation" ? (
        stone.valuation ? (
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
            <Panel title={`Valuation ${stone.valuation.reference}`}>
              <DefinitionList items={stone.valuation.items} />
            </Panel>
            <Panel title="Valuation history">
              <Timeline steps={stone.valuation.history} />
            </Panel>
          </div>
        ) : (
          <EmptyState
            message="No valuation requested for this stone yet."
            action={<GoldButton className="mt-2">Request valuation</GoldButton>}
          />
        )
      ) : null}

      {tab === "auction" ? (
        stone.auction.length ? (
          <div className="space-y-6">
            <DataTable rows={stone.auction} linkBase="seller" />
            <Panel title="Sale">
              <DefinitionList
                items={[
                  { label: "Auction", value: String(stone.auction[0]!["Auction"]) },
                  { label: "Current / final bid", value: String(stone.auction[0]!["Current Bid"]) },
                  { label: "Bids", value: String(stone.auction[0]!["Bids"]) },
                  { label: "Closes", value: String(stone.auction[0]!["Ends"]) },
                ]}
              />
            </Panel>
          </div>
        ) : (
          <EmptyState
            message="This stone is not in an auction."
            action={<GoldButton className="mt-2">Submit to next auction</GoldButton>}
          />
        )
      ) : null}

      {tab === "shipment" ? (
        stone.shipment ? (
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
            <Panel title={`Shipment ${stone.shipment.id}`}>
              <DefinitionList items={stone.shipment.items} />
              <div className="mt-4 flex gap-2">
                <GhostButton>Track shipment</GhostButton>
                <GhostButton>Download documents</GhostButton>
              </div>
            </Panel>
            <Panel title="Status">
              <Timeline steps={stone.shipment.steps} />
            </Panel>
          </div>
        ) : (
          <Panel title="Arrange shipment">
            <p className="mb-4 text-sm text-muted-foreground">
              Shipments start from the stone. Choose a provider and destination — the shipment will
              be tracked on this record.
            </p>
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
        stone.payment ? (
          <div className="grid gap-6 lg:grid-cols-2">
            <Panel title="Payment">
              <DefinitionList items={stone.payment.items} />
            </Panel>
            <Panel title="Payment composition">
              <DataTable rows={stone.payment.breakdown} dense />
            </Panel>
          </div>
        ) : (
          <EmptyState message="No payment raised for this stone yet." />
        )
      ) : null}

      {tab === "certificates" ? (
        <div className="space-y-6">
          <CertificateCards />
          {stone.certificates.length ? (
            <DataTable rows={stone.certificates} dense />
          ) : (
            <EmptyState message="No certificates issued for this stone yet." />
          )}
          <Panel title="Attach a certificate">
            <FormGrid
              fields={[
                { label: "Certificate type" },
                { label: "Certificate number" },
                { label: "Issuing body" },
                { label: "Issue date", type: "date" },
                { label: "Document", type: "file" },
                { label: "Notes", type: "textarea" },
              ]}
            />
            <div className="mt-4 flex gap-2">
              <GoldButton>Attach to {stone.id}</GoldButton>
              <GhostButton>Cancel</GhostButton>
            </div>
          </Panel>
        </div>
      ) : null}

      {tab === "history" ? <DataTable rows={stone.history} dense /> : null}
    </>
  );
}
