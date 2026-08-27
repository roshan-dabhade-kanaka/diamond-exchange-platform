import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { pageHead } from "@/lib/page-head";
import {
  DataTable,
  DefinitionList,
  FilterBar,
  FormGrid,
  GhostButton,
  GoldButton,
  KpiGrid,
  PageHeader,
  Panel,
  Timeline,
} from "@/components/adex/kit";
import { PurchaseCard } from "@/components/adex/journey";
import { purchases, returnsRows, shipments } from "@/lib/adex-data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const Route = createFileRoute("/buyer/orders")({
  head: pageHead(
    "Orders, Payments & Shipments | ADEX Buyer Portal",
    "One screen for every won lot: order journey, invoices and payment, shipment tracking and return requests.",
  ),
  component: BuyerOrders,
});

const invoices = [
  {
    Invoice: "INV-20411",
    Order: "ORD-11204",
    Amount: "$189,220",
    Due: "22 Aug 2026",
    Method: "Wire transfer",
    Status: "Pending",
  },
  {
    Invoice: "INV-20388",
    Order: "ORD-11188",
    Amount: "$215,600",
    Due: "12 Aug 2026",
    Method: "Wire transfer",
    Status: "Paid",
  },
  {
    Invoice: "INV-20340",
    Order: "ORD-11150",
    Amount: "$43,110",
    Due: "01 Aug 2026",
    Method: "Escrow",
    Status: "Paid",
  },
];

function ReturnDialog({ orderId, stoneId }: { orderId: string; stoneId: string }) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <GhostButton className="h-8 px-3">Request return</GhostButton>
      </DialogTrigger>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle className="font-display">Return request — {orderId}</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-muted-foreground">
          Returns are raised against a delivered order. {stoneId} will be locked for re-grading
          while the request is reviewed.
        </p>
        <FormGrid
          fields={[
            { label: "Reason" },
            { label: "Requested resolution" },
            { label: "Description", type: "textarea" },
            { label: "Supporting evidence", type: "file" },
          ]}
        />
        <div className="mt-2 flex gap-2">
          <GoldButton onClick={() => setOpen(false)}>Submit request</GoldButton>
          <GhostButton onClick={() => setOpen(false)}>Cancel</GhostButton>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function BuyerOrders() {
  return (
    <>
      <PageHeader
        title="Orders"
        description="Every won lot end to end — payment, certification, shipment and returns without leaving this screen."
        actions={
          <Link
            to="/buyer/marketplace"
            className="h-9 rounded-sm border border-input px-4 text-sm leading-9 font-semibold hover:bg-muted"
          >
            Back to marketplace
          </Link>
        }
      />

      <KpiGrid
        items={[
          { label: "Awaiting payment", value: "$189,220" },
          { label: "In transit", value: "1" },
          { label: "Delivered (YTD)", value: "38" },
          { label: "Open returns", value: String(returnsRows.length) },
        ]}
      />

      <Tabs defaultValue="orders" className="mt-6">
        <TabsList>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="shipments">Shipments</TabsTrigger>
          <TabsTrigger value="returns">Returns</TabsTrigger>
        </TabsList>

        <TabsContent value="orders" className="space-y-4">
          {purchases.map((p) => (
            <PurchaseCard
              key={p.orderId}
              purchase={p}
              action={
                p.stage >= 4 ? <ReturnDialog orderId={p.orderId} stoneId={p.stoneId} /> : undefined
              }
            />
          ))}
        </TabsContent>

        <TabsContent value="payments">
          <DataTable rows={invoices} linkBase="buyer" />
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <Panel title="Payment breakdown — ORD-11204">
              <DefinitionList
                items={[
                  { label: "Winning amount", value: "$184,500" },
                  { label: "Service fee (2%)", value: "$3,690" },
                  { label: "Taxes & charges", value: "$1,030" },
                  { label: "Total payable", value: "$189,220" },
                  { label: "Payment method", value: "Wire transfer" },
                  { label: "Transaction reference", value: "Pending" },
                ]}
              />
              <GoldButton className="mt-4">Pay now</GoldButton>
            </Panel>
            <Panel title="Invoice INV-20411">
              <DefinitionList
                items={[
                  { label: "Invoice number", value: "INV-20411" },
                  { label: "Issued", value: "18 Aug 2026" },
                  { label: "Due date", value: "22 Aug 2026" },
                  { label: "Billed to", value: "Vermeulen Gems, Antwerp" },
                ]}
              />
              <GhostButton className="mt-4">Download PDF</GhostButton>
            </Panel>
          </div>
        </TabsContent>

        <TabsContent value="shipments">
          <FilterBar fields={["Shipment ID", "Order", "Provider", "Status"]} />
          <DataTable rows={shipments} linkBase="buyer" />
          <Panel title="Tracking — SHP-51188" className="mt-6">
            <Timeline
              steps={[
                { label: "Dispatched", detail: "Antwerp Vault · 17 Aug 2026", done: true },
                { label: "In transit", detail: "Malca-Amit MA-77340192", done: true },
                { label: "Customs", detail: "Dubai DMCC clearance in progress", done: true },
                { label: "Out for delivery", detail: "Expected 22 Aug 2026", done: false },
                { label: "Delivery confirmation", detail: "Signature required", done: false },
              ]}
            />
          </Panel>
        </TabsContent>

        <TabsContent value="returns">
          <DataTable rows={returnsRows} linkBase="buyer" />
          <Panel title="Resolution — RET-2041" className="mt-6">
            <Timeline
              steps={[
                { label: "Submitted", detail: "10 Aug 2026", done: true },
                { label: "Under review", detail: "Grading re-check requested", done: true },
                { label: "Decision", detail: "Pending compliance sign-off", done: false },
                { label: "Resolution", detail: "Refund, replacement or rejection", done: false },
              ]}
            />
          </Panel>
        </TabsContent>
      </Tabs>
    </>
  );
}
