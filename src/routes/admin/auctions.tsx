import { createFileRoute, Link } from "@tanstack/react-router";
import { pageHead } from "@/lib/page-head";
import {
  DataTable,
  GhostButton,
  KpiGrid,
  PageHeader,
  Panel,
  Timeline,
} from "@/components/adex/kit";
import { auctionsRows } from "@/lib/adex-data";

export const Route = createFileRoute("/admin/auctions")({
  head: pageHead(
    "Auction Management | ADEX Admin",
    "Monitor auction cycles, the stones and lots assigned to them, bid activity, winner confirmation and relisting.",
  ),
  component: AdminAuctions,
});

function AdminAuctions() {
  return (
    <>
      <PageHeader
        title="Auction Management"
        description="Auctions are assembled from stones and lots — assign items from the Stones & Lots screen, then supervise the cycle here."
        actions={
          <Link
            to="/admin/stones"
            className="h-9 rounded-sm bg-gold px-4 text-sm leading-9 font-semibold text-gold-foreground hover:opacity-90"
          >
            Select stones to auction
          </Link>
        }
      />
      <KpiGrid
        items={[
          { label: "Live auctions", value: "26" },
          { label: "Listings", value: "418" },
          { label: "Bids today", value: "1,204" },
          { label: "Unsold pending review", value: "19" },
        ]}
      />

      <div className="mt-6 space-y-6">
        <Panel title="Auction cycles">
          <DataTable
            dense
            rows={[
              {
                Auction: "AUC-2026-08-A",
                Items: 42,
                Opens: "14 Aug 2026",
                Closes: "21 Aug 2026",
                Bids: 604,
                Status: "Active",
              },
              {
                Auction: "AUC-2026-09-A",
                Items: 18,
                Opens: "04 Sep 2026",
                Closes: "11 Sep 2026",
                Bids: 0,
                Status: "Scheduled",
              },
              {
                Auction: "AUC-2026-07-C",
                Items: 26,
                Opens: "21 Jul 2026",
                Closes: "28 Jul 2026",
                Bids: 388,
                Status: "Unsold",
              },
            ]}
          />
        </Panel>

        <Panel title="Assigned items — AUC-2026-08-A">
          <DataTable rows={auctionsRows} dense linkBase="admin" />
          <div className="mt-4 flex gap-2">
            <GhostButton>Confirm winners</GhostButton>
            <GhostButton>Remove item</GhostButton>
            <GhostButton>Relist selected</GhostButton>
          </div>
        </Panel>

        <Panel title="Relisting flow">
          <Timeline
            steps={[
              { label: "Auction ends", detail: "AUC-2026-07-C closed 28 Jul", done: true },
              { label: "Unsold", detail: "1 lot, 6 stones", done: true },
              { label: "Review", detail: "Operations assessment", done: true },
              { label: "Revaluation", detail: "Sent back to valuation provider", done: false },
              { label: "Relist", detail: "Assign to next cycle from the stone record", done: false },
            ]}
          />
        </Panel>
      </div>
    </>
  );
}
