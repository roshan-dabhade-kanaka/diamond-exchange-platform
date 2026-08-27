import { createFileRoute } from "@tanstack/react-router";
import { PortalShell } from "@/components/adex/portal-shell";
import { notifications } from "@/lib/adex-data";

const nav = [
  { label: "Dashboard", to: "/seller" },
  { label: "My Stones", to: "/seller/stones" },
  { label: "My Lots", to: "/seller/lots" },
  { label: "Auctions & Sales", to: "/seller/auctions" },
  { label: "Shipments", to: "/seller/shipments" },
  { label: "Payments", to: "/seller/payments" },
  { label: "Certificates", to: "/seller/certificates" },
  { label: "KYC / AML", to: "/seller/kyc" },
];

export const Route = createFileRoute("/seller")({
  component: () => (
    <PortalShell
      persona="Seller / Miner"
      user="Kasai Mining SARL"
      nav={nav}
      notifications={notifications.map((n) => ({
        title: n.title,
        body: n.body,
        time: n.time,
        tone: n.tone === "warning" ? "Pending" : "Active",
      }))}
      profileTo="/seller/profile"
      profileName="Joseph Kabamba"
      profileRole="Kasai Mining SARL · Account owner"
    />
  ),
});
