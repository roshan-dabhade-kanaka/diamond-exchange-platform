import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { PublicShell } from "@/components/adex/public-shell";
import { GoldButton, Panel, Timeline } from "@/components/adex/kit";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

export const Route = createFileRoute("/otp-verification")({
  head: () => ({
    meta: [
      { title: "Verify your account | ADEX" },
      {
        name: "description",
        content:
          "Enter the one-time code sent to your email or phone to activate your ADEX account.",
      },
    ],
  }),
  component: OtpVerification,
});

function OtpVerification() {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [resent, setResent] = useState(false);

  const complete = code.length === 6;

  return (
    <PublicShell>
      <div className="mx-auto max-w-md">
        <h1 className="adex-section-title">Verify your account</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Enter the 6-digit code sent to your email or phone to activate your account.
        </p>

        <div className="adex-panel mt-6 space-y-6 p-6">
          <InputOTP maxLength={6} value={code} onChange={setCode}>
            <InputOTPGroup>
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <InputOTPSlot key={i} index={i} />
              ))}
            </InputOTPGroup>
          </InputOTP>

          <GoldButton
            type="button"
            className="w-full"
            disabled={!complete}
            onClick={() => navigate({ to: "/buyer" })}
          >
            Verify and continue
          </GoldButton>

          <button
            type="button"
            onClick={() => setResent(true)}
            className="adex-link block w-full text-center text-sm"
          >
            {resent ? "Code resent" : "Resend code"}
          </button>
        </div>

        <Panel title="Account activation path" className="mt-6">
          <Timeline
            steps={[
              { label: "Registered", detail: "Account created", done: true },
              { label: "Verification pending", detail: "Email / OTP verification", done: complete },
              { label: "KYC pending", detail: "Identity and source documents", done: false },
              { label: "Approved", detail: "Compliance review complete", done: false },
              { label: "Active", detail: "Trading enabled", done: false },
            ]}
          />
        </Panel>
      </div>
    </PublicShell>
  );
}
