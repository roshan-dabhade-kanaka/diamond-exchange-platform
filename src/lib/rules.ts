/**
 * Centralized business-rule constants for the ADEX exchange.
 *
 * Every page that enforces one of these rules imports the constant from
 * here rather than inlining the number — mirrors diamond-commerce-platform's
 * constants/ discipline (see specs/2026-08-27-buyer-admin-build-plan.md).
 */

/** Stones at or above this carat weight are processed individually; below it, they're grouped into a lot. */
export const STONE_SIZE_THRESHOLD_CARAT = 1.5;

/** A bid must fall within this percentage of the platform's valuation estimate, either side. */
export const BID_TOLERANCE_PERCENT = 20;

/** How long a listing accepts bids after it goes live. */
export const BIDDING_WINDOW_DAYS = 7;

/** How long a buyer has to pay after winning before the win is forfeited. */
export const PAYMENT_LOCK_HOURS = 48;

/** How long a buyer who misses a payment window is barred from bidding again. */
export const BIDDER_RESTRICTION_MONTHS = 12;

/** Settlement split of a completed sale, applied to every payout. Must sum to 100. */
export const OPS_SHARE_PERCENT = 15;
export const MINER_SHARE_PERCENT = 75;
export const PARTNER_SHARE_PERCENT = 10;

/** Returns the [min, max] bid range allowed for a given valuation estimate, per BID_TOLERANCE_PERCENT. */
export function bidRange(estimate: number): { min: number; max: number } {
  const tolerance = BID_TOLERANCE_PERCENT / 100;
  return {
    min: Math.round(estimate * (1 - tolerance)),
    max: Math.round(estimate * (1 + tolerance)),
  };
}

/** True if `amount` falls within the allowed tolerance band around `estimate`. */
export function isWithinBidTolerance(amount: number, estimate: number): boolean {
  const { min, max } = bidRange(estimate);
  return amount >= min && amount <= max;
}

/** Splits a total settlement amount into Ops / Miner / Partner shares. */
export function settlementSplit(total: number): { ops: number; miner: number; partner: number } {
  return {
    ops: Math.round((total * OPS_SHARE_PERCENT) / 100),
    miner: Math.round((total * MINER_SHARE_PERCENT) / 100),
    partner: Math.round((total * PARTNER_SHARE_PERCENT) / 100),
  };
}

/** A stone at or above this carat weight is registered individually rather than grouped into a lot. */
export function requiresIndividualProcessing(carat: number): boolean {
  return carat >= STONE_SIZE_THRESHOLD_CARAT;
}

export function formatUsd(value: number): string {
  return value.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

/** Parses a formatted currency string like "$184,500" or "$160,000 – $210,000" (first value) into a number. */
export function parseUsd(value: string): number {
  const match = value.replace(/,/g, "").match(/[\d.]+/);
  return match ? Number(match[0]) : 0;
}

/** Parses an estimate range string like "$160,000 – $210,000" into [min, max] numbers. */
export function parseUsdRange(value: string): [number, number] {
  const nums = value.replace(/,/g, "").match(/[\d.]+/g) ?? [];
  const min = Number(nums[0] ?? 0);
  const max = Number(nums[1] ?? nums[0] ?? 0);
  return [min, max];
}

/** Formats the time remaining until `isoDate` as "2d 14h" (or "Closed" once past). */
export function formatCountdown(isoDate: string): string {
  const diffMs = new Date(isoDate).getTime() - Date.now();
  if (diffMs <= 0) return "Closed";
  const totalHours = Math.floor(diffMs / (60 * 60 * 1000));
  const days = Math.floor(totalHours / 24);
  const hours = totalHours % 24;
  if (days === 0) return `${hours}h`;
  return `${days}d ${String(hours).padStart(2, "0")}h`;
}

/** True if a listing's bidding window ends within the next `hours` (default 24 — "closing soon"). */
export function isClosingSoon(isoDate: string, hours = 24): boolean {
  const diffMs = new Date(isoDate).getTime() - Date.now();
  return diffMs > 0 && diffMs <= hours * 60 * 60 * 1000;
}
