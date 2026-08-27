# Stone-centric rework: Seller + Admin

Good catches — most of these are the same underlying gap: the app is organised by
module (valuation, shipments, payments) instead of by the stone/lot itself. The fix
is to make the Stone ID the spine of the app and pull every module into it.

## 1. One canonical Stone ID, everywhere clickable

- Every Stone ID and Lot ID rendered in any table, card, or panel becomes a link to
  `/seller/stones/<stoneId>` (or `/seller/lots/<lotId>`).
- Detail pages become the single record for that stone: overview, images, valuation,
  auction, shipment, payment, certificates, history — as tabs on one screen.
- No more per-screen IDs; auctions, payments, logistics and returns all reference the
  same ID and link back to it.

## 2. Seller

- **Post-submission view**: after registering a stone the seller lands on the new
  stone record page showing submitted data, generated ADEX Stone ID, and a status
  timeline (Submitted → Received → Scanned → Valued → Listed).
- **Edit**: stone and lot records get an Edit action, allowed while the record is in
  Draft / Submitted / Received; locked afterwards with an "Request correction" path
  and an edit-history entry so mistakes at registration are fixable.
- **Lots**: add classification, number of stones, total carat, per-stone composition
  table, and the same detail/edit treatment as stones.
- **Valuation menu removed**: valuation becomes a tab inside the stone and lot record,
  plus a status column in the list.
- **Auctions & Sales**: item column links to the stone/lot record.
- **Shipments**: initiated from a stone/lot ("Arrange shipment"), with shipment detail
  shown as a tab on the record. Standalone Shipments list stays as a read-only roll-up.
- **Certificates**: attach/upload certificates per stone (Kimberley, Fair Trade,
  grading) from the stone record; the Certificates page becomes a roll-up.
- **Payments**: payment status and payout breakdown shown on the stone/lot record;
  the Payments list links each row back to the stone.
- **Notifications / Profile**: already in the header dropdowns; deep links in
  notifications will now point at the stone record.

## 3. Admin

- **Valuation & pricing**: reframed as a third-party valuation service integration —
  show provider, request/response status, submitted date, returned value, and an
  override-with-reason action for ADEX staff, instead of ADEX authoring prices.
- **Create auction**: removed as a standalone form. Auctions are created by selecting
  stones/lots from the Stones and Lots screens ("Add to auction"), then confirming
  schedule and reserve. The Auctions screen becomes monitoring plus the associated
  item list.
- **Logistics**: document upload always attached to a stone/lot/shipment; no
  standalone uploads.
- **Returns**: return records gain a documentation section (photos, inspection report,
  courier proof) required before resolution.
- **Configuration**: rewritten in plain language with grouped, described settings
  (Auction rules, Fees & payouts, Compliance, Notifications) instead of technical keys.

## Technical notes

- New routes: `seller/stones.$stoneId.tsx`, `seller/lots.$lotId.tsx`, and matching
  admin detail routes; tabbed detail layout as a shared component.
- Mock data in `src/lib/adex-data.ts` reworked so stones, lots, valuations, auctions,
  shipments, payments and certificates all key off the same Stone/Lot IDs.
- Shared `<RecordLink>` helper so any ID rendered in `DataTable` becomes a link.
- All still front-end mock data; no backend yet.

## Suggested order

1. Data model + stone/lot detail pages with linking and edit.
2. Fold valuation, shipment, payment, certificates into the record tabs.
3. Admin: auction-from-stones, valuation provider view, logistics/returns docs.
4. Configuration rewrite.
