import { createFileRoute, Link } from "@tanstack/react-router";
import { pageHead } from "@/lib/page-head";
import {
  DataTable,
  DefinitionList,
  FormGrid,
  GhostButton,
  GoldButton,
  PageHeader,
  Panel,
  Timeline,
} from "@/components/adex/kit";
import type { Row } from "@/lib/adex-data";

export const Route = createFileRoute("/admin/new-auction")({
  head: pageHead(
    "Create an Auction | ADEX Admin",
    "Open a new bidding cycle: assign valued stones, set start and end times, reserve and maximum prices, then start or close the round.",
  ),
  component: NewAuctionPage,
});

const candidates: Row[] = [
  {
    Stone: "ADX-S-04431",
    Carat: "6.84",
    Valuation: "$212,000",
    "Reserve guidance": "$180,000",
    Status: "Ready",
  },
  {
    Stone: "ADX-S-04429",
    Carat: "3.62",
    Valuation: "$96,400",
    "Reserve guidance": "$81,000",
    Status: "Ready",
  },
  {
    Stone: "ADX-L-0318",
    Carat: "11.40",
    Valuation: "$488,000",
    "Reserve guidance": "$410,000",
    Status: "Pending",
  },
];

function NewAuctionPage() {
  return (
    <>
      <PageHeader
        title="Create a new bidding round"
        description="Valued stones flow straight into a bidding round. Set the window and price floor, publish, and monitor the round from auction management."
        actions={
          <Link
            to="/admin/auctions"
            className="h-10 border border-input px-6 text-[11px] leading-10 font-semibold tracking-[0.2em] uppercase hover:bg-accent/40"
          >
            All auctions
          </Link>
        }
      />

      <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-6">
          <Panel title="Round setup">
            <FormGrid
              fields={[
                { label: "Auction name" },
                { label: "Auction type" },
                { label: "Start date", type: "date" },
                { label: "Start time", type: "time" },
                { label: "End date", type: "date" },
                { label: "End time", type: "time" },
                { label: "Minimum reserve price" },
                { label: "Maximum price cap" },
                { label: "Bid increment" },
                { label: "Payment lock window (hours)" },
                { label: "Showroom preview" },
                { label: "Visible to" },
                { label: "Terms and notes", type: "textarea" },
              ]}
            />
            <div className="mt-5 flex flex-wrap gap-2">
              <GoldButton>Publish and start</GoldButton>
              <GhostButton>Schedule for later</GhostButton>
              <GhostButton>Save draft</GhostButton>
            </div>
          </Panel>

          <Panel title="Assign stones">
            <DataTable rows={candidates} />
            <p className="mt-3 text-xs text-muted-foreground">
              Stones above three carats are also scheduled for showroom preview before the round
              opens.
            </p>
          </Panel>
        </div>

        <div className="space-y-6">
          <Panel title="Round lifecycle">
            <Timeline
              steps={[
                { label: "Valuation complete", detail: "Reserve guidance issued.", done: true },
                { label: "Create round", detail: "Window, reserve and cap defined.", done: true },
                { label: "Start", detail: "Bidding opens, buyers notified.", done: false },
                { label: "End", detail: "Highest valid bid wins the stone.", done: false },
                {
                  label: "Winner confirmation",
                  detail: "Payment lock starts; runner-up held in reserve.",
                  done: false,
                },
              ]}
            />
          </Panel>

          <Panel title="Default rules">
            <DefinitionList
              items={[
                { label: "Payment lock", value: "48 hours from award" },
                { label: "If unpaid", value: "Released to winner two" },
                { label: "Bidder penalty", value: "12 month bidding suspension" },
                { label: "If unsold", value: "Relisted lower in the queue" },
                { label: "Overbid alert", value: "Push and email notification" },
                { label: "KYC", value: "Mandatory before bidding" },
              ]}
            />
          </Panel>
        </div>
      </div>
    </>
  );
}
