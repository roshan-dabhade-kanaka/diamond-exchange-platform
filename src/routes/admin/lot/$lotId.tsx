import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/lot/$lotId")({
  beforeLoad: ({ params }) => {
    throw redirect({ to: "/admin/lots/$lotId", params: { lotId: params.lotId } });
  },
});
