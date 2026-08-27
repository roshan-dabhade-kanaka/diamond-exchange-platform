import { createFileRoute } from "@tanstack/react-router";
import { CollectionPage } from "@/components/adex/collection-page";

export const Route = createFileRoute("/collection")({
  head: () => ({
    meta: [
      { title: "The Collection — certified rough diamonds at ADEX" },
      {
        name: "description",
        content:
          "Browse the current ADEX collection of certified rough diamonds: carat, origin, status, current bid and estimate for every lot, with quick view and full provenance.",
      },
      { property: "og:title", content: "The Collection — certified rough diamonds at ADEX" },
      {
        property: "og:description",
        content:
          "Every open lot at ADEX, with origin, valuation and Kimberley Process certification.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CollectionPage,
});
