import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { PublicShell } from "@/components/adex/public-shell";
import { FormGrid, GoldButton, Panel, Timeline } from "@/components/adex/kit";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Register a buyer account | ADEX" },
      {
        name: "description",
        content:
          "Create an ADEX buyer account as an organization or individual and begin KYC and AML verification.",
      },
      { property: "og:title", content: "Register a buyer account | ADEX" },
      {
        property: "og:description",
        content: "Onboard to the ADEX exchange with verified identity and compliance checks.",
      },
    ],
  }),
  component: Register,
});

function Register() {
  const navigate = useNavigate();

  return (
    <PublicShell>
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
        <div>
          <h1 className="adex-section-title">Registration</h1>
          <form
            className="adex-panel mt-6 space-y-6 p-6"
            onSubmit={(e) => {
              e.preventDefault();
              navigate({ to: "/otp-verification" });
            }}
          >
            <fieldset>
              <legend className="font-display mb-3 text-base">Account type</legend>
              <div className="flex flex-wrap gap-4 text-sm font-semibold">
                {["Individual", "Organization"].map((t) => (
                  <label key={t} className="flex items-center gap-2">
                    <input type="radio" name="type" className="accent-[var(--gold)]" /> {t}
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend className="font-display mb-3 text-base">Applicant details</legend>
              <FormGrid
                fields={[
                  { label: "Legal name" },
                  { label: "Organization name" },
                  { label: "Country" },
                  { label: "Address" },
                  { label: "Email", type: "email" },
                  { label: "Phone", type: "tel" },
                  { label: "Password", type: "password" },
                  { label: "Confirm password", type: "password" },
                ]}
              />
            </fieldset>

            <label className="flex items-start gap-2 text-sm">
              <input type="checkbox" className="mt-1 accent-[var(--gold)]" />
              <span>
                I accept the ADEX{" "}
                <a href="#top" className="adex-link">
                  Terms &amp; Conditions
                </a>{" "}
                and confirm the information provided is accurate.
              </span>
            </label>

            <div className="flex gap-2">
              <GoldButton type="submit">Create account</GoldButton>
              <Link
                to="/sign-in"
                className="h-9 rounded-sm border border-input px-4 text-sm leading-9 font-semibold hover:bg-muted"
              >
                I already have an account
              </Link>
            </div>
          </form>
        </div>

        <Panel title="Account activation path">
          <Timeline
            steps={[
              { label: "Registered", detail: "Account created", done: true },
              { label: "Verification pending", detail: "Email / OTP verification", done: false },
              { label: "KYC pending", detail: "Identity and source documents", done: false },
              { label: "Approved", detail: "Compliance review complete", done: false },
              { label: "Active", detail: "Trading enabled", done: false },
            ]}
          />
          <p className="mt-4 text-xs text-muted-foreground">
            Accounts may also be Rejected, Suspended or Deactivated by compliance at any stage.
          </p>
        </Panel>
      </div>
    </PublicShell>
  );
}
