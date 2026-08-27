import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/page-head";
import { DataTable, GhostButton, PageHeader, Panel } from "@/components/adex/kit";
import { BIDDING_WINDOW_DAYS, PAYMENT_LOCK_HOURS } from "@/lib/rules";

export const Route = createFileRoute("/admin/config")({
  head: pageHead(
    "Platform Settings | ADEX Admin",
    "Plain-language settings for auction rules, fees and payouts, compliance requirements and notifications.",
  ),
  component: AdminConfig,
});

type Setting = { name: string; explain: string; value: string };

const groups: { title: string; intro: string; settings: Setting[] }[] = [
  {
    title: "Auction rules",
    intro: "How auctions run and what bidders are allowed to do.",
    settings: [
      {
        name: "Smallest allowed bid increase",
        explain: "A new bid must beat the current bid by at least this much.",
        value: "1.0% of current bid",
      },
      {
        name: "Anti-sniping extension",
        explain: "If a bid arrives near the end, the auction is extended so others can respond.",
        value: "Extend by 2 minutes",
      },
      {
        name: "Reserve price visible to buyers",
        explain: "Whether buyers can see the minimum price a seller will accept.",
        value: "Hidden",
      },
      {
        name: "Bidding window",
        explain: "How long a listing accepts bids after it goes live.",
        value: `${BIDDING_WINDOW_DAYS} days`,
      },
    ],
  },
  {
    title: "Fees and payouts",
    intro: "What ADEX charges and how quickly sellers are paid.",
    settings: [
      {
        name: "Buyer premium",
        explain: "Added to the winning bid and paid by the buyer.",
        value: "6% of winning bid",
      },
      {
        name: "Seller commission",
        explain: "Deducted from the sale proceeds before payout.",
        value: "4% of sale price",
      },
      {
        name: "Payment window for buyers",
        explain: "How long a buyer has to pay after winning before the sale is at risk.",
        value: `${PAYMENT_LOCK_HOURS} hours`,
      },
      {
        name: "Seller payout time",
        explain: "How soon a seller is paid after the buyer's funds clear.",
        value: "3 working days",
      },
    ],
  },
  {
    title: "Compliance requirements",
    intro: "What must be in place before people can trade on the platform.",
    settings: [
      {
        name: "Identity checks before selling",
        explain: "Sellers must pass KYC before a stone can be listed.",
        value: "Required",
      },
      {
        name: "Identity checks before bidding",
        explain: "Buyers must pass KYC before placing a bid.",
        value: "Required",
      },
      {
        name: "Kimberley certificate before shipping",
        explain: "A valid Kimberley Process certificate must be attached to the stone.",
        value: "Required",
      },
      {
        name: "Return window after delivery",
        explain: "How long a buyer has to raise a return once the stone arrives.",
        value: "7 days",
      },
    ],
  },
  {
    title: "Notifications",
    intro: "Which alerts the platform sends automatically.",
    settings: [
      {
        name: "Outbid alert",
        explain: "Tell a buyer immediately when someone bids higher.",
        value: "Email + in-app",
      },
      {
        name: "Payment reminder",
        explain: "Remind a buyer before the payment deadline.",
        value: "24 hours before due",
      },
      {
        name: "Valuation ready",
        explain: "Tell the seller as soon as a valuation comes back.",
        value: "Email + in-app",
      },
    ],
  },
];

const lists = [
  {
    List: "Stone classifications",
    Purpose: "Choices sellers pick from when registering",
    Entries: 14,
    Updated: "12 Aug 2026",
  },
  {
    List: "Countries and regions",
    Purpose: "Origin and destination options",
    Entries: 54,
    Updated: "01 Jul 2026",
  },
  {
    List: "Logistics providers",
    Purpose: "Carriers that can be assigned to a shipment",
    Entries: 6,
    Updated: "09 Aug 2026",
  },
  {
    List: "Document types",
    Purpose: "Documents that can be attached to a stone or lot",
    Entries: 18,
    Updated: "04 Aug 2026",
  },
];

function AdminConfig() {
  return (
    <>
      <PageHeader
        title="Platform Settings"
        description="Everything here changes how the platform behaves for buyers and sellers. Each setting is written in plain language, and every change is recorded in the audit log."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        {groups.map((g) => (
          <Panel key={g.title} title={g.title}>
            <p className="mb-4 text-sm text-muted-foreground">{g.intro}</p>
            <ul className="space-y-4">
              {g.settings.map((s) => (
                <li
                  key={s.name}
                  className="flex flex-wrap items-start justify-between gap-3 border-b border-border pb-3 last:border-0 last:pb-0"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-semibold">{s.name}</p>
                    <p className="text-xs text-muted-foreground">{s.explain}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold whitespace-nowrap">{s.value}</span>
                    <GhostButton className="h-8">Change</GhostButton>
                  </div>
                </li>
              ))}
            </ul>
          </Panel>
        ))}
      </div>

      <Panel title="Drop-down lists used across the platform" className="mt-6">
        <p className="mb-4 text-sm text-muted-foreground">
          These are the option lists people choose from when registering stones, creating lots or
          uploading documents.
        </p>
        <DataTable rows={lists} dense />
        <div className="mt-4 flex gap-2">
          <GhostButton>Edit a list</GhostButton>
          <GhostButton>View change history</GhostButton>
        </div>
      </Panel>
    </>
  );
}
