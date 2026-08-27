import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { pageHead } from "@/lib/page-head";
import {
  DataTable,
  FormGrid,
  GhostButton,
  GoldButton,
  KpiGrid,
  PageHeader,
  Panel,
  Timeline,
} from "@/components/adex/kit";
import type { Row } from "@/lib/adex-data";
import { requiresIndividualProcessing, STONE_SIZE_THRESHOLD_CARAT } from "@/lib/rules";

export const Route = createFileRoute("/admin/intake")({
  head: pageHead(
    "Stone Intake & Registration | ADEX Admin",
    "Register stones brought in by miners at a collection centre, capture details and media, send them to valuation and push them to listing.",
  ),
  component: IntakePage,
});

const intakeQueue: Row[] = [
  {
    "Intake ID": "INT-9041",
    Miner: "Kasai Cooperative 12",
    Centre: "Kinshasa",
    Carat: "6.84",
    Status: "Awaiting valuation",
  },
  {
    "Intake ID": "INT-9038",
    Miner: "Mbuji-Mayi Artisanal",
    Centre: "Mbuji-Mayi",
    Carat: "2.11",
    Status: "Details uploaded",
  },
  {
    "Intake ID": "INT-9032",
    Miner: "Tshikapa Group",
    Centre: "Kinshasa",
    Carat: "11.40",
    Status: "Registered",
  },
  {
    "Intake ID": "INT-9021",
    Miner: "Kasai Cooperative 12",
    Centre: "Kinshasa",
    Carat: "3.62",
    Status: "Listed",
  },
];

function IntakePage() {
  const [carat, setCarat] = useState("");
  const caratValue = parseFloat(carat);
  const hasCarat = carat !== "" && !Number.isNaN(caratValue);
  const individual = hasCarat ? requiresIndividualProcessing(caratValue) : null;

  return (
    <>
      <PageHeader
        title="Stone intake"
        description="A miner brings a stone to a collection centre. Register it, upload details and media, run valuation, then list it for fixed price or assign it to an auction."
        actions={
          <Link
            to="/admin/valuation"
            className="h-10 border border-input px-6 text-[11px] leading-10 font-semibold tracking-[0.2em] uppercase hover:bg-accent/40"
          >
            Valuation queue
          </Link>
        }
      />

      <KpiGrid
        items={[
          { label: "Registered today", value: "14" },
          { label: "Awaiting valuation", value: "6" },
          { label: "Ready to list", value: "9" },
          { label: "Carats in intake", value: "182.4" },
        ]}
      />

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <Panel title="Register a stone">
          <div className="grid gap-4 sm:grid-cols-2">
            <FormGrid
              fields={[
                { label: "Miner / cooperative" },
                { label: "Collection centre" },
                { label: "Origin site" },
                { label: "Rough or polished" },
              ]}
            />
            <label className="flex flex-col gap-1 text-xs font-semibold">
              Carat weight
              <input
                value={carat}
                onChange={(e) => setCarat(e.target.value)}
                inputMode="decimal"
                className="h-9 rounded-sm border border-input bg-background px-3 text-sm font-normal focus:border-ring focus:outline-none"
              />
            </label>
            <FormGrid
              fields={[
                { label: "Colour" },
                { label: "Clarity" },
                { label: "Shape" },
                { label: "Kimberley reference" },
                { label: "Received by" },
                { label: "Stone photos and 3D scan", type: "file" },
                { label: "Intake notes", type: "textarea" },
              ]}
            />
          </div>
          {hasCarat ? (
            <p
              className={`mt-4 border-l-4 p-3 text-sm ${
                individual ? "border-gold bg-gold/5" : "border-info bg-info/10"
              }`}
            >
              {individual
                ? `At ${caratValue} ct (≥ ${STONE_SIZE_THRESHOLD_CARAT} ct), this stone is processed individually — full scan, unique Stone ID, and Spacecode fingerprinting if flagged high-value.`
                : `At ${caratValue} ct (< ${STONE_SIZE_THRESHOLD_CARAT} ct), this stone does not get individual processing — register it as part of a lot instead, using the panel below.`}
            </p>
          ) : null}
          <div className="mt-5 flex flex-wrap gap-2">
            <GoldButton type="button" disabled={hasCarat ? !individual : false}>
              Register and send to valuation
            </GoldButton>
            <GhostButton type="button">Save as draft</GhostButton>
          </div>
        </Panel>

        <Panel title="Intake pipeline">
          <Timeline
            steps={[
              {
                label: "Miner has the stone",
                detail: "Found at site or held by the cooperative.",
                done: true,
              },
              {
                label: "Collection centre registration",
                detail: "Identity, origin and Kimberley reference captured.",
                done: true,
              },
              {
                label: "Platform valuation",
                detail: "Grading, provenance checks and reserve guidance.",
                done: true,
              },
              {
                label: "Details uploaded",
                detail: "Photos, 3D scan and certificate attached to the record.",
                done: false,
              },
              {
                label: "List for fixed price or auction",
                detail: "Published to inventory and the public marketplace.",
                done: false,
              },
            ]}
          />
          <div className="mt-5 flex flex-wrap gap-2">
            <Link
              to="/admin/new-auction"
              className="h-10 bg-gold px-6 text-[11px] leading-10 font-semibold tracking-[0.2em] text-gold-foreground uppercase hover:opacity-85"
            >
              Create an auction
            </Link>
            <Link
              to="/admin/inventory"
              className="h-10 border border-input px-6 text-[11px] leading-10 font-semibold tracking-[0.2em] uppercase hover:bg-accent/40"
            >
              Open inventory
            </Link>
          </div>
        </Panel>
      </div>

      <div className="mt-6">
        <Panel
          title="Register a lot"
          action={
            <span className="text-xs text-muted-foreground">
              For stones under {STONE_SIZE_THRESHOLD_CARAT} ct — grouped under a single Lot ID
            </span>
          }
        >
          <FormGrid
            fields={[
              { label: "Miner / cooperative" },
              { label: "Collection centre" },
              { label: "Lot classification" },
              { label: "Number of stones" },
              { label: "Total carat weight" },
              { label: "Origin site" },
              { label: "Kimberley reference" },
              { label: "Lot notes", type: "textarea" },
            ]}
          />
          <div className="mt-5 flex flex-wrap gap-2">
            <GoldButton type="button">Register lot and send to valuation</GoldButton>
            <GhostButton type="button">Save as draft</GhostButton>
          </div>
        </Panel>
      </div>

      <div className="mt-6">
        <Panel title="Intake queue">
          <DataTable rows={intakeQueue} />
        </Panel>
      </div>
    </>
  );
}
