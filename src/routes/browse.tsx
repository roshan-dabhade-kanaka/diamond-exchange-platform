import { createFileRoute, redirect } from "@tanstack/react-router";

/** The collection now lives at /collection; keep the old URL working. */
export const Route = createFileRoute("/browse")({
  beforeLoad: () => {
    throw redirect({ to: "/collection" });
  },
  component: () => null,
});
