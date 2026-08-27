import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/page-head";
import { DataTable, KpiGrid, PageHeader, Panel } from "@/components/adex/kit";
import { auctionsRows } from "@/lib/adex-data";

export const Route = createFileRoute("/seller/auctions")({
  head: pageHead(
    "Auctions & Sales | ADEX Seller Portal",
    "Monitor active listings, upcoming and completed auctions, unsold stones and relisting outcomes.",
  ),
  component: SellerAuctions,
});

function SellerAuctions() {
  return (
    <>
      <PageHeader
        title="Auctions & Sales"
        description="Listing, auction and sale status across your inventory."
      />
      <KpiGrid
        items={[
          { label: "Active listings", value: "58" },
          { label: "Upcoming auctions", value: "4" },
          { label: "Completed auctions", value: "31" },
          { label: "Unsold / relisted", value: "7" },
        ]}
      />
      <div className="mt-6 space-y-6">
        <Panel title="Auction status">
          <DataTable rows={auctionsRows} dense linkBase="seller" />
        </Panel>
        <Panel title="Sale status">
          <DataTable
            dense
            rows={[
              { Sale: "SAL-7712", Item: "ADX-S-04397", "Winning Bid": "$41,900", Buyer: "Vermeulen Gems", Payment: "Paid", Shipment: "Delivered", Status: "Completed" },
              { Sale: "SAL-7708", Item: "ADX-L-0299", "Winning Bid": "$318,900", Buyer: "Meridian Rough", Payment: "Pending", Shipment: "Pending", Status: "Awaiting Payment" },
            ]}
          />
        </Panel>
      </div>
    </>
  );
}
