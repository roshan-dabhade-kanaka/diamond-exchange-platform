# Spec: Buyer + Admin page-by-page build plan — bring diamond-exchange-platform to parity

**Date:** 2026-08-27
**Status:** Draft — for review before implementation begins
**Author:** Claude, on behalf of Roshan Dabhade
**Depends on:** [Gap Analysis artifact](https://claude.ai/code/artifact/67f86b49-f215-418d-b1c0-59b2147a0971) (Buyer/Admin, Old vs New), `specs/2026-08-27-remove-seller-miner-portal.md` (already implemented)

## Ground rules for this build

1. **Theme stays diamond-exchange-platform's own.** Every page below builds inside the existing ADEX
   design system already in `src/styles.css` and `src/components/adex/kit.tsx` — gold wordmark,
   ivory/emerald "Maison" palette, slab-serif display + humanist sans, existing `Panel` / `DataTable` /
   `FormGrid` / `Timeline` / `StatusBadge` primitives. No visual system is imported from
   `diamond-commerce-platform`.
2. **Images stay diamond-exchange-platform's own.** The asset library already in `src/assets/` is
   sufficient and on-brand: rough-diamond photography (`src/assets/rough/*` — hero, salon, inspection,
   parcel, backlit, and per-crystal-form renders), cut-diamond studio renders by shape
   (`src/assets/rarecarat/*`), and general hero/diamond shots (`diamond-1.jpg`, `diamond-2.jpg`,
   `diamond-3.jpg`, `diamond-3d.jpg`). No image is copied over from `diamond-commerce-platform`. Where a
   page needs a new image (e.g. a Money & Settlement illustration), source or generate one that matches
   the existing photography style — never reuse the old project's asset files directly.
3. **What "respecting both" means, concretely, per page below:**
   - Where **new is already ahead** (a tabbed Stone Details page, the Orders/Payments/Shipments/Returns
     consolidation, `admin/config.tsx`) — keep new's structure, do not rebuild it to match old.
   - Where **old has real business logic new is missing** (bid tolerance math, KYC state machine,
     settlement split) — port the *logic and gating*, not old's UI, into new's existing components.
   - Where **old and new model the same feature differently** (Paid Analysis) — resolved below per
     product decision, not left ambiguous.
4. **Every page ships with real derived state**, not hardcoded KPI strings. This is the single biggest
   gap the analysis found — treat "static number → computed value" as part of every page's definition
   of done, not a follow-up pass.
5. **Business-rule constants are centralized** in `src/lib/adex-data.ts` (or a new `src/lib/rules.ts` if
   that file gets crowded) — never inlined per-page. Mirrors old project's `constants/` discipline.

## Product decisions locked before implementation

| Question | Decision |
|---|---|
| Paid Analysis: old's cutting-credit model vs. new's paid-lab-report model? | **Keep new's lab-report model as the primary flow.** Add old's cutting-option-credit purchase as a *second, additional* flow on the same page (a distinct panel: "AI Cutting & Yield Plans" alongside the existing lab-tier order form) — not a replacement. Both are legitimately monetizable services; nothing is lost. |
| Money & Settlement: new dedicated page matching old's structure, or extend new's existing payments page? | **Extend `admin/payments.tsx` in place**, in new's own visual language. Add the 15/75/10 Ops/Miner/FOMIN split, escrow status, and a settlement progress indicator to the existing seller-payout table rather than building a second standalone page. Keeps new's simpler information architecture; ports old's missing math. |

## Business rules to port (apply platform-wide, not per-page)

These are named constants in old's `constants/` layer and must become named constants here too —
referenced from every page that touches them, never re-derived inline.

| Rule | Constant | Enforced where |
|---|---|---|
| Rough/lot size routing | `STONE_SIZE_THRESHOLD_CARAT = 1.5` | Admin Intake, Admin Stone/Lot list filtering |
| Bid tolerance | `BID_TOLERANCE_PERCENT = 20` (min = estimate×0.8, max = estimate×1.2) | Buyer Marketplace bid input, Buyer Bids, Listing detail, Zod schema |
| Bidding window | `BIDDING_WINDOW_DAYS = 7` | Buyer Marketplace/Bids countdowns, Admin Auctions |
| Payment lock window | `PAYMENT_LOCK_HOURS = 48` | Buyer Checkout countdown, Admin Config (currently contradicts itself — 48h vs "4 days" — must be reconciled to one value) |
| Bidder suspension after missed payment | `BIDDER_RESTRICTION_MONTHS = 12` | Buyer Bids/Listing status copy, Admin Auctions default rules |
| Settlement split | `OPS_SHARE_PERCENT = 15`, `MINER_SHARE_PERCENT = 75`, `PARTNER_SHARE_PERCENT = 10` | Admin Payments (Money & Settlement), Admin Partners |
| KYC/AML + eligibility gate | `buyer.complianceStatus === "APPROVED" && buyer.eligibilityStatus === "ELIGIBLE"` | Gates Bid and Paid Analysis actions everywhere they appear — Marketplace, Listing detail, Bids, Analysis |
| Kimberley Certificate gate | Certificate `status === "APPROVED"` required before export docs generate | Admin Logistics export-document generation, Buyer Listing "Kimberley certified only" filter |

---

## Buyer persona — page-by-page plan

### 1. Landing (`src/routes/index.tsx`, `landing-page.tsx`)
**Status today:** Good — keep structure, copy, and imagery as-is.
**Work:** None required for parity. Optional: verify hero imagery rotates through the existing
`rough/*` set rather than a single static image, for variety. *(0.25 day, optional polish only)*

### 2. Sign in (`sign-in.tsx`) / Register (`register.tsx`)
**Status today:** Functional shells, no state machine.
**Work:**
- Wire a real (mock) auth service: `signIn()`, `register()` returning a session object with
  `complianceStatus: "PENDING"` by default.
- Add an OTP-verification step between Register and dashboard entry (old's flow: Register → OTP →
  role-appropriate dashboard). Reuse existing `Timeline`/`FormGrid` components in new's style — a
  segmented 6-digit input, any correctly-formatted code accepted (Phase 1, matches old's rule).
- Registration copy/options already fixed to Buyer-only in the seller-removal pass; no further change.

*Estimate: 1 day.*

### 3. Buyer Dashboard (`buyer/index.tsx`)
**Status today:** Static shell — KPI numbers hardcoded, no bid-status logic.
**Work:**
- Introduce a `myBidStatus` field on mock bid records (`NONE | WINNING | OUTBID | LOCKED_UNPAID |
  WINNER2_WAITLISTED`) in `adex-data.ts`, and derive the "Live bids" table and KPI counts from it
  instead of static strings.
- Compute "Closing soon" from each listing's `biddingWindowEnd` against a 24h threshold, not a fixed
  first-4 slice.
- Add the conditional payment-due banner (renders only when an unpaid won-lot exists).
- Dynamic CTA text per bid status on each bid row (Raise bid / Accept offer / View auction), matching
  old's pattern but in new's card/table styling.

*Estimate: 1.5 days.*

### 4. Marketplace + Browse Inventory (`buyer/marketplace.tsx`, `buyer/inventory.tsx`)
**Status today:** Two separate simple pages; `FilterBar` fields are static labels with no bound state.
**Work:**
- Keep the two-page split (new's structure) — do not reintroduce old's single 3-category page. But wire
  category filtering (Rough / Lots / Cutting &-polishing) as a real tab or toggle group on
  `inventory.tsx`, since that grouping doesn't exist anywhere in new today and is a real product concept
  (a stone under 1.5ct is a Lot, not an individually browsable stone).
- Make `FilterBar` fields functional: bound carat-range and price-range inputs, a working
  color-grade/clarity-grade picker, a "Kimberley certified only" toggle that actually filters
  `listings` by certificate status, active filter chips with clear.
- Sync filters to URL search params (TanStack Router search params, not React Router's, but same idea)
  so filtered views are shareable/bookmarkable.

*Estimate: 2.5 days.*

### 5. Listing detail (`listing.$listingId.tsx`)
**Status today:** Static detail page, public route, no bid-status branching, no tolerance display.
**Work:**
- Move bid-relevant actions behind the compliance gate: if `!complianceStatus===APPROVED ||
  !eligibilityStatus===ELIGIBLE`, disable the bid button with an inline explanation linking to
  `/buyer/kyc`, matching old's rule of disabling with an explanation rather than hiding.
- Compute and display the bid range from `BID_TOLERANCE_PERCENT` against the listing's valuation
  estimate ("Allowed range $X – $Y (±20% of the $Z estimate)").
- Add a watchlist toggle button (currently only exists on the standalone Watchlist page).
- Add per-certificate status badges (Approved/Pending/Required) instead of static "certification cards."
- Keep this route public (new's choice to allow browsing without sign-in is reasonable and not a
  regression) — only the bid *action* needs the gate, not visibility of the page.

*Estimate: 2 days.*

### 6. Paid Analysis (`buyer/analysis.tsx`)
**Status today:** Paid lab-report marketplace (3 fixed tiers), functioning as designed.
**Work (per product decision above):**
- Keep the existing lab-tier order form and requests table untouched.
- Add a second panel: "AI Cutting & Yield Plans" — listing plan tiers priced per stone, with copy
  clarifying the fee is credited against the final invoice if cut with ADEX (old's guarantee mechanic).
  This is additive, not a replacement — both monetization paths coexist on the same page under separate
  sections.
- Gate both panels behind the compliance check (currently ungated).

*Estimate: 1.5 days.*

### 7. My Bids (`buyer/bids.tsx`)
**Status today:** Flat KPI grid + one static hardcoded bid panel.
**Work:**
- Replace the single hardcoded "Place a bid" panel with a real `BidForm` validated against
  `BID_TOLERANCE_PERCENT` — reject out-of-range amounts inline with min/max shown, via the same Zod
  pattern used elsewhere in the codebase (check `buyer/checkout.tsx` or forms already using
  `@hookform/resolvers` for the existing convention).
- Add tab or filter (All / Leading / Outbid / Closing soon) driven by real `myBidStatus` counts, not
  static KPI strings.
- Per-row expand (or a detail drawer, matching new's existing `Dialog`/`Sheet` primitives rather than
  old's accordion) showing bid history for that lot.

*Estimate: 2 days.*

### 8. Checkout (`buyer/checkout.tsx`)
**Status today:** Single page, real Summary + Payment content, but Confirmation is fully absent —
`JourneyTracker stage={1}` never advances.
**Work:**
- Add the Confirmation state as `stage={2}` within the same single-page component (respecting new's
  one-page consolidation — do not split back into 3 routes). On successful (mock) payment submit,
  advance `stage` and render: a confirmation hero, a "what happens next" timeline (KYC-cleared →
  Kimberley cert transfer → export docs → shipment, using this project's own copy/voice), and
  document-download stubs (invoice, certificate, insurance note) styled as new's existing `Panel`/list
  patterns.
- Add the third payment method (`swiss_debit` or equivalent) alongside wire/card, if the business wants
  parity — flag as optional, since 2 methods is a legitimate simpler choice.
- Reconcile the payment-lock countdown to the single `PAYMENT_LOCK_HOURS` constant (currently
  contradicts `admin/config.tsx`'s "4 days" — pick one, likely 48h since it's what old models, and fix
  the config page to match).

*Estimate: 1.5 days.*

### 9. Orders / Payments / Shipments / Returns (`buyer/orders.tsx`)
**Status today:** The strongest page in the new build — real tabbed content, working return dialog.
**Work:**
- Add a per-order detail view. Given new's consolidation is good, don't add a new route — instead add
  an expandable row or a `Sheet`/side-panel per order that opens the fuller detail (invoice breakdown,
  full tracking timeline, full return history) without leaving the tabbed page.
- No other changes — this page is close to done.

*Estimate: 1 day.*

### 10. Watchlist (`buyer/watchlist.tsx`)
**Status today:** Simple static grid — acceptable baseline.
**Work:** Wire live bid-status updates onto each watchlist card (current bid / time-to-close), and a
working "remove" action. *Estimate: 0.5 day.*

### 11. Showroom (`buyer/showroom.tsx`)
**Status today:** A real, promoted nav page (new-only addition, genuinely good — keep as top-level nav).
**Work:** Gate showroom-eligible stones by `stone.isShowroomEligible` flag (currently likely showing all
listings) so it reflects the real curation rule from old's spec. *Estimate: 0.5 day.*

### 12. Buyer KYC (`buyer/kyc.tsx`)
**Status today:** Fully decorative — static "Approved" badge not bound to any state.
**Work:**
- Introduce real `kycStatus: NOT_STARTED | PENDING | APPROVED | REJECTED` and
  `eligibilityStatus: ELIGIBLE | INELIGIBLE | UNDER_REVIEW` state (mock, persisted per session).
- Real 3-step progress computed from status, not a hardcoded done-Timeline.
- Rejection path: show rejection reason + a "Resubmit document" action per document row that flips it
  back to Pending.
- This state is what everything in items 5–7 above reads for the compliance gate — build this first,
  since Marketplace/Listing/Bids/Analysis all depend on it.

*Estimate: 1.5 days.*

### 13. Buyer Profile (`buyer/profile.tsx`)
**Status today:** Lighter than old (no theme/notification prefs) — acceptable, low priority.
**Work:** Add notification-preference toggles and a theme toggle if not already global elsewhere in the
shell (check `portal-shell.tsx` first — may already be handled at the shell level, in which case this
page needs nothing). *Estimate: 0.5 day, pending that check.*

**Buyer subtotal: ~16 focused days** (excluding the Landing/Sign-in items which are mostly already
fine or foundational).

---

## Admin persona — page-by-page plan

### 1. Admin Dashboard (`admin/index.tsx`)
**Status today:** Static KPI grid, no cross-domain aggregation.
**Work:**
- Compute all 4 KPI cards from underlying mock arrays (Users, Auctions, Compliance queue, Total
  settled), each linking to its detail page.
- Add a date-range control (7/15/40/custom) on the "Recent sells" panel, computing gross value and
  awaiting-payout count for the selected range — reuse whatever date-picker primitive already exists in
  `components/ui/` (check `calendar.tsx`, already present).
- Add the settlement split visualization (see Money & Settlement below) as a compact bar per row here
  too, consistent with the fuller version on the Payments page.
- "Action Required" section: aggregate oldest-first across compliance-pending, escrow-held, and
  returns-under-inspection into one real list.

*Estimate: 2 days.*

### 2. Users (`admin/users.tsx`) + Register User (`admin/register-user.tsx`)
**Status today:** Functional list; register-user is a new-only addition (keep it, it's good).
**Work:** Add a user-detail view (drawer or route) — currently no drill-down exists at all.
*Estimate: 1 day.*

### 3. KYC / AML / Eligibility (`admin/kyc.tsx`)
**Status today:** Single page, one static hardcoded case, decisions not wired to the table.
**Work:**
- Split into three real tabs on the same page (KYC / AML / Eligibility) rather than three separate
  routes — new's single-page approach is fine, old's gap was that Eligibility didn't exist *at all*
  and decisions did nothing.
- Wire Approve/Reject/Escalate to actually mutate the row's status in the table (client-side mock
  state).
- Add a real case-detail drawer per row (document checklist per applicant type, comment history)
  instead of one static card.
- This page's decisions are what `buyer/kyc.tsx` should read from in a fuller build (same mock "user"
  record shared across both).

*Estimate: 2.5 days.*

### 4. Stone Intake (`admin/intake.tsx`)
**Status today:** Good — stone registration with a real pipeline timeline. Missing lot registration.
**Work:** Add a lot-registration form (parallel to the existing stone form) gated by
`STONE_SIZE_THRESHOLD_CARAT` — when carat entered is under 1.5, guide the flow toward "assign to lot"
rather than individual registration, matching old's routing rule. *Estimate: 1.5 days.*

### 5. Stones (`admin/stones/index.tsx`, `admin/stones/$stoneId.tsx`)
**Status today:** Strong — tabbed detail page is one of the best pages in the new build. Keep as-is.
**Work:** None required for parity. *Estimate: 0 days.*

### 6. Lots (`admin/lots/index.tsx` — does not currently exist as a list route, only `admin/lots/$lotId.tsx`)
**Work:** Add a lot list page (currently you can only reach a lot detail directly by ID — there's no
browse/list entry point), matching the pattern of `admin/stones/index.tsx`. *Estimate: 1 day.*

### 7. Auctions (`admin/auctions.tsx`) + New Auction (`admin/new-auction.tsx`)
**Status today:** Good, reasonably complete.
**Work:** Wire the "Relist at lower price" action for Unsold auctions (old's explicit rule) — currently
likely just a status display. *Estimate: 0.5 day.*

### 8. Showroom curation
**Status today:** Absent entirely — no page, no nav item.
**Work:** New admin page, `admin/showroom.tsx`, in new's visual language: a filterable list of
showroom-eligible stones with a toggle to add/remove eligibility, plus per-location (Antwerp / Dubai /
Kinshasa, matching the existing `buyer/showroom.tsx` copy) visit-booking oversight. This is the one
place old has a page new doesn't have any equivalent for at all. *Estimate: 1.5 days.*

### 9. Valuation (`admin/valuation.tsx`)
**Status today:** New-only addition — keep, it's a reasonable page old didn't have as a dedicated
screen.
**Work:** None required. *Estimate: 0 days.*

### 10. Logistics (`admin/logistics.tsx`)
**Status today:** Reasonably complete, covers shipments + returns + export docs.
**Work:** Gate export-document generation behind the Kimberley Certificate status field (currently
static "Approved" text, not a real gate) — no export doc should generate for a stone whose certificate
isn't `APPROVED`. Add per-shipment and per-return detail views (drawer, not new routes, matching the
project's existing preference for consolidated pages over route sprawl). *Estimate: 1.5 days.*

### 11. Money & Settlement (`admin/payments.tsx`)
**Status today:** Flat buyer/seller payment list — the single largest gap in the whole analysis.
**Work (per product decision above — extend in place):**
- Add the 15% Ops / 75% Miner / 10% Partner split as a per-row breakdown (reuse or build a compact
  proportional bar component matching new's existing chart primitives — `recharts` is already a
  dependency).
- Add `escrowStatus` (`HELD | RELEASED`) per settlement row, and a "Release payout" action.
- Add KPIs: total settlements, escrow-held total, distributed total, miner-share total — computed, not
  static.
- Keep this as one page (per the decision above) rather than splitting into old's two-tab structure —
  achieve the same information density with new's existing tab/section conventions.

*Estimate: 2.5 days — the largest single item in the admin plan, matching how large the analysis found
this gap to be.*

### 12. Partners / FOMIN (`admin/partners.tsx`)
**Status today:** Reasonable baseline.
**Work:** Link partner settlement records to the real settlement split from item 11 rather than static
rows. *Estimate: 0.5 day.*

### 13. Reports (`admin/reports.tsx`)
**Status today:** Has real charts already — good.
**Work:** None required for parity. *Estimate: 0 days.*

### 14. Audit (`admin/audit.tsx`)
**Status today:** List only, no detail route.
**Work:** Add a detail drawer per audit entry (full before/after diff, actor, timestamp) — drawer, not
a new route. *Estimate: 0.75 day.*

### 15. Integrations status
**Status today:** Absent entirely.
**Work:** New page, `admin/integrations.tsx`, listing all 9 external systems from old's compliance spec
(Sarine/Da Vinci, Spacecode, Reference Pricing, CCC/Government, Banks/Revolut, Swiss Transaction Bank,
FOMIN, Malca Amit + logistics, Fair Trade [disabled/future badge]) — every one honestly labeled
`MOCKED`, never a fabricated `CONNECTED` state. Simple status-card grid, matches new's existing card
patterns. *Estimate: 1 day.*

### 16. Admin Profile
**Status today:** Absent — no route.
**Work:** Add `admin/profile.tsx` mirroring `buyer/profile.tsx`'s structure. *Estimate: 0.5 day.*

### 17. Config (`admin/config.tsx`)
**Status today:** Genuinely good, new-only addition — keep.
**Work:** Fix the payment-window contradiction flagged above (48h vs 4 days) to read from the same
`PAYMENT_LOCK_HOURS` constant as Buyer Checkout. Add the bidding-window setting (`BIDDING_WINDOW_DAYS`)
which is currently missing from this page entirely. *Estimate: 0.5 day.*

**Admin subtotal: ~17 focused days.**

---

## Cross-cutting work (not page-specific)

| Item | Why | Estimate |
|---|---|---|
| Centralize business-rule constants (`src/lib/rules.ts`) | Every page above references these; must exist before most page work starts | 0.5 day |
| Mock auth/session service with `kycStatus`/`eligibilityStatus`/`myBidStatus` state | Buyer KYC, Marketplace, Listing, Bids, Analysis, and Admin KYC all read/write this | 1 day |
| Shared `BidForm` component with Zod tolerance validation | Reused on Listing, Marketplace, Bids | 0.5 day |
| Shared settlement-split visualization component | Reused on Admin Dashboard and Admin Payments | 0.5 day |

**Cross-cutting subtotal: ~2.5 days**, best done first as a foundation layer before persona pages.

---

## Total estimate

| Track | Focused days |
|---|---|
| Cross-cutting foundation | 2.5 |
| Buyer persona (13 pages) | 16 |
| Admin persona (17 pages) | 17 |
| **Total** | **~35.5 focused days** |

At **3–4 focused hours/day** (the stated working pace), that's roughly **35–36 working days**, or
**about 7–7.5 calendar weeks** at 5 working days/week — assuming no scope changes, no design-review
back-and-forth beyond what's noted, and that the existing component library (`kit.tsx`,
`components/ui/*`) covers what's needed without new primitive components (a couple of items above may
need one, e.g. the settlement-split bar, budgeted into their own line items).

**Recommended sequencing:**
1. Cross-cutting foundation (constants, mock session/compliance state, BidForm, settlement-split
   component) — everything else depends on this.
2. Admin KYC/Eligibility + Buyer KYC together (they share the same mock user record) — unblocks every
   compliance-gated Buyer page.
3. Buyer pages in the order listed (Dashboard → Marketplace → Listing → Analysis → Bids → Checkout →
   Orders → Watchlist → Showroom → Profile).
4. Admin pages in the order listed, with Money & Settlement and Showroom curation prioritized since
   they're the largest true gaps.

This sequencing front-loads the highest-risk, most-depended-on work (compliance state, bid tolerance)
so that later pages are mostly composition rather than new logic.

## Explicitly out of scope for this plan
- Any Seller/Miner page or entry point (removed per the prior spec; staying removed).
- A real backend, payment gateway, or KYC provider — everything above stays mock/frontend-only, matching
  both projects' Phase 1 scope.
- Visual redesign of pages already flagged "keep as-is" above (Landing, Stone Details, Reports, Config,
  Valuation) — they already meet or exceed parity and should not be touched without a separate reason.
