import { createFileRoute, Link } from "@tanstack/react-router";
import { pageHead } from "@/lib/page-head";
import {
  DataTable,
  FormGrid,
  GhostButton,
  GoldButton,
  PageHeader,
  Panel,
  Timeline,
} from "@/components/adex/kit";
import type { Row } from "@/lib/adex-data";

export const Route = createFileRoute("/admin/register-user")({
  head: pageHead(
    "Register a User | ADEX Admin",
    "Create buyer, seller or partner accounts on behalf of the desk, assign roles and start the KYC review.",
  ),
  component: RegisterUserPage,
});

const recent: Row[] = [
  {
    User: "Vermeulen Gems",
    Role: "Buyer",
    Market: "Antwerp",
    Created: "26 Aug 2026",
    Status: "Pending",
  },
  {
    User: "Kasai Cooperative 12",
    Role: "Seller",
    Market: "Kinshasa",
    Created: "24 Aug 2026",
    Status: "Approved",
  },
  {
    User: "Surat Atelier 4",
    Role: "Partner",
    Market: "Surat",
    Created: "21 Aug 2026",
    Status: "Approved",
  },
];

function RegisterUserPage() {
  return (
    <>
      <PageHeader
        title="Register a user"
        description="Desk-created accounts follow the same route as self sign-up: create the account, assign a role, then send the KYC file for review."
        actions={
          <Link
            to="/admin/users"
            className="h-10 border border-input px-6 text-[11px] leading-10 font-semibold tracking-[0.2em] uppercase hover:bg-accent/40"
          >
            All users
          </Link>
        }
      />

      <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <Panel title="Account details">
          <FormGrid
            fields={[
              { label: "Legal entity name" },
              { label: "Trading name" },
              { label: "Primary contact" },
              { label: "Email", type: "email" },
              { label: "Phone", type: "tel" },
              { label: "Country" },
              { label: "Role" },
              { label: "Market / desk" },
              { label: "Registration documents", type: "file" },
              { label: "Internal notes", type: "textarea" },
            ]}
          />
          <div className="mt-5 flex flex-wrap gap-2">
            <GoldButton>Create and send invite</GoldButton>
            <GhostButton>Save draft</GhostButton>
          </div>
        </Panel>

        <Panel title="Onboarding path">
          <Timeline
            steps={[
              { label: "Account created", detail: "Invite email with a set-password link.", done: true },
              { label: "Role assigned", detail: "Buyer, seller, partner or internal.", done: true },
              {
                label: "KYC documents uploaded",
                detail: "Identity, entity and source-of-funds evidence.",
                done: false,
              },
              {
                label: "Review and approve",
                detail: "Compliance approves or rejects the file.",
                done: false,
              },
              {
                label: "Trading enabled",
                detail: "Bidding and polished purchases unlocked.",
                done: false,
              },
            ]}
          />
          <Link to="/admin/kyc" className="adex-link mt-4 inline-block text-sm">
            Open the KYC review queue
          </Link>
        </Panel>
      </div>

      <div className="mt-6">
        <Panel title="Recently registered">
          <DataTable rows={recent} />
        </Panel>
      </div>
    </>
  );
}
