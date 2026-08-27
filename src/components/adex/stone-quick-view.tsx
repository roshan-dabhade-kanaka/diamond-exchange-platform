import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { stoneShots } from "./stone-gallery";
import type { Listing } from "@/lib/adex-data";
import { formatCountdown } from "@/lib/rules";

/** Deterministic-but-varied detail so each stone reads individually in quick view. */
function stoneFacts(stone: Listing) {
  let sum = 0;
  for (const ch of stone.id) sum += ch.charCodeAt(0);
  const clarity = ["VS estimated", "VVS estimated", "SI estimated", "Loupe clean"][sum % 4]!;
  const shape = ["Octahedron", "Macle", "Dodecahedron", "Irregular"][(sum + 1) % 4]!;
  const colour = ["Cape series", "Near colourless", "Fancy light brown", "Colourless"][sum % 4]!;
  return { clarity, shape, colour };
}

export function StoneQuickView({ stone, onClose }: { stone: Listing; onClose: () => void }) {
  const [active, setActive] = useState(0);
  const shot = stoneShots[active]!;
  const facts = stoneFacts(stone);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Quick view — ${stone.title}`}
      className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-8"
    >
      <button
        aria-label="Close quick view"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-foreground/70 backdrop-blur-sm"
      />

      <div
        style={{ height: "88vh", maxHeight: "860px" }}
        className="adex-reveal relative z-10 grid w-full max-w-[1080px] grid-cols-1 overflow-y-auto border lg:overflow-hidden border-border bg-background shadow-2xl lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]"
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="adex-nav absolute top-4 right-4 z-20 border border-border bg-background/90 px-3 py-1.5 hover:bg-accent"
        >
          Close
        </button>

        {/* Gallery */}
        <div className="flex h-full flex-col bg-panel">
          <div className="relative min-h-[340px] flex-1">
            <img
              src={shot.src}
              alt={`${stone.id} — ${shot.label}`}
              width={1024}
              height={768}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <span className="adex-nav absolute top-4 left-4 bg-gold px-3 py-1.5 text-gold-foreground">
              {shot.is3d ? "3D scan" : "High-res photo"}
            </span>
            <span className="adex-nav absolute bottom-4 left-4 bg-foreground/80 px-3 py-1.5 text-background">
              {shot.label}
            </span>
          </div>
          <div className="flex gap-3 p-4">
            {stoneShots.map((s, i) => (
              <button
                key={s.label}
                onClick={() => setActive(i)}
                aria-label={s.label}
                className={`h-16 w-20 shrink-0 overflow-hidden border transition-colors ${
                  i === active ? "border-gold" : "border-border hover:border-input"
                }`}
              >
                <img
                  src={s.src}
                  alt={s.label}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Detail */}
        <div className="flex flex-col p-8 lg:overflow-y-auto lg:p-10">
          <p className="adex-eyebrow">
            {stone.category} · {stone.id}
          </p>
          <h2 className="font-display mt-3 text-3xl leading-tight">{stone.title}</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {stone.carat} · {stone.origin}
          </p>

          <dl className="mt-7 grid grid-cols-2 gap-px border border-border bg-border">
            {[
              ["Current bid", stone.currentBid],
              ["Estimate", stone.estimate],
              ["Closes in", formatCountdown(stone.biddingWindowEnd)],
              ["Status", stone.status],
            ].map(([k, v]) => (
              <div key={k} className="bg-background p-4">
                <dt className="adex-eyebrow">{k}</dt>
                <dd className="font-display mt-1.5 text-lg">{v}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-7">
            <p className="adex-eyebrow">Key characteristics</p>
            <dl className="mt-3 space-y-2 text-sm">
              {[
                ["Shape", facts.shape],
                ["Colour", facts.colour],
                ["Clarity", facts.clarity],
                ["Settlement", "Antwerp · EUR or USD"],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4 border-b border-border pb-2">
                  <dt className="text-muted-foreground">{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="mt-7">
            <p className="adex-eyebrow">Provenance highlights</p>
            <ol className="mt-3 space-y-3 text-sm">
              {[
                ["Registered at source", `${stone.origin} · barcoded and scanned`],
                ["Kimberley Process", "KP-4471902 — verified in Kinshasa"],
                ["Independent valuation", `Reference range ${stone.estimate}`],
                ["Listed for auction", "European buyers, supervised sale"],
              ].map(([k, v]) => (
                <li key={k} className="flex gap-3">
                  <span className="mt-2 h-px w-5 shrink-0 bg-gold" />
                  <span>
                    <span className="block">{k}</span>
                    <span className="text-xs text-muted-foreground">{v}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              to="/listing/$listingId"
              params={{ listingId: stone.id }}
              className="adex-nav bg-foreground px-8 py-3.5 text-background transition-opacity hover:opacity-85"
            >
              View full stone detail
            </Link>
            <button
              onClick={onClose}
              className="adex-nav border border-foreground px-8 py-3.5 transition-colors hover:bg-accent"
            >
              Keep browsing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
