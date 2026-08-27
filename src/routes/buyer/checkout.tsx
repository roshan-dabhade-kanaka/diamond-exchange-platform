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
import { PAYMENT_LOCK_HOURS, formatUsd } from "@/lib/rules";

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

const nextSteps = [
  { label: "Escrow confirmed", detail: "Funds verified and held at the Swiss transaction bank." },
  {
    label: "Kimberley certificate transferred",
    detail: "Certificate of origin reassigned to your account.",
  },
  {
    label: "Export documentation prepared",
    detail: "Customs and export permits generated for this stone.",
  },
  {
    label: "Shipment scheduled",
    detail: "Handed to insured carriage with chain-of-custody tracking.",
  },
];

const documents = [
  { name: "Invoice", ref: "INV-20411" },
  { name: "Kimberley Process certificate", ref: "KP-4471902" },
  { name: "Insurance certificate", ref: "INS-30918" },
];

function CheckoutPage() {
  const [method, setMethod] = useState("wire");
  const [insured, setInsured] = useState(true);
  const [confirmed, setConfirmed] = useState(false);

  const stone = 184500;
  const insurance = insured ? 1845 : 0;
  const gateway = method === "wire" ? Math.round(stone * 0.004) : Math.round(stone * 0.021);
  const logistics = 2400;
  const total = stone + insurance + gateway + logistics;
  const money = (n: number) => formatUsd(n);

  if (confirmed) {
    return (
      <>
        <PageHeader
          title="Payment confirmed"
          description="ADX-S-04412 is now yours. Certification, export documentation and shipment follow automatically."
          actions={<StatusBadge value="Paid" />}
        />

        <div className="adex-panel mb-6 p-4">
          <JourneyTracker stage={2} />
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <Panel title="What happens next">
            <Timeline steps={nextSteps.map((s, i) => ({ ...s, done: i === 0 }))} />
          </Panel>

          <div className="space-y-6">
            <Panel title="Order summary">
              <StoneThumb stoneId="ADX-S-04412" className="mb-4 aspect-[4/3] w-full" />
              <DefinitionList
                items={[
                  { label: "Stone", value: "ADX-S-04412 · 4.12 ct" },
                  { label: "Total paid", value: money(total) },
                  {
                    label: "Payment method",
                    value: method === "wire" ? "Wire transfer" : "Card payment",
                  },
                ]}
              />
            </Panel>

            <Panel title="Documents">
              <ul className="space-y-2 text-sm">
                {documents.map((d) => (
                  <li
                    key={d.ref}
                    className="flex items-center justify-between border-b border-border pb-2"
                  >
                    <span>{d.name}</span>
                    <span className="adex-link text-xs">{d.ref}</span>
                  </li>
                ))}
              </ul>
            </Panel>

            <Panel title="Your account manager">
              <p className="text-sm font-semibold">Léa Fontaine</p>
              <p className="text-sm text-muted-foreground">
                Available for questions on delivery, insurance or certification transfer.
              </p>
              <a
                href="mailto:lea.fontaine@adex.example"
                className="adex-link mt-2 inline-block text-sm"
              >
                lea.fontaine@adex.example
              </a>
            </Panel>

            <Link to="/buyer/orders" className="adex-link inline-block text-sm">
              View this order →
            </Link>
          </div>
        </div>
      </>
    );
  }

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
                  type="button"
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
              <GoldButton type="button" onClick={() => setConfirmed(true)}>
                Pay {money(total)}
              </GoldButton>
              <GhostButton type="button">Download proforma invoice</GhostButton>
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
            <p className="font-display text-3xl">{PAYMENT_LOCK_HOURS - 7}h 12m</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Remaining of the {PAYMENT_LOCK_HOURS}-hour locked purchase window. Unpaid wins are
              released to winner two, and repeat defaults suspend bidding rights for twelve months.
            </p>
            <Timeline
              steps={[
                { label: "Auction won", detail: "ADX-S-04412 at $184,500.", done: true },
                { label: "Payment", detail: "Wire or card inside the locked window.", done: false },
                {
                  label: "Certification",
                  detail: "Escrow confirms and certificate transfers.",
                  done: false,
                },
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
