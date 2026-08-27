import { Link, Outlet } from "@tanstack/react-router";
import { Bell, ChevronDown } from "lucide-react";
import { AdexLogo } from "./logo";
import { StatusBadge } from "./kit";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type NavItem = { label: string; to: string };
export type Notification = { title: string; body: string; time: string; tone: string };

export function PortalShell({
  persona,
  user,
  nav,
  notifications = [],
  profileTo,
  profileName,
  profileRole,
}: {
  persona: string;
  user: string;
  nav: NavItem[];
  notifications?: Notification[];
  profileTo?: string;
  profileName?: string;
  profileRole?: string;
}) {
  const name = profileName ?? user;
  const initials = name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-[1400px] items-center gap-6 px-6 py-5">
          <AdexLogo />
          <span className="hidden border-l border-border pl-6 text-[10px] tracking-[0.28em] text-muted-foreground uppercase sm:block">
            {persona}
          </span>
          <div className="ml-auto flex items-center gap-3 text-sm font-semibold">
            <Link
              to="/browse"
              className="hidden border-b border-transparent pb-0.5 text-[11px] tracking-[0.22em] uppercase hover:border-foreground sm:block"
            >
              Marketplace
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger className="relative rounded-sm p-2 hover:bg-muted focus:outline-none">
                <Bell className="h-5 w-5" aria-hidden />
                <span className="sr-only">Notifications</span>
                {notifications.length > 0 && (
                  <span className="absolute top-1 right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-gold px-1 text-[10px] leading-none text-gold-foreground">
                    {notifications.length}
                  </span>
                )}
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-90 max-w-[92vw] p-0">
                <div className="flex items-center justify-between border-b border-border px-3 py-2">
                  <p className="font-display text-sm">Notifications</p>
                  <button className="adex-link text-xs">Mark all as read</button>
                </div>
                <ul className="max-h-96 divide-y divide-border overflow-y-auto">
                  {notifications.length === 0 && (
                    <li className="px-3 py-6 text-center text-sm text-muted-foreground">
                      You are all caught up.
                    </li>
                  )}
                  {notifications.map((n) => (
                    <li key={n.title} className="flex items-start gap-3 px-3 py-2.5 hover:bg-muted">
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold">{n.title}</p>
                        <p className="text-sm text-muted-foreground">{n.body}</p>
                        <p className="mt-0.5 text-xs text-muted-foreground">{n.time}</p>
                      </div>
                      <StatusBadge value={n.tone} />
                    </li>
                  ))}
                </ul>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-2 rounded-sm px-2 py-1.5 hover:bg-muted focus:outline-none">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gold text-xs text-gold-foreground">
                  {initials}
                </span>
                <span className="hidden max-w-40 truncate sm:block">{name}</span>
                <ChevronDown className="h-4 w-4 text-muted-foreground" aria-hidden />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-60">
                <DropdownMenuLabel>
                  <p className="text-sm">{name}</p>
                  <p className="text-xs font-normal text-muted-foreground">{profileRole ?? user}</p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {profileTo && (
                  <DropdownMenuItem asChild>
                    <Link to={profileTo}>Profile & settings</Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem asChild>
                  <Link to="/browse">Public marketplace</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/sign-in">Sign out</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div data-surface="salon" className="flex flex-1 flex-col">
      <div className="mx-auto flex w-full max-w-[1400px] flex-1 flex-col gap-6 px-4 py-6 lg:flex-row">
        <aside className="lg:w-60 lg:shrink-0">
          <nav className="adex-panel overflow-hidden">
            <p className="adex-eyebrow border-b border-border px-4 py-3.5">Menu</p>
            <ul className="py-1">
              {nav.map((n) => (
                <li key={n.to}>
                  <Link
                    to={n.to}
                    activeOptions={{ exact: n.to.split("/").length === 2 }}
                    activeProps={{
                      className: "bg-accent text-foreground border-l-gold",
                    }}
                    className="block border-l-2 border-l-transparent px-4 py-2.5 text-sm text-muted-foreground hover:bg-accent/40 hover:text-foreground"
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <main className="min-w-0 flex-1">
          <Outlet />
        </main>
      </div>

      <footer className="bg-panel border-t border-border">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-2 px-4 py-4 text-xs text-muted-foreground">
          <span>© Copyright 2026 ADEX. All Rights Reserved.</span>
          <span className="tracking-[0.2em] uppercase">Antwerp · Dubai · Kinshasa</span>
        </div>
      </footer>
      </div>
    </div>
  );
}
