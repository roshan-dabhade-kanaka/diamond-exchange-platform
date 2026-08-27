import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/seller/notifications")({
  beforeLoad: () => {
    throw redirect({ to: "/seller" });
  },
});
