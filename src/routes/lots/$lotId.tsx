import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/lots/$lotId")({
  beforeLoad: ({ params }) => {
    throw redirect({ to: "/listing/$listingId", params: { listingId: params.lotId } });
  },
});
