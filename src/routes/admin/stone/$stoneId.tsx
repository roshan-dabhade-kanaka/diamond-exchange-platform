import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/stone/$stoneId")({
  beforeLoad: ({ params }) => {
    throw redirect({ to: "/admin/stones/$stoneId", params: { stoneId: params.stoneId } });
  },
});
