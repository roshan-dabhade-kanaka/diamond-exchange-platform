import { createFileRoute, Link } from "@tanstack/react-router";
import { PublicShell } from "@/components/adex/public-shell";
import { GoldButton } from "@/components/adex/kit";

export const Route = createFileRoute("/sign-in")({
  head: () => ({
    meta: [
      { title: "Sign in to ADEX" },
      {
        name: "description",
        content:
          "Sign in to the ADEX seller, buyer or admin portal to manage stones, bids, orders and compliance.",
      },
      { property: "og:title", content: "Sign in to ADEX" },
      { property: "og:description", content: "Secure access to the ADEX diamond exchange portals." },
    ],
  }),
  component: SignIn,
});

function SignIn() {
  return (
    <PublicShell>
      <div className="mx-auto max-w-md">
        <h1 className="adex-section-title">Sign In</h1>
        <form className="adex-panel mt-6 space-y-4 p-6">
          <label className="flex flex-col gap-1 text-xs font-semibold">
            Email
            <input
              type="email"
              className="h-9 rounded-sm border border-input bg-background px-3 text-sm font-normal focus:border-ring focus:outline-none"
            />
          </label>
          <label className="flex flex-col gap-1 text-xs font-semibold">
            Password
            <input
              type="password"
              className="h-9 rounded-sm border border-input bg-background px-3 text-sm font-normal focus:border-ring focus:outline-none"
            />
          </label>
          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center gap-2 font-semibold">
              <input type="checkbox" className="accent-[var(--gold)]" /> Remember me
            </label>
            <a href="#top" className="adex-link">
              Forgot password?
            </a>
          </div>
          <GoldButton className="w-full">Sign in</GoldButton>
          <p className="text-center text-xs text-muted-foreground">
            Two-factor verification is required for admin accounts.
          </p>
        </form>

        <div className="adex-panel mt-6 p-4 text-sm">
          <p className="font-semibold">Continue to a demo portal</p>
          <ul className="mt-2 space-y-1">
            <li>
              <Link to="/seller" className="adex-link">
                Seller / Miner portal
              </Link>
            </li>
            <li>
              <Link to="/buyer" className="adex-link">
                Buyer portal
              </Link>
            </li>
            <li>
              <Link to="/admin" className="adex-link">
                Admin portal
              </Link>
            </li>
          </ul>
        </div>

        <p className="mt-6 text-center text-sm">
          No account?{" "}
          <Link to="/register" className="adex-link">
            Register
          </Link>
        </p>
      </div>
    </PublicShell>
  );
}
