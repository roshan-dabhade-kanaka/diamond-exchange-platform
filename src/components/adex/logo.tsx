import { Link } from "@tanstack/react-router";
import adexLogoSrc from "@/assets/logo/adex-logo.png";

export function AdexLogo({
  to = "/",
  variant = "image",
}: {
  to?: string;
  variant?: "text" | "image" | undefined;
}) {
  return (
    <Link to={to} className="flex flex-col items-center gap-1.5">
      {variant === "image" ? (
        <img
          src={adexLogoSrc}
          alt="ADEX — African Diamond Exchange"
          className="h-12 w-auto"
        />
      ) : (
        <span className="font-display text-3xl leading-none tracking-[0.34em] text-foreground">
          ADEX
        </span>
      )}
      <span className="text-[9px] tracking-[0.4em] text-muted-foreground uppercase">
        African Diamond Exchange
      </span>
      <span className="sr-only">ADEX — African Diamond Exchange</span>
    </Link>
  );
}
