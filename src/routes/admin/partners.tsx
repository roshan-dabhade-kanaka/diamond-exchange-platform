import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/page-head";
import { DataTable, DefinitionList, PageHeader, Panel } from "@/components/adex/kit";
import { partners } from "@/lib/adex-data";

export const Route = createFileRoute("/admin/partners")({
  head: pageHead(
    "FOMIN & Partners | ADEX Admin",
    "Partner records, funding facilities, exposure and settlement history for FOMIN and operational partners.",
  ),
  component: AdminPartners,
});

function AdminPartners() {
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
              { label: "Drawn", value: "$2.10M" },
              { label: "Available", value: "$2.90M" },
              { label: "Settlement cycle", value: "Monthly, 5th working day" },
            ]}
          />
        </Panel>
        <Panel title="Settlement history">
          <DataTable
            dense
            rows={[
              { Settlement: "SET-1142", Partner: "FOMIN Facility A", Amount: "$412,900", Date: "05 Aug 2026", Status: "Completed" },
              { Settlement: "SET-1128", Partner: "Brinks Global", Amount: "$18,440", Date: "05 Aug 2026", Status: "Completed" },
              { Settlement: "SET-1119", Partner: "Antwerp Cutting House", Amount: "$96,200", Date: "01 Aug 2026", Status: "Pending" },
            ]}
          />
        </Panel>
      </div>
    </>
  );
}
