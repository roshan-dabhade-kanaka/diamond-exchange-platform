import { useState } from "react";
import { cn } from "@/lib/utils";
import { roughImages } from "@/lib/rough-forms";
import kimberleyImage from "@/assets/drc-kimberley-cert.jpg.asset.json";
import kimberleyPdf from "@/assets/drc-kimberley-cert.pdf.asset.json";

type Shot = { src: string; label: string; is3d?: boolean };

const shots: Shot[] = [
  { src: roughImages.inspection, label: "Crystal in tweezers" },
  { src: roughImages.hero, label: "Profile on stage" },
  { src: roughImages.backlit, label: "Backlit clarity" },
  { src: roughImages.parcel, label: "Parcel with scale" },
];

const photoShots = shots.filter((s) => !s.is3d);

/** All captures available for a stone — shared with the quick-view modal. */
export const stoneShots = shots;


/** Deterministic photo per stone id, so a listing always shows the same shot. */
export function stoneThumb(stoneId: string) {
  let sum = 0;
  for (const ch of stoneId) sum += ch.charCodeAt(0);
  return photoShots[sum % photoShots.length]!.src;
}

export function StoneThumb({ stoneId, className }: { stoneId: string; className?: string }) {
  return (
    <img
      src={stoneThumb(stoneId)}
      alt={`Rough diamond ${stoneId}`}
      loading="lazy"
      width={1024}
      height={768}
      className={cn("bg-panel object-cover", className)}
    />
  );
}

export function StoneGallery({ stoneId }: { stoneId: string }) {
  const [active, setActive] = useState(0);
  const current = shots[active]!;

  return (
    <div className="adex-panel overflow-hidden">
      <div className="relative bg-panel">
        <img
          src={current.src}
          alt={`${stoneId} — ${current.label}`}
          width={1024}
          height={768}
          className="aspect-[4/3] w-full object-cover"
        />
        <span className="absolute left-3 top-3 rounded-sm bg-gold px-2 py-0.5 text-xs font-semibold text-gold-foreground">
          {current.is3d ? "3D scan" : "Photo"}
        </span>
        <span className="absolute bottom-3 left-3 rounded-sm bg-foreground/75 px-2 py-0.5 text-xs font-semibold text-background">
          {current.label}
        </span>
        {current.is3d ? (
          <button className="absolute right-3 bottom-3 h-9 rounded-sm bg-primary px-4 text-sm font-semibold text-primary-foreground hover:opacity-90">
            Open 3D viewer
          </button>
        ) : null}
      </div>
      <div className="flex gap-2 overflow-x-auto border-t border-border p-3">
        {shots.map((s, i) => (
          <button
            key={s.label}
            onClick={() => setActive(i)}
            aria-label={s.label}
            className={cn(
              "h-16 w-20 shrink-0 overflow-hidden rounded-sm border-2",
              i === active ? "border-gold" : "border-border hover:border-input",
            )}
          >
            <img
              src={s.src}
              alt={s.label}
              loading="lazy"
              width={1024}
              height={768}
              className="h-full w-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

const certs = [
  {
    name: "Kimberley Process",
    ref: "KP-4471902",
    issued: "12 Aug 2026",
    status: "Valid",
    accent: "bg-info",
    image: kimberleyImage.url,
    file: kimberleyPdf.url,
  },
  {
    name: "Fair Trade",
    ref: "FT-8830471",
    issued: "12 Aug 2026",
    status: "Valid",
    accent: "bg-success",
  },
  {
    name: "Grading report",
    ref: "GR-2280114",
    issued: "13 Aug 2026",
    status: "Valid",
    accent: "bg-gold",
  },
];

/** Full-width preview of the DRC Kimberley Process certificate specimen. */
export function KimberleyCertificatePreview({ className }: { className?: string }) {
  return (
    <figure className={cn("rounded-sm border border-border bg-panel p-3", className)}>
      <img
        src={kimberleyImage.url}
        alt="Democratic Republic of Congo Kimberley Process certificate specimen"
        loading="lazy"
        className="w-full rounded-sm border border-border bg-background object-contain"
      />
      <figcaption className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
        <span>DRC Kimberley Process certificate — CEEC, Kinshasa (specimen)</span>
        <a href={kimberleyPdf.url} target="_blank" rel="noreferrer" className="adex-link">
          Download PDF
        </a>
      </figcaption>
    </figure>
  );
}

export function CertificateCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {certs.map((c) => (
        <article key={c.ref} className="rounded-sm border border-border bg-card">
          {c.image ? (
            <img
              src={c.image}
              alt={`${c.name} certificate ${c.ref}`}
              loading="lazy"
              className="aspect-[4/3] w-full bg-background object-cover object-top"
            />
          ) : (
            <div className="flex aspect-[4/3] flex-col justify-between bg-panel p-3">
              <div className={cn("h-1.5 w-12 rounded-full", c.accent)} />
              <div className="space-y-1.5">
                <div className="h-2 w-3/4 rounded-full bg-border" />
                <div className="h-2 w-full rounded-full bg-border" />
                <div className="h-2 w-2/3 rounded-full bg-border" />
              </div>
              <div className="flex items-end justify-between">
                <div className="h-8 w-8 rounded-full border-2 border-dashed border-input" />
                <div className="h-2 w-16 rounded-full bg-border" />
              </div>
            </div>
          )}
          <div className="border-t border-border p-3">
            <p className="font-display text-sm">{c.name}</p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {c.ref} · issued {c.issued} · {c.status}
            </p>
            {c.file ? (
              <a
                href={c.file}
                target="_blank"
                rel="noreferrer"
                className="adex-link mt-2 inline-block text-xs"
              >
                Download PDF
              </a>
            ) : (
              <button className="adex-link mt-2 text-xs">Download PDF</button>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}

