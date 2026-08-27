import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { pageHead } from "@/lib/page-head";
import {
  DataTable,
  GhostButton,
  GoldButton,
  KpiGrid,
  PageHeader,
  Panel,
  Timeline,
} from "@/components/adex/kit";
import { auctionsRows, type Row } from "@/lib/adex-data";

const RELIST_DISCOUNT_PERCENT = 10;

export const Route = createFileRoute("/admin/auctions")({
  head: pageHead(
    "Auction Management | ADEX Admin",
    "Monitor auction cycles, the stones and lots assigned to them, bid activity, winner confirmation and relisting.",
  ),
  component: AdminAuctions,
});

const unsoldItems: Row[] = [
  { Lot: "ADX-S-04371", Auction: "AUC-2026-07-C", "Start Price": "$240,000", Bids: 0, Status: "Unsold" },
];

function AdminAuctions() {
  const [relisted, setRelisted] = useState<Set<string>>(new Set());

  function relist(lotId: string) {
    setRelisted((prev) => new Set(prev).add(lotId));
  }

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
            <GhostButton type="button">Confirm winners</GhostButton>
            <GhostButton type="button">Remove item</GhostButton>
          </div>
        </Panel>

        <Panel title="Unsold — relist at lower price">
          <div className="space-y-3">
            {unsoldItems.map((item) => {
              const lotId = String(item["Lot"]);
              const isRelisted = relisted.has(lotId);
              const startPrice = Number(String(item["Start Price"]).replace(/[^0-9]/g, ""));
              const newPrice = Math.round(startPrice * (1 - RELIST_DISCOUNT_PERCENT / 100));
              return (
                <div key={lotId} className="flex items-center justify-between border border-border p-3">
                  <div>
                    <p className="text-sm font-semibold">
                      {lotId} — {String(item["Auction"])}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {isRelisted
                        ? `Relisted at $${newPrice.toLocaleString("en-US")} (-${RELIST_DISCOUNT_PERCENT}%)`
                        : `Original start price ${String(item["Start Price"])} · 0 bids`}
                    </p>
                  </div>
                  <GoldButton
                    className="h-8 px-4"
                    type="button"
                    disabled={isRelisted}
                    onClick={() => relist(lotId)}
                  >
                    {isRelisted ? "Relisted" : `Relist at -${RELIST_DISCOUNT_PERCENT}%`}
                  </GoldButton>
                </div>
              );
            })}
          </div>
        </Panel>

        <Panel title="Relisting flow">
          <Timeline
            steps={[
              { label: "Auction ends", detail: "AUC-2026-07-C closed 28 Jul", done: true },
              { label: "Unsold", detail: "1 lot, 6 stones", done: true },
              { label: "Review", detail: "Operations assessment", done: true },
              { label: "Revaluation", detail: "Price reduced 10% for relisting", done: relisted.size > 0 },
              { label: "Relist", detail: "Assigned to the next auction cycle", done: relisted.size > 0 },
            ]}
          />
        </Panel>
      </div>
    </>
  );
}
