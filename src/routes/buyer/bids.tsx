import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/page-head";
import { DataTable, EmptyState, KpiGrid, PageHeader, Panel, Tabs } from "@/components/adex/kit";
import { BidForm } from "@/components/adex/bid-form";
import { buyerBids, listings, type Row } from "@/lib/adex-data";
import { formatCountdown, isClosingSoon } from "@/lib/rules";

export const Route = createFileRoute("/buyer/bids")({
  head: pageHead(
    "My Bids | ADEX Buyer Portal",
    "Review active, leading, outbid and winning bids with bid history and auction close times.",
  ),
  component: BuyerBids,
});

type Tab = "all" | "leading" | "outbid" | "closing";

function BuyerBids() {
  const [tab, setTab] = useState<Tab>("all");
  const [selectedId, setSelectedId] = useState(listings[0]!.id);
  const [confirmations, setConfirmations] = useState<Record<string, number>>({});

  const leading = buyerBids.filter((b) => b["Status"] === "Leading" || b["Status"] === "Won");
  const outbid = buyerBids.filter((b) => b["Status"] === "Outbid");
  const closingSoonListings = listings.filter((l) => isClosingSoon(l.biddingWindowEnd));

  const rowsForTab: Row[] = useMemo(() => {
    if (tab === "leading") return leading;
    if (tab === "outbid") return outbid;
    if (tab === "closing") {
      const closingIds = new Set(closingSoonListings.map((l) => l.id));
      return buyerBids.filter((b) => closingIds.has(String(b["Item"])));
    }
    return buyerBids;
  }, [tab, leading, outbid, closingSoonListings]);

  const selected = listings.find((l) => l.id === selectedId) ?? listings[0]!;

  return (
    <>
      <PageHeader title="My Bids" description="Active and historical bidding activity." />
      <KpiGrid
        items={[
          { label: "Active bids", value: String(buyerBids.length) },
          { label: "Leading", value: String(leading.length) },
          { label: "Outbid", value: String(outbid.length) },
          { label: "Closing soon", value: String(closingSoonListings.length) },
        ]}
      />
      <div className="mt-6">
        <Tabs
          tabs={[
            { id: "all", label: "All", badge: String(buyerBids.length) },
            { id: "leading", label: "Leading", badge: String(leading.length) },
            { id: "outbid", label: "Outbid", badge: String(outbid.length) },
            { id: "closing", label: "Closing soon", badge: String(closingSoonListings.length) },
          ]}
          active={tab}
          onChange={(id) => setTab(id as Tab)}
        />
        {rowsForTab.length === 0 ? (
          <EmptyState message="No bids in this view." />
        ) : (
          <DataTable rows={rowsForTab} linkBase="buyer" />
        )}
      </div>

      <Panel title="Place a bid" className="mt-6">
        <label className="mb-4 flex flex-col gap-1 text-xs font-semibold">
          Lot
          <select
            value={selectedId}
            onChange={(e) => setSelectedId(e.target.value)}
            className="h-9 w-full max-w-sm rounded-sm border border-input bg-background px-2 text-sm font-normal focus:border-ring focus:outline-none"
          >
            {listings.map((l) => (
              <option key={l.id} value={l.id}>
                {l.id} — {l.title}
              </option>
            ))}
          </select>
        </label>
        <div className="grid gap-6 lg:grid-cols-2">
          <dl className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
            {[
              ["Estimated value", selected.estimate],
              ["Current bid", selected.currentBid],
              ["Auction ends", formatCountdown(selected.biddingWindowEnd)],
            ].map(([label, value]) => (
              <div key={label} className="border-b border-border pb-2">
                <dt className="text-xs tracking-wide text-muted-foreground uppercase">{label}</dt>
                <dd className="mt-0.5 text-sm font-medium">{value}</dd>
              </div>
            ))}
          </dl>
          <div>
            {confirmations[selectedId] ? (
              <p className="text-sm font-semibold">
                Bid of{" "}
                {confirmations[selectedId]!.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                  maximumFractionDigits: 0,
                })}{" "}
                confirmed on {selectedId}.
              </p>
            ) : (
              <BidForm
                estimate={selected.estimate}
                currentBid={selected.currentBid}
                onSubmit={(amount) => setConfirmations((c) => ({ ...c, [selectedId]: amount }))}
              />
            )}
          </div>
        </div>
      </Panel>
    </>
  );
}
