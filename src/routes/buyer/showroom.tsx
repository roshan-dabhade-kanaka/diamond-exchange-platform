import { createFileRoute, Link } from "@tanstack/react-router";
import { pageHead } from "@/lib/page-head";
import {
  DataTable,
  EmptyState,
  FormGrid,
  GhostButton,
  GoldButton,
  PageHeader,
  Panel,
  Timeline,
} from "@/components/adex/kit";
import { StoneThumb } from "@/components/adex/stone-gallery";
import { listings, type Row } from "@/lib/adex-data";

export const Route = createFileRoute("/buyer/showroom")({
  head: pageHead(
    "Book a Showroom Visit | ADEX Buyer Portal",
    "Stones above three carats and special goods are viewed in person. Reserve a viewing table in Antwerp, Dubai or Kinshasa before you bid or buy.",
  ),
  component: ShowroomPage,
});

const visits: Row[] = [
  {
    "Visit ID": "VIS-3081",
    Showroom: "Antwerp · Hoveniersstraat",
    Stones: "ADX-L-0312, ADX-S-04412",
    When: "02 Sep 2026 · 10:30",
    Status: "Confirmed",
  },
  {
    "Visit ID": "VIS-3096",
    Showroom: "Dubai · DMCC Almas Tower",
    Stones: "ADX-S-04418",
    When: "09 Sep 2026 · 14:00",
    Status: "Pending",
  },
  {
    "Visit ID": "VIS-2977",
    Showroom: "Kinshasa · Collection Centre",
    Stones: "ADX-L-0288",
    When: "12 Aug 2026 · 09:00",
    Status: "Completed",
  },
];

function ShowroomPage() {
  return (
    <>
      <PageHeader
        title="Showroom viewings"
        description="Stones up to three carats trade fully online. Larger and special goods move to a showroom for physical viewing and weekly auction previews."
        actions={
          <Link
            to="/buyer/marketplace"
            className="h-10 border border-input px-6 text-[11px] leading-10 font-semibold tracking-[0.2em] uppercase hover:bg-accent/40"
          >
            Back to marketplace
          </Link>
        }
      />

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Panel title="Request a viewing">
          <FormGrid
            fields={[
              { label: "Showroom" },
              { label: "Preferred date", type: "date" },
              { label: "Preferred time", type: "time" },
              { label: "Attendees" },
              { label: "Stone or lot IDs" },
              { label: "Loupe / scope required" },
              { label: "Notes for the viewing desk", type: "textarea" },
            ]}
          />
          <div className="mt-5 flex flex-wrap gap-2">
            <GoldButton>Request viewing</GoldButton>
            <GhostButton>Save draft</GhostButton>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Viewings require an approved KYC file.{" "}
            <Link to="/buyer/kyc" className="adex-link">
              Check your status
            </Link>
            .
          </p>
        </Panel>

        <div className="space-y-6">
          <Panel title="How a viewing works">
            <Timeline
              steps={[
                {
                  label: "Shortlist stones",
                  detail: "Add lots from the marketplace to your viewing request.",
                  done: true,
                },
                {
                  label: "Desk confirms a slot",
                  detail: "Confirmation within one business day with a table number.",
                  done: true,
                },
                {
                  label: "Physical inspection",
                  detail: "Portable analysis on the table; paid lab analysis on request.",
                  done: false,
                },
                {
                  label: "Buy or bid",
                  detail: "Buy offline at the desk or return online to place your bid.",
                  done: false,
                },
              ]}
            />
          </Panel>

          <Panel title="Available for viewing">
            {(() => {
              const eligible = listings.filter((l) => l.isShowroomEligible);
              if (eligible.length === 0) {
                return <EmptyState message="No stones are currently curated for showroom viewing." />;
              }
              return (
                <div className="grid gap-3 sm:grid-cols-2">
                  {eligible.map((l) => (
                    <div key={l.id} className="adex-panel overflow-hidden">
                      <StoneThumb stoneId={l.id} className="aspect-[4/3] w-full" />
                      <div className="p-3">
                        <p className="adex-link text-xs">{l.id}</p>
                        <p className="truncate text-sm font-semibold">{l.title}</p>
                        <p className="text-xs text-muted-foreground">{l.carat}</p>
                      </div>
                    </div>
                  ))}
                </div>
              );
            })()}
          </Panel>
        </div>
      </div>

      <div className="mt-6">
        <Panel title="Your visits">
          <DataTable rows={visits} />
        </Panel>
      </div>
    </>
  );
}
