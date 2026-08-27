import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { GhostButton, GoldButton, RecordLink } from "./kit";
import { StoneThumb } from "./stone-gallery";
import type { Purchase } from "@/lib/adex-data";
import { journeyStages } from "@/lib/adex-data";

/** Horizontal stage tracker: bid won -> payment -> certification -> shipment -> delivered. */
export function JourneyTracker({ stage }: { stage: number }) {
  return (
    <ol className="flex flex-wrap items-start gap-y-3">
      {journeyStages.map((label, i) => {
        const done = i < stage;
        const current = i === stage;
        return (
          <li key={label} className="flex min-w-0 flex-1 basis-28 items-start gap-2">
            <div className="flex min-w-0 flex-1 flex-col items-center text-center">
              <div className="flex w-full items-center">
                <span
                  className={cn(
                    "h-0.5 flex-1",
                    i === 0 ? "bg-transparent" : done || current ? "bg-gold" : "bg-border",
                  )}
                />
                <span
                  className={cn(
                    "h-3.5 w-3.5 shrink-0 rounded-full border-2",
                    done
                      ? "border-gold bg-gold"
                      : current
                        ? "border-gold bg-background"
                        : "border-border bg-background",
                  )}
                />
                <span
                  className={cn(
                    "h-0.5 flex-1",
                    i === journeyStages.length - 1
                      ? "bg-transparent"
                      : done
                        ? "bg-gold"
                        : "bg-border",
                  )}
                />
              </div>
              <span
                className={cn(
                  "mt-1.5 px-1 text-[11px] leading-tight font-semibold",
                  done || current ? "text-foreground" : "text-muted-foreground",
                )}
              >
                {label}
              </span>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

/** One purchase, end to end: order, payment, certification and shipment in a single card. */
export function PurchaseCard({ purchase, action }: { purchase: Purchase; action?: ReactNode }) {
  const p = purchase;
  return (
    <article className="adex-panel overflow-hidden">
      <div className="flex flex-col gap-4 p-4 sm:flex-row">
        <StoneThumb stoneId={p.stoneId} className="h-28 w-full rounded-sm sm:w-40" />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="font-display text-base">{p.title}</p>
              <p className="text-xs text-muted-foreground">
                {p.orderId} · <RecordLink value={p.stoneId} base="buyer" /> · {p.seller}
              </p>
            </div>
            <p className="font-display text-lg">{p.amount}</p>
          </div>

          <div className="mt-4">
            <JourneyTracker stage={p.stage} />
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-3">
            <p className="text-sm">
              <span className="font-semibold">{p.nextStep}</span>
              <span className="text-muted-foreground"> · {p.nextDetail}</span>
            </p>
            <div className="flex flex-wrap gap-2">
              {p.stage <= 1 ? (
                <GoldButton className="h-8 px-3">Pay {p.amount}</GoldButton>
              ) : p.stage < 4 ? (
                <GoldButton className="h-8 px-3">Track shipment</GoldButton>
              ) : (
                <GhostButton className="h-8 px-3">Confirm receipt</GhostButton>
              )}
              <GhostButton className="h-8 px-3">Invoice</GhostButton>
              {action}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
