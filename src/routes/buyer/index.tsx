import { createFileRoute, Link } from "@tanstack/react-router";
import { pageHead } from "@/lib/page-head";
import { DataTable, KpiGrid, PageHeader, Panel, StatusBadge } from "@/components/adex/kit";
import { PurchaseCard } from "@/components/adex/journey";
import { buyerBids, listings, purchases } from "@/lib/adex-data";
import { StoneThumb } from "@/components/adex/stone-gallery";

export const Route = createFileRoute("/buyer/")({
  head: pageHead(
    "Buyer Dashboard | ADEX",
    "Start with what is live: lots closing soon, bids that need attention and purchases moving from payment to delivery.",
  ),
  component: BuyerDashboard,
});

function BuyerDashboard() {
  const inFlight = purchases.filter((p) => p.stage < 4);

  return (
    <>
      <PageHeader
        title="Buying today"
        description="Live lots first, then anything waiting on you. Past purchases stay out of the way."
        actions={
          <Link
            to="/buyer/marketplace"
            className="h-9 rounded-sm bg-gold px-4 text-sm leading-9 font-semibold text-gold-foreground hover:opacity-90"
          >
            Open marketplace
          </Link>
        }
      />

      <Panel
        title="Closing soon — ready to bid"
        action={
          <Link to="/buyer/marketplace" className="adex-link text-sm">
            See all lots
          </Link>
        }
      >
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {listings.slice(0, 4).map((l) => (
            <Link
              key={l.id}
              to="/buyer/marketplace"
              className="adex-panel block overflow-hidden hover:border-gold"
            >
              <StoneThumb stoneId={l.id} className="aspect-[4/3] w-full" />
              <div className="p-3">
                <div className="flex items-start justify-between gap-2">
                  <span className="adex-link text-xs">{l.id}</span>
                  <StatusBadge value={l.status} />
                </div>
                <p className="mt-1 truncate text-sm font-semibold">{l.title}</p>
                <p className="text-xs text-muted-foreground">
                  {l.carat} · ends in {l.endsIn}
                </p>
                <p className="mt-1 text-sm font-semibold">{l.currentBid}</p>
              </div>
            </Link>
          ))}
        </div>
      </Panel>

      <section className="mt-6">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-display text-lg">Needs you next</h2>
          <Link to="/buyer/orders" className="adex-link text-sm">
            All orders
          </Link>
        </div>
        <div className="space-y-4">
          {inFlight.map((p) => (
            <PurchaseCard key={p.orderId} purchase={p} />
          ))}
        </div>
      </section>

      <div className="mt-6">
        <KpiGrid
          items={[
            { label: "Active Bids", value: "23" },
            { label: "Leading", value: "7" },
            { label: "Awaiting payment", value: "$189,220" },
            { label: "In transit", value: "1" },
          ]}
        />
      </div>

      <div className="mt-6 min-w-0">
        <Panel
          title="Live bids"
          action={
            <Link to="/buyer/bids" className="adex-link text-sm">
              View all
            </Link>
          }
        >
          <DataTable
            rows={buyerBids}
            only={["Bid ID", "Item", "My Bid", "Status"]}
            dense
            linkBase="buyer"
          />
        </Panel>
      </div>
    </>
  );
}
