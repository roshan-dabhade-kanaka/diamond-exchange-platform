import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/page-head";
import {
  DefinitionList,
  FilterBar,
  GhostButton,
  GoldButton,
  PageHeader,
  Panel,
  StatusBadge,
} from "@/components/adex/kit";
import { adminUsers, type Row } from "@/lib/adex-data";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

export const Route = createFileRoute("/admin/users")({
  head: pageHead(
    "Users & Roles | ADEX Admin",
    "Manage platform users, activate or suspend accounts and assign roles and granular permissions.",
  ),
  component: AdminUsers,
});

const roleTree = [
  "Super Admin",
  "├── Compliance Admin",
  "├── Finance Admin",
  "├── Logistics Admin",
  "└── Operations Admin",
];

const permissions = [
  "stone.view",
  "stone.create",
  "stone.update",
  "stone.scan",
  "stone.approve",
  "auction.view",
  "auction.manage",
  "kyc.review",
  "kyc.approve",
  "payment.settle",
  "config.update",
  "audit.view",
];

function AdminUsers() {
  const [rows, setRows] = useState<Row[]>(adminUsers);
  const [selected, setSelected] = useState<Row | null>(null);

  function setStatus(status: string) {
    if (!selected) return;
    setRows((prev) =>
      prev.map((r) => (r["Email"] === selected["Email"] ? { ...r, Status: status } : r)),
    );
    setSelected((prev) => (prev ? { ...prev, Status: status } : prev));
  }

  return (
    <>
      <PageHeader
        title="Users & Roles"
        description="Account administration, role assignment and permission mapping."
        actions={<GoldButton type="button">Create user</GoldButton>}
      />
      <FilterBar fields={["User", "Role", "Organization", "Status"]} />
      <div className="adex-panel overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="bg-panel text-panel-foreground">
              {Object.keys(rows[0] ?? {}).map((c) => (
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
            {rows.map((row) => (
              <tr
                key={String(row["Email"])}
                onClick={() => setSelected(row)}
                className="cursor-pointer border-t border-border hover:bg-muted/60"
              >
                {Object.entries(row).map(([key, value]) => (
                  <td key={key} className="px-4 py-3">
                    {key === "Status" ? <StatusBadge value={String(value)} /> : String(value)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Panel title="Role hierarchy">
          <pre className="bg-panel overflow-x-auto rounded-sm p-3 font-mono text-xs">
            {roleTree.join("\n")}
          </pre>
        </Panel>
        <Panel title="Permissions">
          <ul className="grid grid-cols-2 gap-2 text-xs">
            {permissions.map((p) => (
              <li key={p} className="flex items-center gap-2">
                <input type="checkbox" defaultChecked className="accent-[var(--gold)]" />
                <span className="font-mono">{p}</span>
              </li>
            ))}
          </ul>
          <GoldButton className="mt-4" type="button">
            Save permissions
          </GoldButton>
        </Panel>
      </div>

      <Sheet open={selected !== null} onOpenChange={(open) => !open && setSelected(null)}>
        <SheetContent className="w-full overflow-y-auto sm:max-w-md">
          {selected ? (
            <>
              <SheetHeader>
                <SheetTitle>{String(selected["User"])}</SheetTitle>
                <SheetDescription>{String(selected["Organization"])}</SheetDescription>
              </SheetHeader>
              <div className="space-y-6 px-4 pb-6">
                <DefinitionList
                  items={Object.entries(selected).map(([label, value]) => ({
                    label,
                    value: String(value),
                  }))}
                />
                <Panel title="Role & permissions">
                  <p className="text-sm text-muted-foreground">
                    Assigned role:{" "}
                    <span className="font-semibold text-foreground">
                      {String(selected["Role"])}
                    </span>
                  </p>
                </Panel>
                <div className="flex flex-wrap gap-2">
                  <GhostButton type="button" onClick={() => setStatus("Active")}>
                    Activate
                  </GhostButton>
                  <GhostButton type="button" onClick={() => setStatus("Suspended")}>
                    Suspend
                  </GhostButton>
                  <GhostButton type="button" onClick={() => setStatus("Deactivated")}>
                    Deactivate
                  </GhostButton>
                  <GhostButton type="button">Reset access</GhostButton>
                </div>
              </div>
            </>
          ) : null}
        </SheetContent>
      </Sheet>
    </>
  );
}
