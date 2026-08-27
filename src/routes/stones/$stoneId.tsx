import { createFileRoute, redirect } from "@tanstack/react-router";

// Legacy public stone URL -> canonical listing detail route.
export const Route = createFileRoute("/stones/$stoneId")({
  beforeLoad: ({ params }) => {
    throw redirect({ to: "/listing/$listingId", params: { listingId: params.stoneId } });
  },
});
