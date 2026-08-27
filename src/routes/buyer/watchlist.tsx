import { createFileRoute, Link } from "@tanstack/react-router";
import { pageHead } from "@/lib/page-head";
import { GhostButton, PageHeader, StatusBadge } from "@/components/adex/kit";
import { listings } from "@/lib/adex-data";
import { StoneThumb } from "@/components/adex/stone-gallery";

export const Route = createFileRoute("/buyer/watchlist")({
  head: pageHead(
    "Watchlist | ADEX Buyer Portal",
    "Saved stones and lots with live bid updates and auction close reminders.",
  ),
  component: Watchlist,
});

function Watchlist() {
  return (
    <>
      <PageHeader
        title="Watchlist"
        description="Items you are tracking ahead of auction close."
        actions={<GhostButton>Clear watchlist</GhostButton>}
      />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {listings.slice(0, 4).map((l) => (
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
                {l.carat} · ends in {l.endsIn}
              </p>
              <p className="mt-2 text-sm font-semibold">{l.currentBid}</p>
              <div className="mt-3 flex gap-2">
                <GhostButton className="h-8 px-3">Remove</GhostButton>
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
    </>
  );
}
