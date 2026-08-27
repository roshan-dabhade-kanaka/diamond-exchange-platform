import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { pageHead } from "@/lib/page-head";
import { EmptyState, GhostButton, PageHeader, StatusBadge, Tabs } from "@/components/adex/kit";
import { categories, listings } from "@/lib/adex-data";
import { formatCountdown, parseUsdRange } from "@/lib/rules";
import { StoneThumb } from "@/components/adex/stone-gallery";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/buyer/inventory")({
  head: pageHead(
    "Browse Inventory | ADEX Buyer Portal",
    "Search available stones, parcels and baskets by carat, price, certification, scan availability and auction status.",
  ),
  component: BuyerInventory,
});

const priceCeilings = [
  { label: "Any price", value: Infinity },
  { label: "Under $50,000", value: 50_000 },
  { label: "Under $100,000", value: 100_000 },
  { label: "Under $250,000", value: 250_000 },
];

function BuyerInventory() {
  const [category, setCategory] = useState<string>("all");
  const [maxPrice, setMaxPrice] = useState<number>(Infinity);
  const [minCarat, setMinCarat] = useState<string>("");
  const [kimberleyOnly, setKimberleyOnly] = useState(false);

  const filtered = useMemo(() => {
    return listings.filter((l) => {
      if (category !== "all" && l.category !== category) return false;
      if (kimberleyOnly && !l.isKimberleyApproved) return false;
      const [current] = parseUsdRange(l.currentBid);
      if (current > maxPrice) return false;
      if (minCarat) {
        const carat = parseFloat(l.carat);
        if (Number.isFinite(carat) && carat < Number(minCarat)) return false;
      }
      return true;
    });
  }, [category, maxPrice, minCarat, kimberleyOnly]);

  const activeFilters = [
    category !== "all" ? { key: "category", label: category, clear: () => setCategory("all") } : null,
    maxPrice !== Infinity
      ? {
          key: "price",
          label: priceCeilings.find((p) => p.value === maxPrice)?.label ?? "",
          clear: () => setMaxPrice(Infinity),
        }
      : null,
    minCarat ? { key: "carat", label: `${minCarat}ct+`, clear: () => setMinCarat("") } : null,
    kimberleyOnly
      ? { key: "kimberley", label: "Kimberley certified only", clear: () => setKimberleyOnly(false) }
      : null,
  ].filter((f): f is NonNullable<typeof f> => f !== null);

  return (
    <>
      <PageHeader
        title="Browse Inventory"
        description="Available stones and lots across live and upcoming auctions."
      />

      <Tabs
        tabs={[
          { id: "all", label: "All" },
          ...categories.map((c) => ({ id: c.name, label: c.name, badge: String(c.count) })),
        ]}
        active={category}
        onChange={setCategory}
      />

      <div className="adex-panel mb-4 flex flex-wrap items-end gap-3 p-4">
        <label className="flex flex-col gap-1 text-xs font-semibold text-muted-foreground">
          Min. carat
          <input
            value={minCarat}
            onChange={(e) => setMinCarat(e.target.value)}
            placeholder="Any"
            className="h-9 w-28 rounded-sm border border-input bg-background px-2 text-sm font-normal text-foreground focus:border-ring focus:outline-none"
          />
        </label>
        <label className="flex flex-col gap-1 text-xs font-semibold text-muted-foreground">
          Price ceiling
          <select
            value={String(maxPrice)}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="h-9 w-44 rounded-sm border border-input bg-background px-2 text-sm font-normal text-foreground focus:border-ring focus:outline-none"
          >
            {priceCeilings.map((p) => (
              <option key={p.label} value={String(p.value)}>
                {p.label}
              </option>
            ))}
          </select>
        </label>
        <label className="flex items-center gap-2 pb-2 text-xs font-semibold text-muted-foreground">
          <input
            type="checkbox"
            checked={kimberleyOnly}
            onChange={(e) => setKimberleyOnly(e.target.checked)}
            className="accent-[var(--gold)]"
          />
          Kimberley certified only
        </label>
      </div>

      {activeFilters.length > 0 ? (
        <div className="mb-4 flex flex-wrap items-center gap-2">
          {activeFilters.map((f) => (
            <button
              key={f.key}
              type="button"
              onClick={f.clear}
              className="flex items-center gap-1.5 rounded-full border border-input px-3 py-1 text-xs font-semibold hover:bg-muted"
            >
              {f.label} <span aria-hidden="true">✕</span>
            </button>
          ))}
          <GhostButton
            type="button"
            className="h-7 px-3 text-[10px]"
            onClick={() => {
              setCategory("all");
              setMaxPrice(Infinity);
              setMinCarat("");
              setKimberleyOnly(false);
            }}
          >
            Clear all
          </GhostButton>
        </div>
      ) : null}

      {filtered.length === 0 ? (
        <EmptyState
          message="No stones match these filters."
          action={
            <GhostButton
              type="button"
              onClick={() => {
                setCategory("all");
                setMaxPrice(Infinity);
                setMinCarat("");
                setKimberleyOnly(false);
              }}
            >
              Clear all filters
            </GhostButton>
          }
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((l) => (
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
                    <dd className="text-sm font-semibold">{formatCountdown(l.biddingWindowEnd)}</dd>
                  </div>
                </dl>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
