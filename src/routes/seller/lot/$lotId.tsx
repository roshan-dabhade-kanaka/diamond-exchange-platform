import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/seller/lot/$lotId")({
  beforeLoad: ({ params }) => {
    throw redirect({ to: "/seller/lots/$lotId", params: { lotId: params.lotId } });
  },
});
