import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { pageHead } from "@/lib/page-head";
import {
  DataTable,
  DefinitionList,
  FilterBar,
  FormGrid,
  GhostButton,
  GoldButton,
  PageHeader,
  Panel,
} from "@/components/adex/kit";
import { sellerLots } from "@/lib/adex-data";

export const Route = createFileRoute("/seller/lots/")({
  head: pageHead(
    "My Lots | ADEX Seller Portal",
    "Group stones into lots with classification, stone count and total carat, and track valuation, auction, shipment and payment per lot.",
  ),
  component: SellerLots,
});

function SellerLots() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <PageHeader
        title="My Lots"
        description="Grouped stones sold as a single auction unit. Open a Lot ID for composition, valuation, auction, shipment and payment."
        actions={<GoldButton onClick={() => setSubmitted(false)}>Create lot</GoldButton>}
      />
      <FilterBar fields={["Lot ID", "Classification", "Status", "Auction", "Carat"]} />
      <DataTable rows={sellerLots} linkBase="seller" />

      {submitted ? (
        <Panel title="Lot created" className="mt-6">
          <p className="text-sm text-muted-foreground">
            The lot has been created and an ADEX Lot ID issued. Composition, valuation, auction,
            shipment and payment all live on the lot record.
          </p>
          <div className="mt-4">
            <DefinitionList
              items={[
                { label: "ADEX Lot ID", value: "ADX-L-0308" },
                { label: "Classification", value: "Near gem" },
                { label: "Number of stones", value: "18" },
                { label: "Total carat", value: "24.80 ct" },
              ]}
            />
          </div>
          <div className="mt-4 flex gap-2">
            <Link
              to="/seller/lots/$lotId"
              params={{ lotId: "ADX-L-0308" }}
              className="h-9 rounded-sm bg-gold px-4 text-sm leading-9 font-semibold text-gold-foreground hover:opacity-90"
            >
              Open lot record
            </Link>
            <GhostButton onClick={() => setSubmitted(false)}>Create another</GhostButton>
          </div>
        </Panel>
      ) : (
        <Panel title="Create lot" className="mt-6">
          <FormGrid
            fields={[
              { label: "Lot name" },
              { label: "Classification" },
              { label: "Number of stones" },
              { label: "Total carat" },
              { label: "Stone selection" },
              { label: "Description", type: "textarea" },
              { label: "Images / documents", type: "file" },
            ]}
          />
          <div className="mt-4 flex gap-2">
            <GoldButton onClick={() => setSubmitted(true)}>Create lot</GoldButton>
            <GhostButton>Submit for valuation</GhostButton>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Lots stay editable until valued or listed — open the lot record to change classification,
            composition or carat.
          </p>
        </Panel>
      )}
    </>
  );
}
