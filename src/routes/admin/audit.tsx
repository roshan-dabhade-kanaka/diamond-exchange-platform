import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/page-head";
import {
  DefinitionList,
  FilterBar,
  GhostButton,
  PageHeader,
  Panel,
  StatusBadge,
} from "@/components/adex/kit";
import { auditLogs, type Row } from "@/lib/adex-data";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

export const Route = createFileRoute("/admin/audit")({
  head: pageHead(
    "Audit Logs | ADEX Admin",
    "Admin-only audit trail across authentication, KYC, stones, auctions, settlement, certification and configuration changes.",
  ),
  component: AdminAudit,
});

const domains = [
  "Authentication",
  "User & role changes",
  "KYC / AML decisions",
  "Stone lifecycle",
  "Valuation & pricing",
  "Auction & bidding",
  "Orders & settlement",
  "Certification",
  "Shipments & returns",
  "Configuration changes",
];

function AdminAudit() {
  const [selected, setSelected] = useState<Row | null>(null);

  return (
    <>
      <PageHeader
        title="Audit"
        description="Immutable record of every privileged action on the platform."
        actions={<GhostButton type="button">Export log</GhostButton>}
      />
      <FilterBar fields={["Actor", "Action", "Entity", "Date"]} />
      <div className="adex-panel overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="bg-panel text-panel-foreground">
              {Object.keys(auditLogs[0] ?? {}).map((c) => (
                <th
                  key={c}
                  className="px-4 py-3 text-[10px] font-semibold tracking-[0.2em] uppercase"
                >
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {auditLogs.map((row, i) => (
              <tr
                key={i}
                onClick={() => setSelected(row)}
                className="cursor-pointer border-t border-border hover:bg-muted/60"
              >
                {Object.entries(row).map(([key, value]) => (
                  <td key={key} className="px-4 py-3">
                    {key === "Result" ? <StatusBadge value={String(value)} /> : String(value)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Panel title="Audited domains" className="mt-6">
        <ul className="grid grid-cols-2 gap-2 text-sm sm:grid-cols-3">
          {domains.map((d) => (
            <li key={d} className="bg-panel rounded-sm px-3 py-2">
              {d}
            </li>
          ))}
        </ul>
      </Panel>

      <Sheet open={selected !== null} onOpenChange={(open) => !open && setSelected(null)}>
        <SheetContent className="w-full overflow-y-auto sm:max-w-md">
          {selected ? (
            <>
              <SheetHeader>
                <SheetTitle>{String(selected["Action"])}</SheetTitle>
                <SheetDescription>{String(selected["Timestamp"])}</SheetDescription>
              </SheetHeader>
              <div className="space-y-6 px-4 pb-6">
                <DefinitionList
                  items={Object.entries(selected).map(([label, value]) => ({
                    label,
                    value: String(value),
                  }))}
                />
                <Panel title="Change detail">
                  <p className="text-sm text-muted-foreground">
                    Full before/after field diff is captured for this entry but is not rendered in
                    Phase 1 — the mock audit service records the action, actor and entity only.
                  </p>
                </Panel>
              </div>
            </>
          ) : null}
        </SheetContent>
      </Sheet>
    </>
  );
}
