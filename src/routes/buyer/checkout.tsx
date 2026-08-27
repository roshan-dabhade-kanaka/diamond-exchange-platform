import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { pageHead } from "@/lib/page-head";
import {
  DefinitionList,
  FormGrid,
  GhostButton,
  GoldButton,
  PageHeader,
  Panel,
  StatusBadge,
  Timeline,
} from "@/components/adex/kit";
import { JourneyTracker } from "@/components/adex/journey";
import { StoneThumb } from "@/components/adex/stone-gallery";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/buyer/checkout")({
  head: pageHead(
    "Checkout & Payment | ADEX Buyer Portal",
    "Settle a fixed-price purchase or an auction win: wire transfer or card, insurance and gateway fees, then delivery logistics and confirmation.",
  ),
  component: CheckoutPage,
});

const methods = [
  {
    id: "wire",
    label: "Wire transfer",
    detail: "Escrow account, 0.4% handling. Funds confirmed within 1–2 business days.",
  },
  {
    id: "card",
    label: "Card payment",
    detail: "Gateway settlement, 2.1% processing. Instant confirmation, $250,000 cap.",
  },
];

function CheckoutPage() {
  const [method, setMethod] = useState("wire");
  const [insured, setInsured] = useState(true);

  const stone = 184500;
  const insurance = insured ? 1845 : 0;
  const gateway = method === "wire" ? Math.round(stone * 0.004) : Math.round(stone * 0.021);
  const logistics = 2400;
  const total = stone + insurance + gateway + logistics;
  const money = (n: number) => `$${n.toLocaleString("en-US")}`;

  return (
    <>
      <PageHeader
        title="Complete your purchase"
        description="ADX-S-04412 — awarded to you at auction. Payment must clear inside the locked window or the stone is released to the runner-up."
        actions={<StatusBadge value="Pending" />}
      />

      <div className="adex-panel mb-6 p-4">
        <JourneyTracker stage={1} />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-6">
          <Panel title="Payment option">
            <div className="grid gap-3 sm:grid-cols-2">
              {methods.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setMethod(m.id)}
                  className={cn(
                    "border p-4 text-left transition-colors",
                    method === m.id
                      ? "border-gold bg-accent/30"
                      : "border-border hover:border-foreground/40",
                  )}
                >
                  <p className="text-sm font-semibold">{m.label}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{m.detail}</p>
                </button>
              ))}
            </div>

            <label className="mt-4 flex items-start gap-3 border-t border-border pt-4 text-sm">
              <input
                type="checkbox"
                checked={insured}
                onChange={(e) => setInsured(e.target.checked)}
                className="mt-1"
              />
              <span>
                <span className="font-semibold">Transit insurance</span>
                <span className="block text-xs text-muted-foreground">
                  1% of hammer price, covering door-to-door carriage and customs handling.
                </span>
              </span>
            </label>
          </Panel>

          <Panel title="Delivery & logistics details">
            <FormGrid
              fields={[
                { label: "Consignee name" },
                { label: "Company / VAT" },
                { label: "Delivery address", type: "textarea" },
                { label: "City" },
                { label: "Country" },
                { label: "Preferred carrier" },
                { label: "Customs broker" },
                { label: "Contact on delivery" },
              ]}
            />
            <div className="mt-5 flex flex-wrap gap-2">
              <GoldButton>Pay {money(total)}</GoldButton>
              <GhostButton>Download proforma invoice</GhostButton>
            </div>
          </Panel>
        </div>

        <div className="space-y-6">
          <Panel title="Order summary">
            <StoneThumb stoneId="ADX-S-04412" className="mb-4 aspect-[4/3] w-full" />
            <DefinitionList
              items={[
                { label: "Stone", value: "ADX-S-04412 · 4.12 ct" },
                { label: "Hammer price", value: money(stone) },
                { label: "Insurance", value: money(insurance) },
                {
                  label: method === "wire" ? "Wire handling" : "Gateway fee",
                  value: money(gateway),
                },
                { label: "Logistics", value: money(logistics) },
                { label: "Total due", value: money(total) },
              ]}
            />
          </Panel>

          <Panel title="Payment window">
            <p className="font-display text-3xl">41h 12m</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Remaining in the locked purchase window. Unpaid wins are released to winner two, and
              repeat defaults suspend bidding rights for twelve months.
            </p>
            <Timeline
              steps={[
                { label: "Auction won", detail: "ADX-S-04412 at $184,500.", done: true },
                { label: "Payment", detail: "Wire or card inside the locked window.", done: false },
                { label: "Confirmation", detail: "Escrow confirms and releases stone.", done: false },
                { label: "Delivery", detail: "Insured carriage with tracking.", done: false },
              ]}
            />
            <Link to="/buyer/orders" className="adex-link mt-4 inline-block text-sm">
              View all orders
            </Link>
          </Panel>
        </div>
      </div>
    </>
  );
}
