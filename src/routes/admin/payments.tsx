import { createFileRoute, Link } from "@tanstack/react-router";
import { pageHead } from "@/lib/page-head";
import {
  DataTable,
  GhostButton,
  GoldButton,
  KpiGrid,
  PageHeader,
  Panel,
  Timeline,
} from "@/components/adex/kit";
import type { Row } from "@/lib/adex-data";

export const Route = createFileRoute("/admin/payments")({
  head: pageHead(
    "Payments & Settlement | ADEX Admin",
    "Confirm incoming buyer payments, settle seller payouts and release stones to delivery once escrow clears.",
  ),
  component: AdminPayments,
});

const incoming: Row[] = [
  {
    Invoice: "INV-20411",
    Buyer: "Vermeulen Gems",
    Stone: "ADX-S-04412",
    Amount: "$189,220",
    Method: "Wire",
    Status: "Pending",
  },
  {
    Invoice: "INV-20408",
    Buyer: "Sharma Diamonds",
    Stone: "ADX-S-04390",
    Amount: "$74,600",
    Method: "Card",
    Status: "Completed",
  },
  {
    Invoice: "INV-20402",
    Buyer: "Antwerp Cut House",
    Stone: "ADX-L-0288",
    Amount: "$412,900",
    Method: "Wire",
    Status: "Overdue",
  },
];

const payouts: Row[] = [
  {
    Batch: "PAY-4471",
    Seller: "Kasai Cooperative 12",
    Stones: "3",
    Amount: "$164,300",
    Status: "Pending",
  },
  {
    Batch: "PAY-4468",
    Seller: "Tshikapa Group",
    Stones: "1",
    Amount: "$388,000",
    Status: "Approved",
  },
  {
    Batch: "PAY-4460",
    Seller: "Mbuji-Mayi Artisanal",
    Stones: "2",
    Amount: "$61,750",
    Status: "Completed",
  },
];

function AdminPayments() {
  return (
    <>
      <PageHeader
        title="Payments"
        description="Buyer funds in, seller payouts out. A stone only moves to delivery once its payment is confirmed."
        actions={
          <Link
            to="/admin/logistics"
            className="h-10 border border-input px-6 text-[11px] leading-10 font-semibold tracking-[0.2em] uppercase hover:bg-accent/40"
          >
            Logistics
          </Link>
        }
      />

      <KpiGrid
        items={[
          { label: "Awaiting confirmation", value: "$601,120" },
          { label: "Overdue", value: "1" },
          { label: "Payouts pending", value: "$164,300" },
          { label: "Settled this month", value: "$2.41M" },
        ]}
      />

      <div className="mt-6 space-y-6">
        <Panel
          title="Confirming buyer payment"
          action={<GoldButton className="h-8 px-4">Confirm selected</GoldButton>}
        >
          <DataTable rows={incoming} />
        </Panel>

        <Panel
          title="Settling seller payment"
          action={<GhostButton className="h-8 px-4">Approve batch</GhostButton>}
        >
          <DataTable rows={payouts} />
        </Panel>

        <Panel title="Settlement flow">
          <Timeline
            steps={[
              { label: "Buyer pays", detail: "Wire or card into the escrow account.", done: true },
              {
                label: "Payment confirmed",
                detail: "Compliance marks the invoice as cleared.",
                done: true,
              },
              {
                label: "Initiate delivery",
                detail: "Logistics books insured carriage and issues tracking.",
                done: false,
              },
              {
                label: "Settle seller",
                detail: "Payout batch approved after delivery confirmation.",
                done: false,
              },
            ]}
          />
        </Panel>
      </div>
    </>
  );
}
