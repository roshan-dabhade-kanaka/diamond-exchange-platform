import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/seller/stone/$stoneId")({
  beforeLoad: ({ params }) => {
    throw redirect({ to: "/seller/stones/$stoneId", params: { stoneId: params.stoneId } });
  },
});
