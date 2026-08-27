import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/page-head";
import {
  DefinitionList,
  EmptyState,
  GhostButton,
  PageHeader,
  Panel,
  StatusBadge,
} from "@/components/adex/kit";
import { CertificateCards, StoneGallery, StoneThumb } from "@/components/adex/stone-gallery";
import { BidForm } from "@/components/adex/bid-form";
import { listings } from "@/lib/adex-data";
import { formatCountdown } from "@/lib/rules";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/buyer/marketplace")({
  head: pageHead(
    "Marketplace | ADEX Buyer Portal",
    "Browse live lots and inspect stone photos, 3D scan, certification and bidding side by side — no back-and-forth between pages.",
  ),
  component: BuyerMarketplace,
});

function BuyerMarketplace() {
  const [selectedId, setSelectedId] = useState(listings[0]!.id);
  const [kimberleyOnly, setKimberleyOnly] = useState(false);
  const [placedBid, setPlacedBid] = useState<number | null>(null);

  const visible = useMemo(
    () => listings.filter((l) => !kimberleyOnly || l.isKimberleyApproved),
    [kimberleyOnly],
  );
  const item = visible.find((l) => l.id === selectedId) ?? visible[0] ?? listings[0]!;

  return (
    <>
      <PageHeader
        title="Marketplace"
        description="Pick a lot on the left and inspect it on the right — the list stays put while you compare."
      />
      <div className="adex-panel mb-4 flex items-center gap-3 p-4">
        <label className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
          <input
            type="checkbox"
            checked={kimberleyOnly}
            onChange={(e) => setKimberleyOnly(e.target.checked)}
            className="accent-[var(--gold)]"
          />
          Kimberley certified only
        </label>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,340px)_minmax(0,1fr)]">
        <div className="min-w-0 space-y-3 xl:max-h-[calc(100vh-6rem)] xl:overflow-y-auto xl:pr-1">
          {visible.length === 0 ? <EmptyState message="No lots match this filter." /> : null}
          {visible.map((l) => {
            const active = l.id === item.id;
            return (
              <button
                key={l.id}
                type="button"
                onClick={() => setSelectedId(l.id)}
                className={cn(
                  "adex-panel flex w-full gap-3 p-3 text-left hover:border-gold",
                  active && "border-gold bg-muted/50",
                )}
              >
                <StoneThumb stoneId={l.id} className="h-20 w-24 shrink-0 rounded-sm" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <span className="adex-link text-xs">{l.id}</span>
                    <StatusBadge value={l.status} />
                  </div>
                  <p className="truncate text-sm font-semibold">{l.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {l.carat} · ends in {formatCountdown(l.biddingWindowEnd)}
                  </p>
                  <p className="text-sm font-semibold">{l.currentBid}</p>
                </div>
              </button>
            );
          })}
        </div>

        <div className="min-w-0 space-y-6">
          <div className="flex flex-wrap items-end justify-between gap-3 border-b-2 border-border pb-3">
            <div>
              <h2 className="font-display text-xl">{item.title}</h2>
              <p className="text-sm text-muted-foreground">
                {item.id} · {item.category} · {item.origin}
              </p>
            </div>
            <StatusBadge value={item.status} />
          </div>

          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
            <div className="min-w-0 space-y-6">
              <StoneGallery stoneId={item.id} />
              <Panel title="Stone overview">
                <DefinitionList
                  items={[
                    { label: "ADEX Stone ID", value: item.id },
                    { label: "Carat", value: item.carat },
                    { label: "Origin", value: item.origin },
                    { label: "Classification", value: "Gem quality, octahedron" },
                    { label: "3D scan", value: "Available — 4 captures" },
                    { label: "Estimate", value: item.estimate },
                  ]}
                />
              </Panel>
              <Panel title="Certification">
                <CertificateCards />
              </Panel>
            </div>

            <div className="min-w-0 space-y-6">
              <Panel title="Bid now">
                <p className="text-xs tracking-wide text-muted-foreground uppercase">Current bid</p>
                <p className="font-display text-3xl">{item.currentBid}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  closes in {formatCountdown(item.biddingWindowEnd)}
                </p>
                {placedBid !== null ? (
                  <p className="mt-4 text-sm font-semibold">
                    Bid submitted — you'll be notified if outbid.
                  </p>
                ) : (
                  <BidForm
                    className="mt-4"
                    estimate={item.estimate}
                    currentBid={item.currentBid}
                    onSubmit={(amount) => setPlacedBid(amount)}
                  />
                )}
                <GhostButton className="mt-2 w-full" type="button">
                  Add to watchlist
                </GhostButton>
                <p className="mt-3 text-xs text-muted-foreground">
                  Winning this lot creates the order, invoice and shipment automatically under My
                  Purchases.
                </p>
              </Panel>

              <Panel title="Bid history">
                <ul className="space-y-2 text-sm">
                  {[
                    ["Bidder 4471", "$184,500", "18 Aug 11:04"],
                    ["Bidder 2210", "$178,000", "18 Aug 09:32"],
                    ["Bidder 4471", "$170,000", "17 Aug 18:12"],
                  ].map(([who, amt, when]) => (
                    <li key={when} className="flex justify-between border-b border-border pb-2">
                      <span>{who}</span>
                      <span className="font-semibold">{amt}</span>
                      <span className="text-xs text-muted-foreground">{when}</span>
                    </li>
                  ))}
                </ul>
              </Panel>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
