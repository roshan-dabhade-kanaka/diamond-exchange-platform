# Blanc Vitrine catalog redesign

## Goal
Rework only the Blanc Vitrine landing and collection experiences into a polished, catalog-first loose-diamond journey inspired by Bon Gioielli, while keeping Maison Vert and the stone detail page unchanged.

## What will change
- Replace Blanc’s current editorial split hero with a wide dark showcase banner featuring a prominent diamond, concise buying copy, and direct collection action.
- Add a highly visible three-step buying path beneath the hero: choose a diamond, review the stone, and arrange acquisition.
- Turn the Blanc landing page’s collection preview into a structured loose-diamond discovery section with natural-diamond context, cut selectors, and polished product cards.
- Rework the Blanc collection page into a practical catalog: filter controls for shape, carat, colour, clarity, and price; result count; sort control; and denser comparison-friendly rows/cards.
- Preserve Blanc’s existing typography, zero-radius detailing, semantic tokens, quick-view modal, and existing mock inventory.
- Keep Maison Vert’s hero, landing layout, collection salon, and all detail pages unchanged.

## Interaction and responsive behavior
- Filters will update the visible mock inventory immediately.
- Shape selection will be image-led and touch-friendly.
- Mobile will stack the hero, buying steps, controls, and results without overlap; desktop will prioritize wide comparison and scanability.
- Existing theme switching and direct house routes will continue to work.

## Technical details
- Update the Blanc-specific branches in the landing hero, landing preview, and collection page rather than introducing a global layout change.
- Reuse the existing Rare Carat diamond assets already stored in the project.
- Use the existing design-system Button component and semantic theme tokens for interactive controls and colors.
- Verify the Blanc landing and collection routes at desktop and mobile widths, then confirm the app build is clean.
