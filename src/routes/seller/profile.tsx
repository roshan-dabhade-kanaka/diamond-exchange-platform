import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/page-head";
import {
  DefinitionList,
  GhostButton,
  GoldButton,
  PageHeader,
  Panel,
  StatusBadge,
} from "@/components/adex/kit";

export const Route = createFileRoute("/seller/profile")({
  head: pageHead(
    "Miner Profile | ADEX Seller Portal",
    "Manage organization details, mine and source information, contact data, banking details and compliance documents.",
  ),
  component: SellerProfile,
});

function SellerProfile() {
  return (
    <>
      <PageHeader
        title="Miner Profile"
        description="Sensitive changes to banking or source details trigger re-verification."
        actions={
          <>
            <GhostButton>Edit profile</GhostButton>
            <GoldButton>Save changes</GoldButton>
          </>
        }
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <Panel title="Organization details">
          <DefinitionList
            items={[
              { label: "Legal name", value: "Kasai Mining SARL" },
              { label: "Seller type", value: "Miner — Organization" },
              { label: "Government registration", value: "CD-RCCM-778104" },
              { label: "Country", value: "Democratic Republic of the Congo" },
              { label: "Registered address", value: "12 Avenue Lumumba, Mbuji-Mayi" },
              { label: "Account state", value: "Active" },
            ]}
          />
        </Panel>

        <Panel title="Mine / source details">
          <DefinitionList
            items={[
              { label: "Primary source", value: "Mbuji-Mayi alluvial concession" },
              { label: "Concession licence", value: "MIN-2024-0441" },
              { label: "Licence expiry", value: "31 Dec 2027" },
              { label: "Secondary source", value: "Tshikapa artisanal cooperative" },
            ]}
          />
        </Panel>

        <Panel title="Contact information">
          <DefinitionList
            items={[
              { label: "Primary contact", value: "Amina Diallo" },
              { label: "Email", value: "amina@kasaimining.cd" },
              { label: "Phone", value: "+243 81 220 4471" },
              { label: "Operations contact", value: "Joseph Kabeya" },
            ]}
          />
        </Panel>

        <Panel title="Banking & mobile payment">
          <DefinitionList
            items={[
              { label: "Bank", value: "Rawbank — Kinshasa" },
              { label: "Account", value: "•••• 4472 (USD)" },
              { label: "SWIFT", value: "RAWBCDKI" },
              { label: "Mobile payment", value: "M-Pesa +243 81 220 4471" },
            ]}
          />
        </Panel>

        <Panel
          title="Compliance status"
          action={<StatusBadge value="Under Review" />}
          className="lg:col-span-2"
        >
          <DefinitionList
            items={[
              { label: "KYC", value: "Under review — address proof outstanding" },
              { label: "AML", value: "Screened 13 Aug 2026 · Medium risk" },
              { label: "Kimberley Process participant", value: "Registered" },
              { label: "Last re-verification", value: "12 Aug 2026" },
            ]}
          />
        </Panel>
      </div>
    </>
  );
}
