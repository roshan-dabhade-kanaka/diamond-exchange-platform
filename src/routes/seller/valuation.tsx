import { createFileRoute, redirect } from "@tanstack/react-router";

// Legacy per-module URL. Valuation now lives on the stone/lot record.
export const Route = createFileRoute("/seller/valuation")({
  validateSearch: (search: Record<string, unknown>) => ({
    stone: typeof search["stone"] === "string" ? (search["stone"] as string) : undefined,
    lot: typeof search["lot"] === "string" ? (search["lot"] as string) : undefined,
  }),
  beforeLoad: ({ search }) => {
    if (search.stone) {
      throw redirect({ to: "/seller/stones/$stoneId", params: { stoneId: search.stone } });
    }
    if (search.lot) {
      throw redirect({ to: "/seller/lots/$lotId", params: { lotId: search.lot } });
    }
    throw redirect({ to: "/seller/stones" });
  },
});
