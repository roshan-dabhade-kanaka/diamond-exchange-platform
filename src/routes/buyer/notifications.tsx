import { createFileRoute, redirect } from "@tanstack/react-router";

// Notifications now live in the header bell menu.
export const Route = createFileRoute("/buyer/notifications")({
  beforeLoad: () => {
    throw redirect({ to: "/buyer" });
  },
});
