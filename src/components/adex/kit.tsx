import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";

import { cn } from "@/lib/utils";
import type { Row } from "@/lib/adex-data";

const toneMap: Record<string, string> = {
  active: "bg-success text-success-foreground",
  approved: "bg-success text-success-foreground",
  completed: "bg-success text-success-foreground",
  paid: "bg-success text-success-foreground",
  delivered: "bg-success text-success-foreground",
  valid: "bg-success text-success-foreground",
  sold: "bg-success text-success-foreground",
  won: "bg-success text-success-foreground",
  leading: "bg-success text-success-foreground",
  resolved: "bg-success text-success-foreground",
  listed: "bg-info text-info-foreground",
  "in transit": "bg-info text-info-foreground",
  processing: "bg-info text-info-foreground",
  scheduled: "bg-info text-info-foreground",
  submitted: "bg-info text-info-foreground",
  pending: "bg-warning text-warning-foreground",
  "under review": "bg-warning text-warning-foreground",
  "under valuation": "bg-warning text-warning-foreground",
  ending: "bg-warning text-warning-foreground",
  customs: "bg-warning text-warning-foreground",
  queued: "bg-warning text-warning-foreground",
  review: "bg-warning text-warning-foreground",
  "awaiting payment": "bg-warning text-warning-foreground",
  relisted: "bg-warning text-warning-foreground",
  outbid: "bg-destructive text-destructive-foreground",
  unsold: "bg-destructive text-destructive-foreground",
  suspended: "bg-destructive text-destructive-foreground",
  rejected: "bg-destructive text-destructive-foreground",
  escalated: "bg-destructive text-destructive-foreground",
  high: "bg-destructive text-destructive-foreground",
  medium: "bg-warning text-warning-foreground",
  low: "bg-success text-success-foreground",
};

export function StatusBadge({ value }: { value: string }) {
  const tone = toneMap[value.toLowerCase()] ?? "bg-neutral-chip text-neutral-chip-foreground";
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-1 text-[10px] font-semibold tracking-[0.16em] whitespace-nowrap uppercase",
        tone,
      )}
    >
      {value}
    </span>
  );
}

export function PageHeader({
  title,
  description,
  actions,
}: {
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-border pb-5">
      <div>
        <h1 className="font-display text-3xl">{title}</h1>
        {description ? (
          <p className="mt-1 max-w-2xl text-sm text-muted-foreground">{description}</p>
        ) : null}
      </div>
      {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
    </div>
  );
}

export function Panel({
  title,
  action,
  children,
  className,
}: {
  title?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("adex-panel", className)}>
      {title ? (
        <header className="flex items-center justify-between border-b border-border px-4 py-3">
          <h2 className="adex-eyebrow">{title}</h2>
          {action}
        </header>
      ) : null}
      <div className="p-4">{children}</div>
    </section>
  );
}

export function KpiGrid({ items }: { items: { label: string; value: string }[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      {items.map((k) => (
        <div key={k.label} className="adex-panel px-4 py-3">
          <p className="adex-eyebrow">{k.label}</p>
          <p className="font-display mt-2 text-2xl text-foreground">{k.value}</p>
        </div>
      ))}
    </div>
  );
}

const statusKeys = [
  "status",
  "valuation",
  "auction",
  "sale",
  "certification",
  "payment",
  "shipment",
  "scan",
  "risk level",
  "result",
];

export type RecordBase = "admin" | "buyer";

/** Renders an ADEX Stone/Lot ID as a link to its single record page. */
export function RecordLink({
  value,
  base = "admin",
  className,
}: {
  value: string;
  base?: RecordBase;
  className?: string;
}) {
  const cls = cn("adex-link", className);
  const isStone = /^ADX-S-/.test(value);
  const isLot = /^ADX-L-/.test(value);
  if (!isStone && !isLot) return <span className={cls}>{value}</span>;

  if (base === "buyer") {
    return (
      <Link to="/listing/$listingId" params={{ listingId: value }} className={cls}>
        {value}
      </Link>
    );
  }
  if (isStone) {
    return (
      <Link to="/admin/stones/$stoneId" params={{ stoneId: value }} className={cls}>
        {value}
      </Link>
    );
  }
  return (
    <Link to="/admin/lots/$lotId" params={{ lotId: value }} className={cls}>
      {value}
    </Link>
  );
}


const isRecordId = (v: string) => /^ADX-[SL]-/.test(v);

export function DataTable({
  rows,
  dense = false,
  only,
  linkBase,
}: {
  rows: Row[];
  dense?: boolean;
  only?: string[];
  /** When set, any ADEX Stone/Lot ID cell links to its record page. */
  linkBase?: RecordBase;
}) {
  const first = rows[0];
  if (!first) return <EmptyState message="No records to display." />;
  const columns = only ? only.filter((c) => c in first) : Object.keys(first);
  return (
    <div className="adex-panel overflow-x-auto">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead>
          <tr className="bg-panel text-panel-foreground">
            {columns.map((c) => (
              <th key={c} className="px-4 py-3 text-[10px] font-semibold tracking-[0.2em] uppercase">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-t border-border hover:bg-muted/60">
              {columns.map((c) => {
                const raw = String(row[c]);
                const isStatus = statusKeys.includes(c.toLowerCase());
                return (
                  <td key={c} className={cn("px-4", dense ? "py-2" : "py-3")}>
                    {isStatus && raw !== "—" ? (
                      <StatusBadge value={raw} />
                    ) : linkBase && isRecordId(raw) ? (
                      <RecordLink value={raw} base={linkBase} />
                    ) : c === columns[0] ? (
                      <span className="adex-link">{raw}</span>
                    ) : (
                      raw
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

}

export function FilterBar({ fields }: { fields: string[] }) {
  return (
    <div className="adex-panel mb-4 flex flex-wrap items-end gap-3 p-4">
      {fields.map((f) => (
        <label key={f} className="flex flex-col gap-1 text-xs font-semibold text-muted-foreground">
          {f}
          <input
            className="h-9 w-44 rounded-sm border border-input bg-background px-2 text-sm font-normal text-foreground focus:border-ring focus:outline-none"
            placeholder={`Any ${f.toLowerCase()}`}
          />
        </label>
      ))}
      <button className="h-10 bg-primary px-6 text-[11px] font-semibold tracking-[0.2em] text-primary-foreground uppercase transition-colors hover:bg-foreground/85">
        Apply filters
      </button>
      <button className="h-9 rounded-sm border border-input px-4 text-sm font-semibold text-foreground hover:bg-muted">
        Reset
      </button>
    </div>
  );
}

export function EmptyState({ message, action }: { message: string; action?: ReactNode }) {
  return (
    <div className="bg-panel flex flex-col items-center justify-center gap-2 rounded-sm px-6 py-16 text-center">
      <svg viewBox="0 0 64 64" className="text-muted-foreground/40 h-14 w-14" aria-hidden="true">
        <path fill="currentColor" d="M12 50h28v6H12zM20 12l8-8 20 20-8 8zM6 40l18-18 6 6-18 18z" />
      </svg>
      <p className="font-semibold text-muted-foreground">{message}</p>
      {action}
    </div>
  );
}

export function DefinitionList({ items }: { items: { label: string; value: string }[] }) {
  return (
    <dl className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
      {items.map((i) => (
        <div key={i.label} className="border-b border-border pb-2">
          <dt className="text-xs tracking-wide text-muted-foreground uppercase">{i.label}</dt>
          <dd className="mt-0.5 text-sm font-medium">{i.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function Timeline({ steps }: { steps: { label: string; detail: string; done: boolean }[] }) {
  return (
    <ol className="relative border-l-2 border-border pl-5">
      {steps.map((s) => (
        <li key={s.label} className="mb-5 last:mb-0">
          <span
            className={cn(
              "absolute -left-[7px] mt-1.5 h-3 w-3 rounded-full",
              s.done ? "bg-gold" : "bg-border",
            )}
          />
          <p className="text-sm font-semibold">{s.label}</p>
          <p className="text-xs text-muted-foreground">{s.detail}</p>
        </li>
      ))}
    </ol>
  );
}

export function FormGrid({ fields }: { fields: { label: string; type?: string }[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {fields.map((f) => (
        <label key={f.label} className="flex flex-col gap-1 text-xs font-semibold">
          {f.label}
          {f.type === "textarea" ? (
            <textarea
              rows={3}
              className="rounded-sm border border-input bg-background px-3 py-2 text-sm font-normal focus:border-ring focus:outline-none"
            />
          ) : f.type === "file" ? (
            <div className="flex items-center gap-3 rounded-sm border border-dashed border-input px-3 py-2 text-sm font-normal text-muted-foreground">
              <span>Drop file or</span>
              <span className="adex-link">browse</span>
            </div>
          ) : (
            <input
              type={f.type ?? "text"}
              className="h-9 rounded-sm border border-input bg-background px-3 text-sm font-normal focus:border-ring focus:outline-none"
            />
          )}
        </label>
      ))}
    </div>
  );
}

export function PrimaryButton({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <button
      className={cn(
        "h-10 bg-primary px-6 text-[11px] font-semibold tracking-[0.2em] text-primary-foreground uppercase transition-colors hover:bg-foreground/85",
        className,
      )}
    >
      {children}
    </button>
  );
}

type BtnProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export function GoldButton({ children, className, ...props }: BtnProps) {
  return (
    <button
      {...props}
      className={cn(
        "h-10 bg-gold px-6 text-[11px] font-semibold tracking-[0.2em] text-gold-foreground uppercase transition-opacity hover:opacity-85",
        className,
      )}
    >
      {children}
    </button>
  );
}

export function GhostButton({ children, className, ...props }: BtnProps) {
  return (
    <button
      {...props}
      className={cn(
        "h-10 border border-input px-6 text-[11px] font-semibold tracking-[0.2em] uppercase transition-colors hover:bg-accent/40",
        className,
      )}
    >
      {children}
    </button>
  );
}

export function Tabs({
  tabs,
  active,
  onChange,
}: {
  tabs: { id: string; label: string; badge?: string }[];
  active: string;
  onChange: (id: string) => void;
}) {
  return (
    <div className="mb-8 flex flex-wrap gap-1 border-b border-border">
      {tabs.map((t) => (
        <button
          key={t.id}
          onClick={() => onChange(t.id)}
          className={cn(
            "-mb-px border-b px-4 py-2.5 text-[11px] font-semibold tracking-[0.18em] uppercase",
            active === t.id
              ? "border-foreground text-foreground"
              : "border-transparent text-muted-foreground hover:text-foreground",
          )}
        >
          {t.label}
          {t.badge ? (
            <span className="bg-neutral-chip text-neutral-chip-foreground ml-2 rounded-full px-2 py-0.5 text-[11px]">
              {t.badge}
            </span>
          ) : null}
        </button>
      ))}
    </div>
  );
}
