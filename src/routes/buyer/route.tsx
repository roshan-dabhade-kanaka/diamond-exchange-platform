import { createFileRoute } from "@tanstack/react-router";
import { PortalShell } from "@/components/adex/portal-shell";

const nav = [
  { label: "Dashboard", to: "/buyer" },
  { label: "Marketplace", to: "/buyer/marketplace" },
  { label: "Showroom Visits", to: "/buyer/showroom" },
  { label: "Paid Analysis", to: "/buyer/analysis" },
  { label: "My Bids", to: "/buyer/bids" },
  { label: "Checkout & Payment", to: "/buyer/checkout" },
  { label: "Orders", to: "/buyer/orders" },
  { label: "Watchlist", to: "/buyer/watchlist" },
  { label: "Browse Inventory", to: "/buyer/inventory" },
  { label: "KYC / AML", to: "/buyer/kyc" },
];

const notifications = [
  {
    title: "Outbid on ADX-L-0312",
    body: "Current bid is now $210,000.",
    time: "24 minutes ago",
    tone: "Outbid",
  },
  {
    title: "Auction won",
    body: "ADX-S-04412 awarded at $184,500.",
    time: "Yesterday",
    tone: "Completed",
  },
  {
    title: "Payment required",
    body: "INV-20411 of $189,220 due 22 Aug 2026.",
    time: "Yesterday",
    tone: "Pending",
  },
  {
    title: "Certificate available",
    body: "GR-2280114 released for ORD-11188.",
    time: "2 days ago",
    tone: "Active",
  },
  {
    title: "Shipment update",
    body: "SHP-51188 cleared for Dubai DMCC customs.",
    time: "3 days ago",
    tone: "Active",
  },
];

export const Route = createFileRoute("/buyer")({
  component: () => (
    <PortalShell
      persona="Buyer"
      user="Vermeulen Gems"
      nav={nav}
      notifications={notifications}
      profileTo="/buyer/profile"
      profileName="Marc Vermeulen"
      profileRole="Vermeulen Gems · Account owner"
    />
  ),
});
