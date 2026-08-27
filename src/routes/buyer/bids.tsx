import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/page-head";
import {
  DataTable,
  DefinitionList,
  FilterBar,
  GoldButton,
  KpiGrid,
  PageHeader,
  Panel,
} from "@/components/adex/kit";
import { buyerBids } from "@/lib/adex-data";

export const Route = createFileRoute("/buyer/bids")({
  head: pageHead(
    "My Bids | ADEX Buyer Portal",
    "Review active, leading, outbid and winning bids with bid history and auction close times.",
  ),
  component: BuyerBids,
});

function BuyerBids() {
  return (
    <>
      <PageHeader title="My Bids" description="Active and historical bidding activity." />
      <KpiGrid
        items={[
          { label: "Active bids", value: "23" },
          { label: "Leading", value: "9" },
          { label: "Outbid", value: "14" },
          { label: "Won (YTD)", value: "31" },
        ]}
      />
      <div className="mt-6">
        <FilterBar fields={["Bid ID", "Item", "Status", "Auction"]} />
        <DataTable rows={buyerBids} linkBase="buyer" />
      </div>

      <Panel title="Place a bid — ADX-S-04412" className="mt-6">
        <div className="grid gap-6 lg:grid-cols-2">
          <DefinitionList
            items={[
              { label: "Estimated value", value: "$184,500" },
              { label: "Current bid", value: "$184,500" },
              { label: "Bid range", value: "$160,000 – $210,000" },
              { label: "Auction ends", value: "21 Aug 2026 16:00 WET" },
            ]}
          />
          <div>
            <label className="flex flex-col gap-1 text-xs font-semibold">
              Bid amount (USD)
              <input
                className="h-9 rounded-sm border border-input bg-background px-3 text-sm font-normal focus:border-ring focus:outline-none"
                placeholder="190,000"
              />
            </label>
            <label className="mt-3 flex items-center gap-2 text-sm">
              <input type="checkbox" className="accent-[var(--gold)]" /> Enable proxy bidding to my
              maximum
            </label>
            <GoldButton className="mt-4">Confirm bid</GoldButton>
          </div>
        </div>
      </Panel>
    </>
  );
}
