import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { PublicShell } from "@/components/adex/public-shell";
import { categories, listings, type Listing } from "@/lib/adex-data";
import { StoneThumb } from "@/components/adex/stone-gallery";
import { StoneQuickView } from "@/components/adex/stone-quick-view";

type SectionProps = {
  rows: Listing[];
  category: string | null;
  setCategory: (c: string | null) => void;
  onQuickView: (l: Listing) => void;
};

function FilterButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`adex-nav border-b pb-1 transition-colors ${
        active ? "border-gold" : "border-transparent hover:border-foreground"
      }`}
    >
      {children}
    </button>
  );
}

/* ═══ Maison Vert — private salon: vertical index + alternating plates ═══ */
function CollectionEmerald({ rows, category, setCategory, onQuickView }: SectionProps) {
  return (
    <section
      id="collection"
      className="mx-auto grid max-w-[1400px] scroll-mt-20 gap-16 px-6 py-16 lg:grid-cols-[220px_1fr]"
    >
      <aside className="h-fit lg:sticky lg:top-16">
        <p className="adex-eyebrow">The salon</p>
        <h1 className="font-display mt-2 text-3xl">{category ?? "All lots"}</h1>
        <ul className="mt-8 space-y-4 border-l border-border pl-5">
          <li>
            <FilterButton active={category === null} onClick={() => setCategory(null)}>
              All lots
            </FilterButton>
          </li>
          {categories.map((c) => (
            <li key={c.id}>
              <FilterButton active={category === c.name} onClick={() => setCategory(c.name)}>
                {c.name}
                <span className="ml-2 text-muted-foreground">{c.count}</span>
              </FilterButton>
            </li>
          ))}
        </ul>
        <p className="mt-10 text-xs leading-relaxed text-muted-foreground">
          {rows.length} lots presented, one at a time, as they would be laid out on the salon table.
        </p>
      </aside>

      <div className="space-y-24">
        {rows.map((l, i) => (
          <article
            key={l.id}
            className={`grid items-center gap-10 lg:grid-cols-2 ${
              i % 2 === 1 ? "lg:[&>figure]:order-2" : ""
            }`}
          >
            <figure className="adex-tile adex-gilt aspect-[5/4] overflow-hidden">
              <StoneThumb stoneId={l.id} className="h-full w-full" />
            </figure>
            <div>
              <div className="flex items-baseline gap-5">
                <span className="font-display text-4xl text-gold">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="adex-eyebrow">
                  {l.id} · {l.status}
                </p>
              </div>
              <h2 className="font-display mt-6 text-4xl leading-tight">
                <Link to="/listing/$listingId" params={{ listingId: l.id }} className="adex-link">
                  {l.title}
                </Link>
              </h2>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
                {l.carat} · {l.origin} · offered under supervised auction with full provenance and
                independent valuation.
              </p>
              <dl className="mt-8 flex gap-12 border-t border-border pt-6">
                <div>
                  <dt className="adex-eyebrow">Current</dt>
                  <dd className="font-display mt-2 text-xl">{l.currentBid}</dd>
                </div>
                <div>
                  <dt className="adex-eyebrow">Estimate</dt>
                  <dd className="font-display mt-2 text-xl">{l.estimate}</dd>
                </div>
              </dl>
              <button
                onClick={() => onQuickView(l)}
                className="adex-nav mt-8 border-b border-gold pb-1"
              >
                Quick view
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function CollectionPage() {
  const [category, setCategory] = useState<string | null>(null);
  const [quick, setQuick] = useState<Listing | null>(null);

  const rows = category ? listings.filter((l) => l.category === category) : listings;
  const sectionProps: SectionProps = { rows, category, setCategory, onQuickView: setQuick };

  return (
    <PublicShell bleed>
      <CollectionEmerald {...sectionProps} />
      {quick ? <StoneQuickView stone={quick} onClose={() => setQuick(null)} /> : null}
    </PublicShell>
  );
}
