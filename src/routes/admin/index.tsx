import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { pageHead } from "@/lib/page-head";
import { DataTable, KpiGrid, PageHeader, Panel } from "@/components/adex/kit";
import { SettlementSplitBar } from "@/components/adex/settlement-split";
import { adminStones, auditLogs, kycCases, settlements } from "@/lib/adex-data";
import { formatUsd, settlementSplit } from "@/lib/rules";

export const Route = createFileRoute("/admin/")({
  head: pageHead(
    "Admin Dashboard | ADEX",
    "Operational overview of users, stones, auctions, compliance queues and revenue across the ADEX platform.",
  ),
  component: AdminDashboard,
});

const rangePresets = [
  { label: "7 days", days: 7 },
  { label: "15 days", days: 15 },
  { label: "40 days", days: 40 },
];

function AdminDashboard() {
  const [rangeDays, setRangeDays] = useState(15);
  const [customFrom, setCustomFrom] = useState("");

  const soldInRange = useMemo(() => {
    const cutoff = customFrom
      ? new Date(customFrom)
      : new Date(Date.now() - rangeDays * 24 * 60 * 60 * 1000);
    return settlements.filter((s) => new Date(s.soldAt) >= cutoff);
  }, [rangeDays, customFrom]);

  const grossValue = soldInRange.reduce((sum, s) => sum + s.totalAmount, 0);
  const awaitingPayout = soldInRange.filter((s) => s.escrowStatus === "HELD").length;
  const avgLotValue = soldInRange.length > 0 ? Math.round(grossValue / soldInRange.length) : 0;

  const pendingCompliance = kycCases.filter(
    (c) => c["Status"] === "Under Review" || c["Status"] === "Escalated",
  );
  const escrowHeld = settlements.filter((s) => s.escrowStatus === "HELD");
  const actionItems = [
    ...pendingCompliance.map((c) => ({
      label: `Compliance case ${c["Case ID"]} — ${c["Applicant"]}`,
      detail: String(c["Status"]),
      href: "/admin/kyc" as const,
    })),
    ...escrowHeld.map((s) => ({
      label: `Escrow held — ${s.batch} (${s.seller})`,
      detail: formatUsd(s.totalAmount),
      href: "/admin/payments" as const,
    })),
  ];

  const buyers = 612;
  const sellers = 248;
  const activeStones = adminStones.filter((s) => s["Status"] !== "Sold").length;
  const kycPending = kycCases.filter((c) => c["Status"] === "Under Review").length;
  const amlCases = kycCases.filter((c) => c["Status"] === "Escalated").length;

  return (
    <>
      <PageHeader
        title="Admin Dashboard"
        description="Platform-wide operations, compliance and commercial performance."
      />
      <KpiGrid
        items={[
          { label: "Buyers", value: String(buyers) },
          { label: "Sellers", value: String(sellers) },
          { label: "Active Stones", value: String(activeStones) },
          { label: "KYC Pending", value: String(kycPending) },
          { label: "AML Cases", value: String(amlCases) },
          {
            label: "Escrow Held",
            value: formatUsd(escrowHeld.reduce((s, x) => s + x.totalAmount, 0)),
          },
        ]}
      />

      {actionItems.length > 0 ? (
        <Panel title="Action required" className="mt-6">
          <ul className="space-y-2 text-sm">
            {actionItems.map((item) => (
              <li
                key={item.label}
                className="flex items-center justify-between border-b border-border pb-2 last:border-0"
              >
                <div>
                  <p className="font-semibold">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.detail}</p>
                </div>
                <Link to={item.href} className="adex-link text-xs">
                  Review →
                </Link>
              </li>
            ))}
          </ul>
        </Panel>
      ) : null}

      <Panel title="Recent sells" className="mt-6">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          {rangePresets.map((p) => (
            <button
              key={p.days}
              type="button"
              onClick={() => {
                setRangeDays(p.days);
                setCustomFrom("");
              }}
              className={`h-8 rounded-full border px-3 text-xs font-semibold ${
                !customFrom && rangeDays === p.days
                  ? "border-gold bg-gold/10"
                  : "border-input hover:bg-muted"
              }`}
            >
              {p.label}
            </button>
          ))}
          <label className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
            From
            <input
              type="date"
              value={customFrom}
              onChange={(e) => setCustomFrom(e.target.value)}
              className="h-8 rounded-sm border border-input bg-background px-2 text-xs font-normal focus:border-ring focus:outline-none"
            />
          </label>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div className="adex-panel px-4 py-3">
            <p className="adex-eyebrow">Gross value</p>
            <p className="font-display mt-2 text-xl">{formatUsd(grossValue)}</p>
          </div>
          <div className="adex-panel px-4 py-3">
            <p className="adex-eyebrow">Awaiting payout</p>
            <p className="font-display mt-2 text-xl">{awaitingPayout}</p>
          </div>
          <div className="adex-panel px-4 py-3">
            <p className="adex-eyebrow">Avg. lot value</p>
            <p className="font-display mt-2 text-xl">{formatUsd(avgLotValue)}</p>
          </div>
        </div>
      </Panel>

      <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
        <div className="min-w-0 space-y-6">
          <Panel
            title="Compliance queue"
            action={
              <Link to="/admin/kyc" className="adex-link text-sm">
                Open queue
              </Link>
            }
          >
            <DataTable
              rows={kycCases}
              only={["Case ID", "Applicant", "Risk Level", "Status"]}
              dense
            />
          </Panel>
          <Panel
            title="Stones in processing"
            action={
              <Link to="/admin/stones" className="adex-link text-sm">
                View all
              </Link>
            }
          >
            <DataTable rows={adminStones} only={["Stone ID", "Seller", "Carat", "Status"]} dense />
          </Panel>
          <Panel
            title="Recent settlement"
            action={
              <Link to="/admin/payments" className="adex-link text-sm">
                Open settlement
              </Link>
            }
          >
            <div className="space-y-4">
              {settlements.slice(0, 3).map((s) => {
                const { ops, miner, partner } = settlementSplit(s.totalAmount);
                return (
                  <div
                    key={s.batch}
                    className="border-b border-border pb-4 last:border-0 last:pb-0"
                  >
                    <p className="text-sm font-semibold">
                      {s.batch} — {s.seller} · {formatUsd(s.totalAmount)}
                    </p>
                    <SettlementSplitBar total={s.totalAmount} className="mt-2" />
                    <p className="sr-only">
                      Ops {formatUsd(ops)}, Miner {formatUsd(miner)}, Partner {formatUsd(partner)}
                    </p>
                  </div>
                );
              })}
            </div>
          </Panel>
        </div>

        <div className="min-w-0 space-y-6">
          <Panel
            title="Recent audit activity"
            action={
              <Link to="/admin/audit" className="adex-link text-sm">
                Audit log
              </Link>
            }
          >
            <ul className="space-y-2 text-xs">
              {auditLogs.slice(0, 4).map((a) => (
                <li
                  key={String(a["Timestamp"])}
                  className="border-b border-border pb-2 last:border-0"
                >
                  <p className="font-semibold">{String(a["Action"])}</p>
                  <p className="text-muted-foreground">
                    {String(a["Actor"])} · {String(a["Entity"])} · {String(a["Timestamp"])}
                  </p>
                </li>
              ))}
            </ul>
          </Panel>
        </div>
      </div>
    </>
  );
}
