import { createFileRoute, Link } from "@tanstack/react-router";
import { pageHead } from "@/lib/page-head";
import { DataTable, KpiGrid, PageHeader, Panel } from "@/components/adex/kit";
import {
  auctionsRows,
  payments,
  pendingActions,
  sellerKpis,
  sellerStones,
} from "@/lib/adex-data";

export const Route = createFileRoute("/seller/")({
  head: pageHead(
    "Seller Dashboard | ADEX",
    "Track stones, lots, valuations, auctions, shipments and payments across the full ADEX selling lifecycle.",
  ),
  component: SellerDashboard,
});

function SellerDashboard() {
  return (
    <>
      <PageHeader
        title="Seller Dashboard"
        description="Summary of your stones, auctions, shipments and settlements."
        actions={
          <Link
            to="/seller/stones"
            className="h-9 rounded-sm bg-gold px-4 text-sm leading-9 font-semibold text-gold-foreground hover:opacity-90"
          >
            Register stone
          </Link>
        }
      />

      <KpiGrid items={sellerKpis} />

      <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
        <div className="min-w-0 space-y-6">
          <Panel
            title="Recent stones"
            action={
              <Link to="/seller/stones" className="adex-link text-sm">
                View all
              </Link>
            }
          >
            <DataTable
              rows={sellerStones.slice(0, 4)}
              only={["Stone ID", "Carat", "Status", "Valuation"]}
              dense
              linkBase="seller"
            />
          </Panel>

          <Panel
            title="Active auctions"
            action={
              <Link to="/seller/auctions" className="adex-link text-sm">
                View all
              </Link>
            }
          >
            <DataTable
              rows={auctionsRows.slice(0, 3)}
              only={["Auction", "Item", "Current Bid", "Status"]}
              dense
              linkBase="seller"
            />
          </Panel>

          <Panel
            title="Payment summary"
            action={
              <Link to="/seller/payments" className="adex-link text-sm">
                View all
              </Link>
            }
          >
            <DataTable rows={payments} only={["Payment ID", "Amount", "Date", "Status"]} dense />
          </Panel>
        </div>

        <div className="min-w-0 space-y-6">
          <Panel title="Pending actions">
            <ul className="space-y-3">
              {pendingActions.map((a) => (
                <li key={a.title} className="border-b border-border pb-3 last:border-0 last:pb-0">
                  <p className="text-sm font-semibold">{a.title}</p>
                  <p className="text-xs text-muted-foreground">{a.detail}</p>
                  <button className="adex-link mt-1 text-xs">{a.cta} →</button>
                </li>
              ))}
            </ul>
          </Panel>

          <Panel title="Shipment summary">
            <ul className="space-y-2 text-sm">
              {[
                ["In transit", "5"],
                ["Awaiting pickup", "2"],
                ["Customs", "1"],
                ["Delivered (30d)", "14"],
              ].map(([k, v]) => (
                <li key={k} className="flex justify-between border-b border-border pb-2">
                  <span>{k}</span>
                  <span className="font-semibold">{v}</span>
                </li>
              ))}
            </ul>
          </Panel>
        </div>
      </div>
    </>
  );
}
