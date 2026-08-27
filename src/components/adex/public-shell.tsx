import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { AdexLogo } from "./logo";


const nav = [
  { label: "Home", to: "/" },
  { label: "The Collection", to: "/collection" },
];


const footerLinks = [
  "Help",
  "Contact Us",
  "About Us",
  "Terms & Conditions",
  "Privacy Policy",
  "Site Map",
];

export function PublicShell({
  children,
  logoVariant,
  bleed,
}: {
  children: ReactNode;
  logoVariant?: "text" | "image";
  bleed?: boolean;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <div className="bg-gold text-center text-[11px] tracking-[0.22em] text-gold-foreground uppercase">

        <p className="px-4 py-2.5">
          Direct from African origin · Transparent international market access
        </p>
      </div>

      <header className="border-b border-border">
        <div className="mx-auto max-w-[1240px] px-6 py-8">
          <div className="flex items-center justify-center">
            <AdexLogo variant={logoVariant} />
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-9 gap-y-3">
            <nav className="flex flex-wrap items-center justify-center gap-x-9 gap-y-3">
              {nav.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  className="border-b border-transparent pb-1 text-[11px] tracking-[0.22em] text-foreground uppercase transition-colors hover:border-foreground"
                  activeProps={{ className: "border-gold" }}
                  activeOptions={{ exact: n.to === "/" }}
                >
                  {n.label}
                </Link>
              ))}
            </nav>
            <span className="hidden h-3 w-px bg-border sm:block" />
            <div className="flex items-center gap-x-9">
              <Link
                to="/register"
                className="border-b border-transparent pb-1 text-[11px] tracking-[0.22em] uppercase transition-colors hover:border-foreground"
              >
                Register
              </Link>
              <Link
                to="/sign-in"
                className="border-b border-transparent pb-1 text-[11px] tracking-[0.22em] uppercase transition-colors hover:border-foreground"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </header>

      {bleed ? (
        <main className="w-full flex-1">{children}</main>
      ) : (
        <main className="mx-auto w-full max-w-[1240px] flex-1 px-6 py-14">{children}</main>
      )}


      <footer className="mt-10 border-t border-border">
        <div className="mx-auto max-w-[1240px] px-6 py-12">
          <div className="flex flex-col items-center gap-7 text-center">
            <p className="font-display text-2xl tracking-[0.14em] uppercase">ADEX</p>
            <p className="max-w-md text-sm text-muted-foreground">
              The international marketplace for transparent and fair sales of rough, uncut
              diamonds and gemstones from Africa to the world.
            </p>
            <ul className="flex flex-wrap justify-center gap-x-8 gap-y-3">
              {footerLinks.map((l) => (
                <li key={l}>
                  <a
                    href="#top"
                    className="border-b border-transparent pb-0.5 text-[11px] tracking-[0.2em] uppercase transition-colors hover:border-foreground"
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
            <p className="text-xs text-muted-foreground">
              © 2026 ADEX. All rights reserved. No part of this page may be reproduced without the
              prior written permission of ADEX.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export function PortalEntryLinks() {
  return (
    <div className="grid gap-px bg-border sm:grid-cols-2">
      {[
        {
          to: "/buyer",
          eyebrow: "Acquire",
          label: "Buyer Portal",
          desc: "Browse inventory, bid at auction, manage orders.",
        },
        {
          to: "/admin",
          eyebrow: "Governance",
          label: "Admin Portal",
          desc: "Compliance, operations, auctions and reporting.",
        },
      ].map((p) => (
        <Link key={p.to} to={p.to} className="group block bg-background p-8 hover:bg-accent/40">
          <p className="adex-eyebrow">{p.eyebrow}</p>
          <p className="font-display mt-3 text-xl">{p.label}</p>
          <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
          <span className="mt-6 block h-px w-8 bg-gold transition-all duration-500 group-hover:w-20" />
        </Link>
      ))}
    </div>
  );
}
