import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/page-head";
import {
  DataTable,
  DefinitionList,
  GhostButton,
  GoldButton,
  PageHeader,
  Panel,
} from "@/components/adex/kit";

export const Route = createFileRoute("/admin/profile")({
  head: pageHead(
    "Admin Profile | ADEX Admin",
    "Manage your admin account details, assigned role and notification preferences.",
  ),
  component: AdminProfile,
});

function AdminProfile() {
  return (
    <>
      <PageHeader
        title="Profile"
        description="Your account, assigned role and notification preferences."
        actions={
          <>
            <GhostButton type="button">Edit</GhostButton>
            <GoldButton type="button">Save changes</GoldButton>
          </>
        }
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <Panel title="Account details">
          <DefinitionList
            items={[
              { label: "Name", value: "R. Mehta" },
              { label: "Email", value: "rahul@adex.io" },
              { label: "Role", value: "Compliance Admin" },
              { label: "Organization", value: "ADEX" },
            ]}
          />
        </Panel>
        <Panel title="Security">
          <DefinitionList
            items={[
              { label: "Two-factor authentication", value: "Enabled" },
              { label: "Last sign-in", value: "Today, 09:12" },
              { label: "Session policy", value: "Auto sign-out after 30 minutes idle" },
            ]}
          />
          <GhostButton type="button" className="mt-4">
            Reset MFA device
          </GhostButton>
        </Panel>
        <Panel title="Recent activity" className="lg:col-span-2">
          <DataTable
            dense
            rows={[
              { Action: "kyc.approve", Entity: "KYC-9008", Timestamp: "19 Aug 2026 09:41" },
              {
                Action: "user.suspend",
                Entity: "fatou@konocoop.sl",
                Timestamp: "18 Aug 2026 17:55",
              },
            ]}
          />
        </Panel>
        <Panel title="Notification preferences" className="lg:col-span-2">
          <DefinitionList
            items={[
              { label: "Compliance escalations", value: "Email and in-app" },
              { label: "Payout batches ready", value: "In-app" },
              { label: "Auction closing alerts", value: "Email" },
            ]}
          />
        </Panel>
      </div>
    </>
  );
}
