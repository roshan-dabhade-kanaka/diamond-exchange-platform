import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PublicShell } from "@/components/adex/public-shell";
import { CertificateCards, StoneGallery, StoneThumb } from "@/components/adex/stone-gallery";
import { StatusBadge } from "@/components/adex/kit";
import { BidForm } from "@/components/adex/bid-form";
import { listings } from "@/lib/adex-data";
import { formatCountdown } from "@/lib/rules";
import { useSession } from "@/lib/session";

export const Route = createFileRoute("/listing/$listingId")({
  head: () => ({
    meta: [
      { title: "Lot detail — provenance and live bidding | ADEX" },
      {
        name: "description",
        content:
          "Complete lot detail: stone identity, 3D scan data, Kimberley Process certification, independent valuation and live auction bidding on the ADEX exchange.",
      },
      { property: "og:title", content: "Lot detail — provenance and live bidding | ADEX" },
      {
        property: "og:description",
        content: "Stone identity, certification, valuation and live bidding detail on ADEX.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ListingDetail,
});

const overview = (item: (typeof listings)[number]) => [
  ["ADEX reference", item.id],
  ["Barcode", "8842-1194"],
  ["Weight", item.carat],
  ["Classification", "Gem quality, octahedron"],
  ["Dimensions", "14.2 × 12.8 × 11.4 mm"],
  ["Origin", item.origin],
  ["Colour / clarity", "Cape series · VS estimated"],
  ["Settlement", "Antwerp, EUR or USD"],
];

const provenance = [
  ["Registered at source", "02 Aug 2026 · Kasai Mining SARL"],
  ["Received and scanned", "05 Aug 2026 · Kinshasa Hub"],
  ["Independent valuation", "12 Aug 2026 · $184,500"],
  ["Presented for sale", "15 Aug 2026 · Auction AUC-2026-08-A"],
  ["Auction closes", "21 Aug 2026 · 16:00 CET"],
];

function ListingDetail() {
  const { listingId } = Route.useParams();
  const item = listings.find((l) => l.id === listingId) ?? listings[0]!;
  const alsoSee = listings.filter((l) => l.id !== item.id).slice(0, 3);
  const { isCleared } = useSession();
  const [watching, setWatching] = useState(false);
  const [placedBid, setPlacedBid] = useState<number | null>(null);

  return (
    <PublicShell bleed>
      <div className="mx-auto max-w-[1240px] px-6 pt-10">
        <nav className="adex-nav text-muted-foreground">
          <Link to="/" hash="collection" className="hover:text-foreground">
            The Collection
          </Link>
          <span className="px-3">/</span>
          <span className="text-foreground">{item.id}</span>
        </nav>
      </div>

      <div className="mx-auto grid max-w-[1240px] gap-14 px-6 pt-10 pb-24 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)]">
        <div className="space-y-16">
          <StoneGallery stoneId={item.id} />

          <section>
            <h2 className="adex-eyebrow border-b border-border pb-4">The stone</h2>
            <dl className="mt-6 grid gap-x-10 sm:grid-cols-2">
              {overview(item).map(([k, v]) => (
                <div key={k} className="flex justify-between gap-6 border-b border-border py-4">
                  <dt className="text-sm text-muted-foreground">{k}</dt>
                  <dd className="text-right text-sm">{v}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section>
            <h2 className="adex-eyebrow border-b border-border pb-4">Certification</h2>
            <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              Every lot on ADEX travels with a complete certification file. Documents are verified
              at the Kinshasa hub before the stone is presented to European buyers.
            </p>
            <div className="mt-6 flex items-center gap-3 border border-border p-4">
              <StatusBadge value={item.isKimberleyApproved ? "Approved" : "Pending"} />
              <p className="text-sm">
                Kimberley Process certificate{" "}
                {item.isKimberleyApproved
                  ? "verified — clears this stone for export."
                  : "not yet issued — required before export documentation can be generated."}
              </p>
            </div>
            <div className="mt-8">
              <CertificateCards />
            </div>
          </section>

          <section>
            <h2 className="adex-eyebrow border-b border-border pb-4">Provenance</h2>
            <ol className="mt-6 border-l border-border pl-8">
              {provenance.map(([label, detail], i) => (
                <li key={label} className="relative pb-8 last:pb-0">
                  <span className="absolute top-1.5 -left-[2.13rem] h-2 w-2 rotate-45 border border-gold bg-gold" />
                  <p className="font-display text-lg">{label}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{detail}</p>
                  {i === provenance.length - 1 ? null : null}
                </li>
              ))}
            </ol>
          </section>
        </div>

        {/* Bidding rail */}
        <aside className="lg:sticky lg:top-8 lg:self-start">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="adex-eyebrow">{item.category}</p>
              <h1 className="font-display mt-4 text-4xl leading-tight">{item.title}</h1>
            </div>
            <button
              type="button"
              onClick={() => setWatching((w) => !w)}
              className="adex-nav shrink-0 border border-input px-4 py-2 transition-colors hover:bg-muted"
            >
              {watching ? "Watching ★" : "Watch ☆"}
            </button>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            {item.id} · {item.carat} · {item.origin}
          </p>

          <div className="mt-8 border border-border">
            <div className="border-b border-border p-6">
              <p className="adex-eyebrow">Current bid</p>
              <p className="font-display mt-2 text-4xl">{item.currentBid}</p>
              <p className="mt-2 text-xs text-muted-foreground">
                Estimate {item.estimate} · closes in {formatCountdown(item.biddingWindowEnd)}
              </p>
              <span className="adex-shine mt-5 block h-px w-full" />
            </div>
            <div className="p-6">
              {placedBid !== null ? (
                <p className="text-sm font-semibold">
                  Bid of {placedBid.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })} submitted.
                </p>
              ) : (
                <BidForm
                  estimate={item.estimate}
                  currentBid={item.currentBid}
                  onSubmit={(amount) => setPlacedBid(amount)}
                />
              )}
              {!isCleared ? (
                <Link
                  to="/sign-in"
                  className="adex-nav mt-3 block w-full border border-input py-4 text-center transition-colors hover:bg-muted"
                >
                  Sign in to bid
                </Link>
              ) : null}
            </div>
          </div>

          <div className="mt-10">
            <h2 className="adex-eyebrow border-b border-border pb-4">Bid history</h2>
            <ul className="mt-4">
              {[
                ["Bidder 4471", "$184,500", "18 Aug 11:04"],
                ["Bidder 2210", "$178,000", "18 Aug 09:32"],
                ["Bidder 4471", "$170,000", "17 Aug 18:12"],
              ].map(([who, amt, when]) => (
                <li
                  key={when}
                  className="flex items-baseline justify-between border-b border-border py-3 text-sm"
                >
                  <span className="text-muted-foreground">{who}</span>
                  <span>{amt}</span>
                  <span className="text-xs text-muted-foreground">{when}</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>

      {/* Also of interest */}
      <section className="border-t border-border bg-panel">
        <div className="mx-auto max-w-[1240px] px-6 py-20">
          <h2 className="font-display text-3xl">Also of interest</h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-3">
            {alsoSee.map((l) => (
              <Link
                key={l.id}
                to="/listing/$listingId"
                params={{ listingId: l.id }}
                className="group block"
              >
                <div className="adex-tile aspect-[4/4.4]">
                  <StoneThumb stoneId={l.id} className="h-full w-full" />
                </div>
                <p className="adex-eyebrow mt-5">{l.id}</p>
                <h3 className="font-display mt-2 text-xl">{l.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {l.carat} · {l.currentBid}
                </p>
                <span className="mt-4 block h-px w-8 bg-gold transition-all duration-500 group-hover:w-24" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </PublicShell>
  );
}
