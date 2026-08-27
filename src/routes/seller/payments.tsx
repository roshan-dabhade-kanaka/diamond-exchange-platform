import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/page-head";
import {
  DataTable,
  DefinitionList,
  FilterBar,
  GhostButton,
  KpiGrid,
  PageHeader,
  Panel,
} from "@/components/adex/kit";
import { payments } from "@/lib/adex-data";

export const Route = createFileRoute("/seller/payments")({
  head: pageHead(
    "Payments & Statements | ADEX Seller Portal",
    "Track regulated base payments, market-price shares, bonus adjustments and period statements for your sales.",
  ),
  component: SellerPayments,
});

function SellerPayments() {
  return (
    <>
      <PageHeader
        title="Payments"
        description="Settlement of sale proceeds, contractual distributions and statements."
        actions={<GhostButton>Download statement</GhostButton>}
      />
      <KpiGrid
        items={[
          { label: "Pending payments", value: "$412,900" },
          { label: "Completed (YTD)", value: "$5.18M" },
          { label: "Base payments", value: "$1.92M" },
          { label: "Bonus adjustments", value: "$204K" },
        ]}
      />
      <div className="mt-6">
        <FilterBar fields={["Payment ID", "Type", "Status", "Period"]} />
        <DataTable rows={payments} linkBase="seller" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Panel title="Statement — August 2026">
          <DefinitionList
            items={[
              { label: "Period", value: "01 – 31 Aug 2026" },
              { label: "Opening balance", value: "$96,400" },
              { label: "Transactions", value: "14" },
              { label: "Payments", value: "$256,750" },
              { label: "Adjustments", value: "$9,850" },
              { label: "Closing balance", value: "$412,900" },
            ]}
          />
        </Panel>
        <Panel title="Payment composition">
          <DataTable
            dense
            rows={[
              { Component: "Government-regulated base payment", Amount: "$62,400", Share: "34%" },
              { Component: "Final market-price share", Amount: "$110,300", Share: "60%" },
              { Component: "Bonus / adjustment", Amount: "$9,850", Share: "5%" },
              { Component: "Other contractual distribution", Amount: "$1,950", Share: "1%" },
            ]}
          />
        </Panel>
      </div>
    </>
  );
}
