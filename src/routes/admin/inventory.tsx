import { createFileRoute, Link } from "@tanstack/react-router";
import { pageHead } from "@/lib/page-head";
import {
  DataTable,
  DefinitionList,
  GhostButton,
  GoldButton,
  KpiGrid,
  PageHeader,
  Panel,
} from "@/components/adex/kit";
import { StoneThumb } from "@/components/adex/stone-gallery";
import type { Row } from "@/lib/adex-data";

export const Route = createFileRoute("/admin/inventory")({
  head: pageHead(
    "Inventory & Cutting Decisions | ADEX Admin",
    "Monitor stones and sales across the inventory, decide what to cut, relist or hold, and keep the marketplace stocked.",
  ),
  component: AdminInventory,
});

const inventory: Row[] = [
  {
    Stone: "ADX-S-04431",
    Type: "Rough",
    Carat: "6.84",
    "Days held": "12",
    Valuation: "$212,000",
    Status: "Listed",
  },
  {
    Stone: "ADX-S-04421",
    Type: "Rough",
    Carat: "9.10",
    "Days held": "64",
    Valuation: "$318,500",
    Status: "Pending",
  },
  {
    Stone: "ADX-S-04399",
    Type: "Polished",
    Carat: "2.04",
    "Days held": "8",
    Valuation: "$44,900",
    Status: "Sold",
  },
  {
    Stone: "ADX-L-0318",
    Type: "Rough",
    Carat: "11.40",
    "Days held": "91",
    Valuation: "$488,000",
    Status: "Unsold",
  },
];

const cutting: Row[] = [
  {
    Stone: "ADX-S-04421",
    "Rough value": "$318,500",
    "Projected polished": "$402,000",
    Cutter: "Antwerp Cut House",
    Decision: "Pending",
  },
  {
    Stone: "ADX-L-0318",
    "Rough value": "$488,000",
    "Projected polished": "$505,000",
    Cutter: "Surat Atelier 4",
    Decision: "Review",
  },
];

function AdminInventory() {
  return (
    <>
      <PageHeader
        title="Inventory & sales"
        description="Stones that have been sitting too long get a decision: relist lower in the queue, move to a showroom auction, or send for cutting."
        actions={
          <Link
            to="/admin/intake"
            className="h-10 border border-input px-6 text-[11px] leading-10 font-semibold tracking-[0.2em] uppercase hover:bg-accent/40"
          >
            Register a stone
          </Link>
        }
      />

      <KpiGrid
        items={[
          { label: "Stones in inventory", value: "418" },
          { label: "Listed now", value: "162" },
          { label: "Unsold over 60 days", value: "27" },
          { label: "Sold this month", value: "$2.41M" },
        ]}
      />

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <Panel title="Existing stones and sales">
          <DataTable rows={inventory} />
        </Panel>

        <Panel title="Unsold — needs a decision">
          <StoneThumb stoneId="ADX-L-0318" className="mb-4 aspect-[4/3] w-full" />
          <DefinitionList
            items={[
              { label: "Stone", value: "ADX-L-0318 · 11.40 ct" },
              { label: "Rounds run", value: "3 auctions, no reserve met" },
              { label: "Days held", value: "91" },
              { label: "Carrying cost", value: "$4,100" },
            ]}
          />
          <div className="mt-5 flex flex-wrap gap-2">
            <GoldButton>Send for cutting</GoldButton>
            <GhostButton>Relist lower</GhostButton>
            <GhostButton>Hold</GhostButton>
          </div>
        </Panel>
      </div>

      <div className="mt-6">
        <Panel title="Cutting decisions">
          <DataTable rows={cutting} />
        </Panel>
      </div>
    </>
  );
}
