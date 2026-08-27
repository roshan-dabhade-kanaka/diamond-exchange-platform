import { createFileRoute, redirect } from "@tanstack/react-router";

// Orders, payments, shipments and returns are consolidated into /buyer/orders.
export const Route = createFileRoute("/buyer/returns")({
  beforeLoad: () => {
    throw redirect({ to: "/buyer/orders" });
  },
});
