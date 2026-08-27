import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/page-head";
import {
  DataTable,
  FilterBar,
  GhostButton,
  GoldButton,
  PageHeader,
  Panel,
} from "@/components/adex/kit";
import { adminUsers } from "@/lib/adex-data";

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
  return (
    <>
      <PageHeader
        title="Users & Roles"
        description="Account administration, role assignment and permission mapping."
        actions={<GoldButton>Create user</GoldButton>}
      />
      <FilterBar fields={["User", "Role", "Organization", "Status"]} />
      <DataTable rows={adminUsers} />

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Panel title="Role hierarchy">
          <pre className="bg-panel overflow-x-auto rounded-sm p-3 font-mono text-xs">
            {roleTree.join("\n")}
          </pre>
          <div className="mt-4 flex flex-wrap gap-2">
            <GhostButton>Activate</GhostButton>
            <GhostButton>Deactivate</GhostButton>
            <GhostButton>Suspend</GhostButton>
            <GhostButton>Reset access</GhostButton>
          </div>
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
          <GoldButton className="mt-4">Save permissions</GoldButton>
        </Panel>
      </div>
    </>
  );
}
