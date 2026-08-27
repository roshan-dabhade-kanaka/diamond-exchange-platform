# Spec: Remove the Seller/Miner portal from diamond-exchange-platform

**Date:** 2026-08-27
**Status:** Approved — implementing
**Author:** Claude, on behalf of Roshan Dabhade

## Why

`diamond-commerce-platform` (the detailed, requirements-driven reference build) has no Seller or Miner
persona portal at all — no `/seller/*` routes, no seller login/registration flow, no seller entry in
sidebar or role-selection UI. Sellers and miners exist there only as **data** referenced from the Admin
side (stone ownership, settlement payouts, intake records) — never as a login-able persona with their
own pages.

`diamond-exchange-platform` (this repo, Lovable-generated) currently has a full second portal at
`/seller/*` with its own layout, nav, and 15 pages, plus multiple entry points into it from public
pages (sign-in, registration, footer/nav links). This is scope the reference build never had. It is
being removed so both projects match on persona surface area.

## Scope

**Remove:**

- The entire `/seller/*` route tree and its layout/nav.
- Every entry point that lets a visitor reach `/seller` or select a seller/miner account type:
  sign-in page's "Seller / Miner portal" link, registration page's "Miner" / "Individual seller"
  account-type options, `PortalEntryLinks`'s seller card (currently unused, but references `/seller`
  and must not be reintroduced pointing there).
- `RecordLink`'s (`src/components/adex/kit.tsx`) seller-portal linking behavior — stone/lot IDs must no
  longer link into a seller portal page. Admin views should link to the admin detail page instead.

**Keep (do not touch):**

- Seller/miner as a **data concept** on the Admin and Buyer sides: "Seller" table columns, seller names
  in mock data (`Kasai Cooperative 12`, etc.), `admin/intake.tsx`'s miner-intake workflow,
  `admin/payments.tsx`'s seller-payout settlement, `admin/register-user.tsx`'s ability to create a
  seller-role account from the admin desk, `admin/kyc.tsx`'s seller compliance cases. These mirror real
  functionality present in the old project's Admin persona and are explicitly in scope for both builds.
- Buyer-facing display of who the seller/counterparty is on a listing or order (e.g.
  `journey.tsx`'s `{p.seller}` on a purchase record) — descriptive text, not a portal link.

## Inventory of changes

### A. Delete outright

| Path                                                                                                                                                                                                                                                                                                                       | Reason                    |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| `src/routes/seller/` (all 15 files: `route.tsx`, `index.tsx`, `auctions.tsx`, `certificates.tsx`, `kyc.tsx`, `lot/$lotId.tsx`, `lots/$lotId.tsx`, `lots/index.tsx`, `notifications.tsx`, `payments.tsx`, `profile.tsx`, `shipments.tsx`, `stone/$stoneId.tsx`, `stones/$stoneId.tsx`, `stones/index.tsx`, `valuation.tsx`) | The seller portal itself. |

### B. Edit — remove seller-portal entry points, keep everything else

| Path                                   | Change                                                                                                                                                                                                                                             |
| -------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/routes/sign-in.tsx`               | Remove the "Seller / Miner portal" demo-portal link (lines ~58–62). Keep Buyer and Admin links.                                                                                                                                                    |
| `src/routes/register.tsx`              | Remove "Miner" and "Individual seller" from the account-type radio options; keep "Organization" only if it's meant as a buyer-org type, otherwise keep "Buyer" only. Update meta title/description copy that references seller/miner registration. |
| `src/components/adex/public-shell.tsx` | Remove the seller card from `PortalEntryLinks` (currently unused/unreferenced, but fix it now so it can't be wired back in pointing at a dead route). Keep Buyer and Admin cards.                                                                  |
| `src/components/adex/kit.tsx`          | `RecordLink`'s `RecordBase` type: drop `"seller"`, default to `"admin"`. Remove the `/seller/stones/$stoneId` and `/seller/lots/$lotId` link branches — collapse to admin/buyer only.                                                              |

### C. No change needed (data references stay as-is)

`src/components/adex/journey.tsx`, `src/lib/adex-data.ts`, `src/lib/adex-records.ts`,
`src/routes/admin/config.tsx`, `src/routes/admin/index.tsx`, `src/routes/admin/intake.tsx`,
`src/routes/admin/kyc.tsx`, `src/routes/admin/payments.tsx`, `src/routes/admin/register-user.tsx`,
`src/routes/admin/stones/$stoneId.tsx`, `src/routes/admin/stones/index.tsx` — all reference
seller/miner as data, matching the old project's Admin persona. Verified during audit that
`sellerLots` (used by `admin/stones/index.tsx` via `linkBase="admin"`) does not route through
`/seller/*`.

### D. Auto-regenerated

`src/routeTree.gen.ts` — TanStack Router's generated route tree. Do not hand-edit; regenerate by
running the dev/build tooling after deleting the route files (or let the router codegen pick up the
deletions on next build/dev run).

## Verification checklist

- [ ] No file under `src/` imports from or links to `to="/seller` or `to: "/seller`.
- [ ] `grep -rn "to=\"/seller\|to: \"/seller" src` returns nothing.
- [ ] `routeTree.gen.ts` no longer contains `/seller` route entries after regeneration.
- [ ] Sign-in and Register pages render with only Buyer/Admin options.
- [ ] `RecordLink` compiles with `RecordBase = "admin" | "buyer"` and all call sites still typecheck.
- [ ] Admin pages (`intake`, `payments`, `register-user`, `kyc`, `stones/index`) still show seller/miner
      data columns and workflows unchanged.
- [ ] `npm run build` (or equivalent) succeeds with no dangling references to deleted route files.

## Out of scope

- Renaming/relabeling "seller" data fields in the admin UI (e.g. "Seller commission" in
  `admin/config.tsx`) — these describe the counterparty/business rule, not a portal, and match old
  project's Admin persona language.
- Any change to `diamond-commerce-platform` itself — it already has no seller portal.
