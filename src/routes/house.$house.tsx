import { createFileRoute, notFound } from "@tanstack/react-router";
import { LandingPage } from "@/components/adex/landing-page";
import { themes } from "@/lib/theme";

const slugs = ["maison-vert"];

export const Route = createFileRoute("/house/$house")({
  loader: ({ params }) => {
    if (!slugs.includes(params.house)) throw notFound();
    return { id: "emerald" as const };
  },
  head: ({ params }) => {
    const meta = slugs.includes(params.house) ? themes[0] : undefined;
    if (!meta) {
      return { meta: [{ title: "House not found — ADEX" }, { name: "robots", content: "noindex" }] };
    }
    const title = `${meta.name} — ADEX house style`;
    const description = `${meta.house}. ${meta.note}. The ADEX landing experience in the ${meta.name} house style.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: LandingPage,
});
