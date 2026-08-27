import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { pageHead } from "@/lib/page-head";
import { EmptyState, GhostButton, PageHeader, StatusBadge } from "@/components/adex/kit";
import { listings } from "@/lib/adex-data";
import { formatCountdown } from "@/lib/rules";
import { StoneThumb } from "@/components/adex/stone-gallery";

export const Route = createFileRoute("/buyer/watchlist")({
  head: pageHead(
    "Watchlist | ADEX Buyer Portal",
    "Saved stones and lots with live bid updates and auction close reminders.",
  ),
  component: Watchlist,
});

const bidStatusLabel: Record<string, string> = {
  WINNING: "Winning",
  OUTBID: "Outbid",
  LOCKED_UNPAID: "Payment overdue",
  WINNER_WAITLISTED: "Awaiting settlement",
  NONE: "Not bidding",
};

function Watchlist() {
  const [watchedIds, setWatchedIds] = useState(() => listings.slice(0, 4).map((l) => l.id));
  const watched = listings.filter((l) => watchedIds.includes(l.id));

  return (
    <>
      <PageHeader
        title="Watchlist"
        description="Items you are tracking ahead of auction close."
        actions={
          <GhostButton
            type="button"
            onClick={() => setWatchedIds([])}
            disabled={watched.length === 0}
          >
            Clear watchlist
          </GhostButton>
        }
      />
      {watched.length === 0 ? (
        <EmptyState message="Nothing on your watchlist yet — browse the marketplace and save a lot." />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {watched.map((l) => (
            <article key={l.id} className="adex-panel overflow-hidden">
              <StoneThumb stoneId={l.id} className="aspect-[4/3] w-full" />
              <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <Link
                    to="/listing/$listingId"
                    params={{ listingId: l.id }}
                    className="adex-link text-sm"
                  >
                    {l.id}
                  </Link>
                  <StatusBadge value={l.status} />
                </div>
                <p className="font-display mt-2 text-base">{l.title}</p>
                <p className="text-xs text-muted-foreground">
                  {l.carat} · ends in {formatCountdown(l.biddingWindowEnd)}
                </p>
                <p className="mt-2 text-sm font-semibold">{l.currentBid}</p>
                {l.myBidStatus !== "NONE" ? (
                  <p className="mt-1 text-xs text-muted-foreground">
                    Your status:{" "}
                    <span className="font-semibold">{bidStatusLabel[l.myBidStatus]}</span>
                  </p>
                ) : null}
                <div className="mt-3 flex gap-2">
                  <GhostButton
                    type="button"
                    className="h-8 px-3"
                    onClick={() => setWatchedIds((ids) => ids.filter((id) => id !== l.id))}
                  >
                    Remove
                  </GhostButton>
                  <Link
                    to="/buyer/bids"
                    className="h-8 rounded-sm bg-gold px-3 text-sm leading-8 font-semibold text-gold-foreground hover:opacity-90"
                  >
                    Bid
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </>
  );
}
