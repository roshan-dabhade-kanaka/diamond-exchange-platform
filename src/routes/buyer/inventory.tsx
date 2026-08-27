import { createFileRoute, Link } from "@tanstack/react-router";
import { pageHead } from "@/lib/page-head";
import { FilterBar, PageHeader, StatusBadge } from "@/components/adex/kit";
import { listings } from "@/lib/adex-data";
import { StoneThumb } from "@/components/adex/stone-gallery";

export const Route = createFileRoute("/buyer/inventory")({
  head: pageHead(
    "Browse Inventory | ADEX Buyer Portal",
    "Search available stones, parcels and baskets by carat, price, certification, scan availability and auction status.",
  ),
  component: BuyerInventory,
});

function BuyerInventory() {
  return (
    <>
      <PageHeader
        title="Browse Inventory"
        description="Available stones and lots across live and upcoming auctions."
      />
      <FilterBar fields={["Carat range", "Price range", "Certification", "Scan", "Availability"]} />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {listings.map((l) => (
          <Link
            key={l.id}
            to="/listing/$listingId"
            params={{ listingId: l.id }}
            className="adex-panel block overflow-hidden hover:border-gold"
          >
            <StoneThumb stoneId={l.id} className="aspect-[4/3] w-full" />
            <div className="p-4">
              <div className="flex items-start justify-between gap-2">
                <span className="adex-link text-sm">{l.id}</span>
                <StatusBadge value={l.status} />
              </div>
              <p className="font-display mt-2 text-base">{l.title}</p>
              <p className="text-xs text-muted-foreground">
                {l.category} · {l.carat} · {l.origin}
              </p>
              <dl className="mt-3 grid grid-cols-2 gap-2 text-xs">
                <div>
                  <dt className="text-muted-foreground">Current bid</dt>
                  <dd className="text-sm font-semibold">{l.currentBid}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Ends in</dt>
                  <dd className="text-sm font-semibold">{l.endsIn}</dd>
                </div>
              </dl>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
