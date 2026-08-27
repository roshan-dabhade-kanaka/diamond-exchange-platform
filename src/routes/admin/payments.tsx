import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { pageHead } from "@/lib/page-head";
import { DataTable, GoldButton, KpiGrid, PageHeader, Panel, Timeline } from "@/components/adex/kit";
import { EscrowStatusBadge, SettlementSplitBar } from "@/components/adex/settlement-split";
import { formatUsd, settlementSplit } from "@/lib/rules";
import { settlements, type Row } from "@/lib/adex-data";

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

function AdminPayments() {
  const [rows, setRows] = useState(settlements);

  const escrowHeldTotal = rows
    .filter((s) => s.escrowStatus === "HELD")
    .reduce((sum, s) => sum + s.totalAmount, 0);
  const distributedTotal = rows
    .filter((s) => s.escrowStatus === "DISTRIBUTED")
    .reduce((sum, s) => sum + s.totalAmount, 0);
  const minerShareTotal = rows.reduce((sum, s) => sum + settlementSplit(s.totalAmount).miner, 0);

  function releasePayout(batch: string) {
    setRows((prev) => prev.map((s) => (s.batch === batch ? { ...s, escrowStatus: "DISTRIBUTED" } : s)));
  }

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
          { label: "Escrow held", value: formatUsd(escrowHeldTotal) },
          { label: "Distributed", value: formatUsd(distributedTotal) },
          { label: "Miner share total", value: formatUsd(minerShareTotal) },
        ]}
      />

      <div className="mt-6 space-y-6">
        <Panel
          title="Confirming buyer payment"
          action={<GoldButton className="h-8 px-4">Confirm selected</GoldButton>}
        >
          <DataTable rows={incoming} />
        </Panel>

        <Panel title="Settling seller payment — Ops / Miner / Partner split">
          <div className="space-y-4">
            {rows.map((s) => (
              <div key={s.batch} className="border border-border p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold">
                      {s.batch} — {s.seller}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {s.stones} stone{s.stones > 1 ? "s" : ""} · {formatUsd(s.totalAmount)} total
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <EscrowStatusBadge status={s.escrowStatus} />
                    {s.escrowStatus === "HELD" ? (
                      <GoldButton
                        className="h-8 px-4"
                        type="button"
                        onClick={() => releasePayout(s.batch)}
                      >
                        Release payout
                      </GoldButton>
                    ) : null}
                  </div>
                </div>
                <SettlementSplitBar total={s.totalAmount} className="mt-4" />
              </div>
            ))}
          </div>
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
