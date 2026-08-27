import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { GoldButton } from "@/components/adex/kit";
import { useSession } from "@/lib/session";
import { bidRange, formatUsd, parseUsdRange } from "@/lib/rules";

/**
 * Shared bid-entry form enforcing the ±20% tolerance rule against a listing's
 * valuation estimate. Used on Marketplace, Listing detail and My Bids so the
 * rule is defined once — see specs/2026-08-27-buyer-admin-build-plan.md.
 */

export function BidForm({
  estimate,
  currentBid,
  onSubmit,
  className,
}: {
  /** The listing's estimate range, e.g. "$160,000 – $210,000". */
  estimate: string;
  /** The current leading bid, e.g. "$184,500", shown as a floor hint. */
  currentBid?: string;
  onSubmit: (amount: number) => void;
  className?: string;
}) {
  const { isCleared, session } = useSession();
  const [estMin, estMax] = parseUsdRange(estimate);
  const midpoint = (estMin + estMax) / 2;
  const { min, max } = bidRange(midpoint);

  const schema = z.object({
    amount: z.coerce
      .number({ invalid_type_error: "Enter a bid amount." })
      .min(
        min,
        `Bids must be at least ${formatUsd(min)} — ±20% of the ${formatUsd(midpoint)} estimate.`,
      )
      .max(
        max,
        `Bids must be at most ${formatUsd(max)} — ±20% of the ${formatUsd(midpoint)} estimate.`,
      ),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<z.infer<typeof schema>>({ resolver: zodResolver(schema) });

  if (!isCleared) {
    return (
      <div className={className}>
        <p className="text-sm text-muted-foreground">
          Bidding is enabled only for buyers who have cleared KYC/AML and regulatory eligibility
          review.
          {session.kycStatus === "REJECTED" && session.rejectionReason
            ? ` Your last submission was rejected: ${session.rejectionReason}.`
            : ""}
        </p>
        <a href="/buyer/kyc" className="adex-link mt-2 inline-block text-sm">
          Review KYC / AML status →
        </a>
      </div>
    );
  }

  return (
    <form
      className={className}
      onSubmit={handleSubmit((values) => {
        onSubmit(values.amount);
        reset();
      })}
    >
      <label className="flex flex-col gap-1 text-xs font-semibold">
        Your bid
        <input
          type="number"
          step="1"
          placeholder={String(min)}
          className="h-10 rounded-sm border border-input bg-background px-3 text-sm font-normal focus:border-ring focus:outline-none"
          {...register("amount")}
        />
      </label>
      <p className="mt-1.5 text-xs text-muted-foreground">
        Allowed range {formatUsd(min)} – {formatUsd(max)} (±20% of the {formatUsd(midpoint)}{" "}
        estimate)
        {currentBid ? ` · current bid ${currentBid}` : ""}
      </p>
      {errors.amount ? (
        <p className="mt-1.5 text-xs font-semibold text-destructive">{errors.amount.message}</p>
      ) : null}
      <GoldButton type="submit" className="mt-3" disabled={isSubmitting}>
        Place bid
      </GoldButton>
    </form>
  );
}
