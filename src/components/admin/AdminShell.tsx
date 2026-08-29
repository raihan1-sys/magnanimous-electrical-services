"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import {
  Activity,
  Boxes,
  FileText,
  FolderTree,
  Globe2,
  LayoutDashboard,
  LogOut,
  Menu,
  ShieldCheck,
  ShoppingBag,
  X,
  Zap,
} from "lucide-react";
import { logoutAction } from "@/app/admin/actions";

const navigation = [
  { label: "Overview", href: "/admin", icon: LayoutDashboard },
  { label: "Orders", href: "/admin/orders", icon: ShoppingBag },
  { label: "Products", href: "/admin/products", icon: Boxes },
  { label: "Categories", href: "/admin/categories", icon: FolderTree },
  { label: "Blog", href: "/admin/blog", icon: FileText },
] as const;

const pageLabels: Record<string, string> = {
  "/admin": "ADMIN OVERVIEW",
  "/admin/orders": "ORDERS",
  "/admin/products": "PRODUCT CATALOG",
  "/admin/categories": "CONTENT — CATEGORIES",
  "/admin/blog": "CONTENT — BLOG",
};

function NavList({
  pathname,
  onNavigate,
}: {
  pathname: string;
  onNavigate?: () => void;
}) {
  const isActive = (href: string) =>
    href === "/admin" ? pathname === href : pathname.startsWith(href);

  return (
    <>
      <p className="mb-3 px-3 font-mono text-[10px] font-medium uppercase tracking-[0.24em] text-white/30">
        Workspace
      </p>

      <nav className="space-y-1">
        {navigation.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              aria-current={active ? "page" : undefined}
              className={`group relative flex items-center gap-3 overflow-hidden px-3 py-2.5 text-sm transition-all duration-200 ${
                active
                  ? "bg-blue/15 font-medium text-white"
                  : "text-white/55 hover:bg-white/[0.06] hover:text-white"
              }`}
            >
              {active && (
                <span
                  aria-hidden
                  className="absolute inset-y-0 left-0 w-[2.5px] bg-lime shadow-[0_0_12px_rgba(215,255,61,0.7)]"
                />
              )}
              <Icon
                size={17}
                strokeWidth={1.9}
                className={`shrink-0 transition-colors ${
                  active ? "text-blue-bright" : "text-white/35 group-hover:text-blue-bright"
                }`}
              />
              <span>{item.label}</span>
              {active && (
                <span className="ml-auto h-1.5 w-1.5 rounded-full bg-lime" />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="my-7 border-t border-white/[0.07]" />

      <p className="mb-3 px-3 font-mono text-[10px] font-medium uppercase tracking-[0.24em] text-white/30">
        Website
      </p>

      <Link
        href="/"
        target="_blank"
        onClick={onNavigate}
        className="group flex items-center gap-3 rounded-sm px-3 py-2.5 text-sm text-white/55 transition-all hover:bg-white/[0.06] hover:text-white"
      >
        <Globe2
          size={17}
          strokeWidth={1.9}
          className="text-white/35 transition-colors group-hover:text-blue-bright"
        />
        <span>View Website</span>
        <span className="ml-auto font-mono text-[10px] text-white/25 transition-colors group-hover:text-lime">
          ↗
        </span>
      </Link>
    </>
  );
}

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMobileOpen(false), [pathname]);

  const sectionKey =
    Object.keys(pageLabels)
      .filter((key) => (key === "/admin" ? pathname === key : pathname.startsWith(key)))
      .sort((a, b) => b.length - a.length)[0] || "/admin";

  const sectionLabel = pageLabels[sectionKey];

  return (
    <div className="admin-shell relative min-h-screen overflow-x-clip">
      <div className="admin-backdrop" aria-hidden />

      {/* ===== Desktop sidebar — full viewport height, independent of main flow ===== */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-white/[0.07] bg-[#12100c]/90 backdrop-blur-xl lg:flex">
        {/* Brand */}
        <div className="border-b border-white/[0.07] px-5 py-5">
          <Link href="/admin" className="group block">
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/35">
              Magnanimous
            </p>
            <div className="mt-1.5 flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center border border-blue/40 bg-blue/10 text-blue-bright transition-colors group-hover:bg-blue/20">
                <Zap size={16} strokeWidth={2.2} />
              </span>
              <span className="font-display text-[22px] font-semibold tracking-tight text-off-white">
                Control
              </span>
              <span className="mt-1 h-1.5 w-1.5 self-start rounded-full bg-lime shadow-[0_0_10px_rgba(215,255,61,0.8)]" />
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto px-4 py-6">
          <NavList pathname={pathname} />
        </div>

        {/* Account */}
        <div className="border-t border-white/[0.07] p-4">
          <div className="mb-2 flex items-center gap-2 border border-white/[0.07] bg-white/[0.03] px-3 py-2.5">
            <ShieldCheck size={15} className="shrink-0 text-lime" />
            <div className="min-w-0">
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/30">
                Signed in
              </p>
              <p className="truncate text-sm text-white/75">Administrator</p>
            </div>
          </div>

          <form action={logoutAction}>
            <button
              type="submit"
              className="group flex w-full items-center gap-3 px-3 py-2.5 text-sm text-white/45 transition-all hover:bg-red-500/10 hover:text-red-300"
            >
              <LogOut size={17} strokeWidth={1.9} />
              <span>Sign out</span>
            </button>
          </form>
        </div>
      </aside>

      {/* ===== Mobile top bar + drawer ===== */}
      <header className="sticky top-0 z-40 border-b border-white/[0.07] bg-[#12100c]/90 backdrop-blur-xl lg:hidden">
        <div className="flex h-16 items-center justify-between px-4">
          <Link href="/admin" className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center border border-blue/40 bg-blue/10 text-blue-bright">
              <Zap size={16} strokeWidth={2.2} />
            </span>
            <span className="font-display text-lg font-semibold tracking-tight text-off-white">
              Control
            </span>
          </Link>

          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center border border-white/10 text-white/70 transition hover:bg-white/[0.08] hover:text-white"
          >
            {mobileOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-50 lg:hidden ${
          mobileOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        aria-hidden={!mobileOpen}
      >
        <div
          className={`absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${
            mobileOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setMobileOpen(false)}
        />
        <aside
          className={`absolute inset-y-0 left-0 flex w-72 max-w-[85vw] flex-col overflow-y-auto border-r border-white/[0.08] bg-[#12100c] text-off-white shadow-2xl transition-transform duration-300 ease-out ${
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-4">
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center border border-blue/40 bg-blue/10 text-blue-bright">
                <Zap size={16} strokeWidth={2.2} />
              </span>
              <span className="font-display text-lg font-semibold tracking-tight">
                Control
              </span>
            </div>
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setMobileOpen(false)}
              className="flex h-10 w-10 items-center justify-center border border-white/10 text-white/70 hover:bg-white/[0.08]"
            >
              <X size={19} />
            </button>
          </div>

          <div className="flex-1 px-4 py-5">
            <NavList pathname={pathname} onNavigate={() => setMobileOpen(false)} />
          </div>

          <form action={logoutAction} className="border-t border-white/[0.07] p-4">
            <button
              type="submit"
              className="flex w-full items-center gap-3 px-3 py-2.5 text-sm text-red-300/70 transition hover:bg-red-500/10 hover:text-red-300"
            >
              <LogOut size={17} strokeWidth={1.9} />
              <span>Sign out</span>
            </button>
          </form>
        </aside>
      </div>

      {/* ===== Main column: top bar + content ===== */}
      <div className="relative z-10 flex min-h-screen flex-col lg:pl-64">
        <header className="sticky top-0 z-30 border-b border-white/[0.07] bg-[#12100c]/70 backdrop-blur-xl">
          <div className="flex h-14 items-center justify-between px-5 sm:px-7 lg:px-10">
            <p className="truncate font-mono text-[10px] font-medium uppercase tracking-[0.24em] text-white/40">
              {sectionLabel}
            </p>
            <div className="flex items-center gap-4">
              <span className="hidden items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/35 md:inline-flex">
                <Activity size={13} className="text-blue-bright" />
                Accra · GH
              </span>
              <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/45">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-lime shadow-[0_0_8px_rgba(215,255,61,0.8)]" />
                Systems nominal
              </span>
            </div>
          </div>
        </header>

        <main className="flex-1">
          <div className="mx-auto w-full max-w-[1500px] px-5 py-7 sm:px-7 lg:px-10 lg:py-10">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}