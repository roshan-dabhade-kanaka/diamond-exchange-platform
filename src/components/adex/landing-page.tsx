import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { PublicShell } from "@/components/adex/public-shell";
import { listings, type Listing } from "@/lib/adex-data";
import { StoneThumb } from "@/components/adex/stone-gallery";
import { LandingHero } from "@/components/adex/landing-heroes";
import { StoneQuickView } from "@/components/adex/stone-quick-view";
import { ArrowRight, Gem, Handshake, Route, Scale, ShieldCheck, TimerReset } from "lucide-react";

const platformPrinciples = [
  {
    title: "Full provenance",
    detail: "Mine-to-finger records connect every stone to its country of origin and journey to market.",
    icon: Route,
  },
  {
    title: "Equal partnership",
    detail: "A value-adding model built around direct cooperation with African producing countries.",
    icon: Handshake,
  },
  {
    title: "Fair market access",
    detail: "Transparent sales are designed to create equitable access and better returns across the value chain.",
    icon: Scale,
  },
  {
    title: "Faster to market",
    detail: "A streamlined route from producer to buyer reduces friction, delay and unnecessary cost.",
    icon: TimerReset,
  },
];

function MaisonPlatformStory() {
  return (
    <section className="bg-maison-ivory text-maison-emerald">
      <div className="mx-auto grid max-w-[1240px] lg:grid-cols-[1.05fr_0.95fr]">
        <div className="px-6 py-24 sm:px-12 lg:border-r lg:border-maison-emerald/20 lg:px-16 lg:py-28">
          <p className="adex-eyebrow text-gold">The ADEX mission</p>
          <h2 className="font-display mt-6 text-5xl leading-[1.02] text-maison-emerald sm:text-6xl">
            A more equal diamond trade,
            <br />
            <em className="font-normal">from the first hand.</em>
          </h2>
          <p className="mt-8 max-w-xl text-base leading-8 text-maison-emerald/70">
            ADEX removes barriers between African producers and international buyers. Its model is
            built to preserve provenance, widen access and return more value to the people and
            countries at the source.
          </p>
          <div className="mt-12 flex items-center gap-5 border-y border-gold/45 py-6">
            <Gem aria-hidden="true" className="h-10 w-10 stroke-1 text-gold" />
            <div>
              <p className="adex-eyebrow text-gold">The promise</p>
              <p className="font-display mt-1 text-2xl text-maison-emerald">Mine to finger, matters of record.</p>
            </div>
          </div>
        </div>

        <div className="bg-maison-emerald px-6 py-20 text-maison-ivory sm:px-12 lg:px-14 lg:py-24">
          <p className="adex-eyebrow text-gold">How the platform operates</p>
          <ol className="mt-9">
            {platformPrinciples.map((principle, index) => (
              <li key={principle.title} className="grid grid-cols-[auto_1fr] gap-5 border-t border-gold/25 py-7 first:border-t-0 first:pt-0">
                <span className="font-display text-3xl text-gold">{index + 1}</span>
                <div>
                  <h3 className="font-display text-2xl text-maison-ivory">{principle.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-maison-ivory/60">{principle.detail}</p>
                </div>
              </li>
            ))}
          </ol>
          <Link to="/collection" className="adex-nav mt-5 inline-flex items-center gap-3 border-b border-gold pb-2 text-maison-ivory">
            Enter the private collection <ArrowRight aria-hidden="true" className="h-4 w-4 text-gold" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export function LandingPage() {
  const [quick, setQuick] = useState<Listing | null>(null);
  const feature = listings[0]!;
  const preview = listings.slice(0, 3);

  return (
    <PublicShell bleed>
      <LandingHero feature={feature} onQuickView={setQuick} />


      <MaisonPlatformStory />

      {/* A glimpse of the collection — the full index lives on its own page */}
      <section className="bg-maison-ivory text-maison-emerald">
        <div className="mx-auto max-w-[1240px] px-6 py-20">
          <header className="flex flex-wrap items-end justify-between gap-4 border-b border-border pb-5">
            <div>
              <p className="adex-eyebrow text-gold">Selected by the house</p>
              <h2 className="font-display mt-2 text-3xl text-maison-emerald">
                Three stones of distinction
              </h2>
            </div>
            <Link to="/collection" className="adex-nav border-b border-gold pb-1 text-maison-emerald">
              View the full collection
            </Link>
          </header>

          <div className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {preview.map((l) => (
              <article key={l.id} className="group">
                <div className="adex-tile aspect-[4/4.4]">
                  <StoneThumb stoneId={l.id} className="h-full w-full" />
                  <button
                    onClick={() => setQuick(l)}
                    className="adex-nav absolute inset-x-0 bottom-0 translate-y-full bg-foreground/90 py-3.5 text-center text-background transition-transform duration-500 group-hover:translate-y-0"
                  >
                    Quick view
                  </button>
                </div>
                <div>
                  <p className="adex-eyebrow mt-5">{l.id}</p>
                  <h3 className="font-display mt-2 text-xl">
                    <Link to="/listing/$listingId" params={{ listingId: l.id }} className="adex-link">
                      {l.title}
                    </Link>
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {l.carat} · {l.origin}
                  </p>
                  <div className="mt-4 grid grid-cols-3 border-y border-gold/30 py-3 text-center">
                    <span className="text-[10px] uppercase tracking-[0.14em]">{l.status}</span>
                    <span className="border-x border-gold/30 text-[10px] uppercase tracking-[0.14em]">{l.carat}</span>
                    <span className="truncate px-1 text-[10px] uppercase tracking-[0.14em]">{l.endsIn}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* The house */}
      <section className="bg-maison-emerald text-maison-ivory">
        <div className="mx-auto grid max-w-[1240px] gap-14 px-6 py-24 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="max-w-md">
            <p className="adex-eyebrow">The house</p>
            <h2 className="font-display mt-5 text-5xl leading-[1.04]">
              From African origin to a private international salon.
            </h2>
            <span className="mt-8 block h-px w-24 bg-gold" />
          </div>
          <div className="grid gap-px border border-gold/30 bg-gold/30 sm:grid-cols-2">
            {[
              { k: "Provenance", v: "A documented journey from mine to finger" },
              { k: "Partnership", v: "Direct cooperation with producing countries" },
              { k: "Fair trade", v: "Better value for every level of the industry" },
              { k: "Secure access", v: "A trusted international route to market" },
            ].map((s) => (
              <div key={s.k} className="bg-maison-emerald p-7">
                <span className="block h-px w-8 bg-gold" />
                <p className="font-display mt-4 text-xl">{s.k}</p>
                <p className="mt-2 text-sm text-maison-ivory/60">{s.v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {quick ? <StoneQuickView stone={quick} onClose={() => setQuick(null)} /> : null}
    </PublicShell>
  );
}
