import { Link } from "@tanstack/react-router";
import type { Listing } from "@/lib/adex-data";
import { Button } from "@/components/ui/button";
import { roughForms, roughImages } from "@/lib/rough-forms";

type HeroProps = {
  feature: Listing;
  onQuickView: (l: Listing) => void;
};

const hallmarks = [
  "Mine to market",
  "Kimberley certified",
  "Antwerp settlement",
  "Independently valued",
  "3D scanned",
  "Supervised auction",
];

/** Static hallmark band — the house credentials, stated plainly. */
function Hallmarks({ tone = "default" }: { tone?: "default" | "gold" }) {
  return (
    <div
      className={`border-y-2 ${
        tone === "gold" ? "border-gold bg-panel" : "border-foreground bg-panel"
      }`}
    >
      <ul className="mx-auto grid max-w-[1400px] grid-cols-2 gap-x-8 gap-y-5 px-6 py-8 sm:grid-cols-3 lg:grid-cols-6">
        {hallmarks.map((w) => (
          <li key={w} className="flex items-center gap-3">
            <span className="h-1.5 w-1.5 shrink-0 rotate-45 bg-gold" />
            <span
              className={`text-[0.8125rem] font-semibold tracking-[0.18em] uppercase ${
                tone === "gold" ? "text-gold" : "text-foreground"
              }`}
            >
              {w}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

const diamondShapes = roughForms;

/* ---------- Maison Vert — private atelier, split editorial salon ---------- */
function HeroEmerald({ feature, onQuickView }: HeroProps) {
  return (
    <>
      <section className="grid min-h-[760px] bg-maison-ivory text-maison-emerald lg:grid-cols-2">
        <div className="flex flex-col justify-center px-6 py-16 sm:px-14 lg:px-[8vw] lg:py-24">
          <p className="adex-eyebrow text-gold">Direct from origin · Switzerland</p>
          <h1 className="font-display mt-7 text-5xl leading-[0.94] text-maison-emerald sm:text-7xl xl:text-8xl">
            Rare earth,
            <br />
            <em className="font-normal">uncut and unbroken.</em>
          </h1>
          <p className="mt-8 max-w-lg text-base leading-7 text-maison-emerald/70">
            A private selection of exceptional stones, connecting African producers directly with
            discerning buyers through provenance, fair trade and transparent market access.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button asChild className="h-auto rounded-none bg-maison-emerald px-9 py-4 text-maison-ivory shadow-none hover:bg-maison-emerald/90">
              <Link to="/collection" className="adex-nav">View the collection</Link>
            </Button>
            <Button
              variant="outline"
              onClick={() => onQuickView(feature)}
              className="adex-nav h-auto rounded-none border-maison-emerald bg-transparent px-9 py-4 text-maison-emerald shadow-none hover:bg-maison-emerald hover:text-maison-ivory"
            >
              Private view
            </Button>
          </div>

          <div className="mt-14 border-t border-gold/40 pt-7">
            <p className="adex-eyebrow text-gold">Select a crystal form</p>
            <div className="mt-5 grid grid-cols-3 gap-px sm:grid-cols-6">
              {diamondShapes.map((shape) => (
                <Link
                  key={shape.name}
                  to="/collection"
                  aria-label={`View ${shape.name} rough diamonds`}
                  className="group flex min-w-0 flex-col items-center border-x border-transparent px-1 py-2 transition-colors hover:border-gold/40"
                >
                  <img
                    src={shape.image}
                    alt={`${shape.name} rough diamond crystal`}
                    width={96}
                    height={96}
                    className="aspect-square w-12 object-contain transition-transform duration-500 group-hover:scale-110"
                  />
                  <span className="mt-2 text-[9px] uppercase tracking-[0.18em] text-maison-emerald/65">
                    {shape.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="relative flex min-h-[620px] items-center justify-center overflow-hidden bg-maison-emerald px-8 py-16 sm:px-16">
          <div className="absolute inset-10 border border-gold/25" />
          <div className="absolute -right-[34%] top-[15%] aspect-square w-[75%] rotate-45 border border-gold/20" />
          <div className="absolute -left-[42%] bottom-[8%] aspect-square w-[78%] rotate-45 border border-gold/15" />
          <div className="relative z-10 flex w-full max-w-md flex-col items-center text-center">
            <p className="font-display text-2xl italic text-gold">The Antwerp Selection</p>
            <p className="adex-eyebrow mt-2 text-maison-ivory/55">Signature collection · {feature.id}</p>
            <button
              onClick={() => onQuickView(feature)}
              className="group relative mt-10 block w-full max-w-[330px] border border-gold/35 p-8"
              aria-label={`Quick view ${feature.title}`}
            >
              <span className="absolute -left-3 -top-3 h-8 w-8 border-l border-t border-gold" />
              <span className="absolute -bottom-3 -right-3 h-8 w-8 border-b border-r border-gold" />
              <img
                src={roughImages.salon}
                alt="Large rough diamond crystal presented on an ivory plinth"
                width={400}
                height={328}
                className="aspect-square w-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]"
              />
            </button>
            <div className="mt-8 grid w-full grid-cols-3 border-y border-gold/25 py-5 text-maison-ivory">
              <div><p className="adex-eyebrow text-maison-ivory/50">Weight</p><p className="font-display mt-1 text-lg">{feature.carat}</p></div>
              <div className="border-x border-gold/25"><p className="adex-eyebrow text-maison-ivory/50">Origin</p><p className="font-display mt-1 text-lg">DRC</p></div>
              <div><p className="adex-eyebrow text-maison-ivory/50">Status</p><p className="font-display mt-1 text-lg">{feature.status}</p></div>
            </div>
          </div>
        </div>
      </section>
      <Hallmarks tone="gold" />
    </>
  );
}

export function LandingHero(props: HeroProps) {
  return <HeroEmerald {...props} />;
}
