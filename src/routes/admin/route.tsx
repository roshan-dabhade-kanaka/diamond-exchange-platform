import { createFileRoute } from "@tanstack/react-router";
import { PortalShell } from "@/components/adex/portal-shell";

const nav = [
  { label: "Dashboard", to: "/admin" },
  { label: "Users & Roles", to: "/admin/users" },
  { label: "Register User", to: "/admin/register-user" },
  { label: "KYC / AML", to: "/admin/kyc" },
  { label: "Stone Intake", to: "/admin/intake" },
  { label: "Stones & Lots", to: "/admin/stones" },
  { label: "Inventory & Cutting", to: "/admin/inventory" },
  { label: "Valuation Service", to: "/admin/valuation" },
  { label: "Auctions", to: "/admin/auctions" },
  { label: "Create Auction", to: "/admin/new-auction" },
  { label: "Showroom", to: "/admin/showroom" },
  { label: "Payments & Settlement", to: "/admin/payments" },
  { label: "Logistics", to: "/admin/logistics" },
  { label: "FOMIN / Partners", to: "/admin/partners" },
  { label: "Reports & Analytics", to: "/admin/reports" },
  { label: "Audit", to: "/admin/audit" },
  { label: "Integrations", to: "/admin/integrations" },
  { label: "Platform Settings", to: "/admin/config" },
  { label: "Profile", to: "/admin/profile" },
];

const notifications = [
  {
    title: "KYC escalation",
    body: "3 buyer applications need review.",
    time: "1 hour ago",
    tone: "Pending",
  },
  {
    title: "Auction closing",
    body: "AUC-2026-08-A closes in 2 hours.",
    time: "2 hours ago",
    tone: "Active",
  },
  {
    title: "Payout batch",
    body: "Batch PAY-4471 ready for approval.",
    time: "Yesterday",
    tone: "Pending",
  },
];

export const Route = createFileRoute("/admin")({
  component: () => (
    <PortalShell
      persona="Admin"
      user="Compliance"
      nav={nav}
      notifications={notifications}
      profileName="R. Mehta"
      profileRole="Compliance administrator"
    />
  ),
});
