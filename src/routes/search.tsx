import { createFileRoute, redirect } from "@tanstack/react-router";

/** Search folded into the collection filters on the landing page. */
export const Route = createFileRoute("/search")({
  beforeLoad: () => {
    throw redirect({ to: "/", hash: "collection" });
  },
  component: () => null,
});
