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

export const Route = createFileRoute("/buyer/profile")({
  head: pageHead(
    "Buyer Profile | ADEX Buyer Portal",
    "Manage company profile, authorised users, bidding preferences and notification settings.",
  ),
  component: BuyerProfile,
});

function BuyerProfile() {
  return (
    <>
      <PageHeader
        title="Profile"
        description="Company identity, users and trading preferences."
        actions={
          <>
            <GhostButton>Edit</GhostButton>
            <GoldButton>Save changes</GoldButton>
          </>
        }
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <Panel title="Personal details">
          <DefinitionList
            items={[
              { label: "Name", value: "Marc Vermeulen" },
              { label: "Email", value: "marc@vermeulen-gems.be" },
              { label: "Phone", value: "+32 3 226 4471" },
              { label: "Role", value: "Account owner" },
            ]}
          />
        </Panel>
        <Panel title="Organization">
          <DefinitionList
            items={[
              { label: "Company", value: "Vermeulen Gems NV" },
              { label: "Registration", value: "BE 0441.220.881" },
              { label: "Country", value: "Belgium" },
              { label: "Address", value: "Hoveniersstraat 22, Antwerp" },
            ]}
          />
        </Panel>
        <Panel title="Users" className="lg:col-span-2">
          <DataTable
            dense
            rows={[
              {
                User: "Marc Vermeulen",
                Email: "marc@vermeulen-gems.be",
                Role: "Owner",
                Status: "Active",
              },
              {
                User: "Ilse Boone",
                Email: "ilse@vermeulen-gems.be",
                Role: "Bidder",
                Status: "Active",
              },
              {
                User: "Tom Aerts",
                Email: "tom@vermeulen-gems.be",
                Role: "Finance",
                Status: "Pending",
              },
            ]}
          />
        </Panel>
        <Panel title="Preferences" className="lg:col-span-2">
          <DefinitionList
            items={[
              { label: "Preferred categories", value: "Rough diamonds, parcels" },
              { label: "Carat interest", value: "5.00 – 25.00 ct" },
              { label: "Auction reminders", value: "1 hour before close" },
              { label: "Notification channel", value: "Email and in-app" },
            ]}
          />
        </Panel>
      </div>
    </>
  );
}
