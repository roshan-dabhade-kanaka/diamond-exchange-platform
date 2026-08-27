import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/page-head";
import { DataTable, DefinitionList, PageHeader, Panel, StatusBadge } from "@/components/adex/kit";
import { partners, settlements } from "@/lib/adex-data";
import { formatUsd, settlementSplit } from "@/lib/rules";

export const Route = createFileRoute("/admin/partners")({
  head: pageHead(
    "FOMIN & Partners | ADEX Admin",
    "Partner records, funding facilities, exposure and settlement history for FOMIN and operational partners.",
  ),
  component: AdminPartners,
});

function AdminPartners() {
  const fominShareTotal = settlements.reduce((sum, s) => sum + settlementSplit(s.totalAmount).partner, 0);
  const fominShareDrawn = settlements
    .filter((s) => s.escrowStatus === "DISTRIBUTED")
    .reduce((sum, s) => sum + settlementSplit(s.totalAmount).partner, 0);

  return (
    <>
      <PageHeader
        title="FOMIN / Partners"
        description="Funding facilities, processing houses and logistics partners."
      />
      <DataTable rows={partners} />

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Panel title="Funding — FOMIN Facility A">
          <DefinitionList
            items={[
              { label: "Facility size", value: "$5.00M" },
              { label: "Partner share, all settlements (10%)", value: formatUsd(fominShareTotal) },
              { label: "Distributed to date", value: formatUsd(fominShareDrawn) },
              { label: "Settlement cycle", value: "Monthly, 5th working day" },
            ]}
          />
        </Panel>
        <Panel title="Settlement history — FOMIN share">
          <div className="space-y-3">
            {settlements.map((s) => {
              const { partner } = settlementSplit(s.totalAmount);
              return (
                <div
                  key={s.batch}
                  className="flex items-center justify-between border-b border-border pb-3 text-sm last:border-0 last:pb-0"
                >
                  <div>
                    <p className="font-semibold">
                      {s.batch} — {s.seller}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatUsd(s.totalAmount)} total · FOMIN share {formatUsd(partner)}
                    </p>
                  </div>
                  <StatusBadge value={s.escrowStatus === "DISTRIBUTED" ? "Completed" : "Pending"} />
                </div>
              );
            })}
          </div>
        </Panel>
      </div>
    </>
  );
}
