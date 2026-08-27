import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/page-head";
import { EmptyState, GhostButton, GoldButton, KpiGrid, PageHeader, Panel, StatusBadge } from "@/components/adex/kit";
import { StoneThumb } from "@/components/adex/stone-gallery";
import { listings } from "@/lib/adex-data";

export const Route = createFileRoute("/admin/showroom")({
  head: pageHead(
    "Showroom Curation | ADEX Admin",
    "Curate which stones are eligible for physical showroom viewing in Antwerp, Dubai and Kinshasa, and oversee upcoming visit bookings.",
  ),
  component: AdminShowroom,
});

const locations = ["Antwerp · Hoveniersstraat", "Dubai · DMCC Almas Tower", "Kinshasa · Collection Centre"];

const upcomingVisits = [
  { id: "VIS-3081", showroom: "Antwerp · Hoveniersstraat", buyer: "Vermeulen Gems", stones: "ADX-L-0312, ADX-S-04412", when: "02 Sep 2026 · 10:30", status: "Confirmed" },
  { id: "VIS-3096", showroom: "Dubai · DMCC Almas Tower", buyer: "Sharma Diamonds", stones: "ADX-S-04418", when: "09 Sep 2026 · 14:00", status: "Pending" },
];

function AdminShowroom() {
  const [eligibility, setEligibility] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(listings.map((l) => [l.id, l.isShowroomEligible])),
  );

  const eligibleCount = Object.values(eligibility).filter(Boolean).length;

  return (
    <>
      <PageHeader
        title="Showroom Curation"
        description="Stones above three carats and special goods are reserved for in-person viewing. Toggle eligibility here and it reflects immediately on the buyer showroom booking page."
      />
      <KpiGrid
        items={[
          { label: "Curated stones", value: String(eligibleCount) },
          { label: "Showrooms", value: String(locations.length) },
          { label: "Upcoming visits", value: String(upcomingVisits.length) },
          { label: "Awaiting confirmation", value: String(upcomingVisits.filter((v) => v.status === "Pending").length) },
        ]}
      />

      <Panel title="Curate eligible stones" className="mt-6">
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {listings.map((l) => {
            const eligible = eligibility[l.id] ?? false;
            return (
              <div key={l.id} className="adex-panel overflow-hidden">
                <StoneThumb stoneId={l.id} className="aspect-[4/3] w-full" />
                <div className="p-3">
                  <div className="flex items-start justify-between gap-2">
                    <p className="adex-link text-xs">{l.id}</p>
                    <StatusBadge value={eligible ? "Curated" : "Not curated"} />
                  </div>
                  <p className="truncate text-sm font-semibold">{l.title}</p>
                  <p className="text-xs text-muted-foreground">{l.carat}</p>
                  {eligible ? (
                    <GhostButton
                      type="button"
                      className="mt-3 h-8 w-full px-3"
                      onClick={() => setEligibility((prev) => ({ ...prev, [l.id]: false }))}
                    >
                      Remove from showroom
                    </GhostButton>
                  ) : (
                    <GoldButton
                      type="button"
                      className="mt-3 h-8 w-full px-3"
                      onClick={() => setEligibility((prev) => ({ ...prev, [l.id]: true }))}
                    >
                      Curate for showroom
                    </GoldButton>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </Panel>

      <Panel title="Upcoming visits" className="mt-6">
        {upcomingVisits.length === 0 ? (
          <EmptyState message="No showroom visits booked." />
        ) : (
          <div className="space-y-3">
            {upcomingVisits.map((v) => (
              <div key={v.id} className="flex items-center justify-between border border-border p-3">
                <div>
                  <p className="text-sm font-semibold">
                    {v.id} — {v.buyer}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {v.showroom} · {v.stones} · {v.when}
                  </p>
                </div>
                <StatusBadge value={v.status} />
              </div>
            ))}
          </div>
        )}
      </Panel>
    </>
  );
}
