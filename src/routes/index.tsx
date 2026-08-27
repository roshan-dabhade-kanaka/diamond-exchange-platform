import { createFileRoute } from "@tanstack/react-router";
import { LandingPage } from "@/components/adex/landing-page";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ADEX — Transparent Diamonds from African Origin" },
      {
        name: "description",
        content:
          "Discover rough, uncut diamonds from African origin through ADEX's transparent, fair international marketplace.",
      },
      { property: "og:title", content: "ADEX — Transparent Diamonds from African Origin" },
      {
        property: "og:description",
        content:
          "A fairer route from African producers to international buyers, with full provenance and transparent market access.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LandingPage,
});
