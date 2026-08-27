import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/page-head";
import { DataTable, FilterBar, PageHeader, Panel } from "@/components/adex/kit";
import { certificates } from "@/lib/adex-data";
import { KimberleyCertificatePreview } from "@/components/adex/stone-gallery";

export const Route = createFileRoute("/seller/certificates")({
  head: pageHead(
    "Certificates | ADEX Seller Portal",
    "View and download Kimberley Process and grading certificates issued against your stones and lots.",
  ),
  component: SellerCertificates,
});

function SellerCertificates() {
  return (
    <>
      <PageHeader
        title="Certificates"
        description="Kimberley Process and grading certification issued by ADEX."
      />
      <FilterBar fields={["Certificate", "Type", "Item", "Status"]} />
      <DataTable rows={certificates} linkBase="seller" />

      <Panel title="Kimberley Process certificate — specimen" className="mt-6">
        <KimberleyCertificatePreview />
      </Panel>


      <Panel title="Certificate actions" className="mt-6">
        <ul className="space-y-2 text-sm">
          <li>
            <button className="adex-link">View certificate</button> — inspect issued details and
            verification reference.
          </li>
          <li>
            <button className="adex-link">Download PDF</button> — signed certificate copy for export
            documentation.
          </li>
          <li>
            <button className="adex-link">View certificate status</button> — validity, reissue and
            revocation history.
          </li>
        </ul>
      </Panel>
    </>
  );
}
