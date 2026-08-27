import { cn } from "@/lib/utils";
import { formatUsd, OPS_SHARE_PERCENT, MINER_SHARE_PERCENT, PARTNER_SHARE_PERCENT, settlementSplit } from "@/lib/rules";

/**
 * Shared Ops / Miner / Partner settlement-split visualization — the piece
 * diamond-commerce-platform's Money & Settlement page treats as central and
 * this project's admin/payments.tsx has been missing entirely. Used on Admin
 * Dashboard and Admin Payments so the 15/75/10 split is shown consistently.
 * See specs/2026-08-27-buyer-admin-build-plan.md.
 */

export type EscrowStatus = "PENDING" | "HELD" | "DISTRIBUTED";

export function SettlementSplitBar({
  total,
  className,
}: {
  /** Total settlement amount in dollars (numeric, not a formatted string). */
  total: number;
  className?: string;
}) {
  const { ops, miner, partner } = settlementSplit(total);
  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex h-2.5 w-full overflow-hidden rounded-full bg-muted" role="img" aria-label={`Settlement split: ${OPS_SHARE_PERCENT}% operations, ${MINER_SHARE_PERCENT}% miner, ${PARTNER_SHARE_PERCENT}% partner`}>
        <span className="h-full bg-adex-ink" style={{ width: `${OPS_SHARE_PERCENT}%` }} />
        <span className="h-full bg-gold" style={{ width: `${MINER_SHARE_PERCENT}%` }} />
        <span className="h-full bg-adex-emerald" style={{ width: `${PARTNER_SHARE_PERCENT}%` }} />
      </div>
      <div className="grid grid-cols-3 gap-3 text-xs">
        <div>
          <p className="flex items-center gap-1.5 text-muted-foreground">
            <span className="h-2 w-2 rounded-full bg-adex-ink" /> Operations ({OPS_SHARE_PERCENT}%)
          </p>
          <p className="mt-0.5 font-display text-base tabular-nums">{formatUsd(ops)}</p>
        </div>
        <div>
          <p className="flex items-center gap-1.5 text-muted-foreground">
            <span className="h-2 w-2 rounded-full bg-gold" /> Miner ({MINER_SHARE_PERCENT}%)
          </p>
          <p className="mt-0.5 font-display text-base tabular-nums">{formatUsd(miner)}</p>
        </div>
        <div>
          <p className="flex items-center gap-1.5 text-muted-foreground">
            <span className="h-2 w-2 rounded-full bg-adex-emerald" /> Partner / FOMIN ({PARTNER_SHARE_PERCENT}%)
          </p>
          <p className="mt-0.5 font-display text-base tabular-nums">{formatUsd(partner)}</p>
        </div>
      </div>
    </div>
  );
}

const escrowLabel: Record<EscrowStatus, string> = {
  PENDING: "Pending",
  HELD: "Held in escrow",
  DISTRIBUTED: "Distributed",
};

export function EscrowStatusBadge({ status }: { status: EscrowStatus }) {
  const tone =
    status === "DISTRIBUTED"
      ? "bg-success text-success-foreground"
      : status === "HELD"
        ? "bg-info text-info-foreground"
        : "bg-warning text-warning-foreground";
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-1 text-[10px] font-semibold tracking-[0.16em] whitespace-nowrap uppercase",
        tone,
      )}
    >
      {escrowLabel[status]}
    </span>
  );
}
