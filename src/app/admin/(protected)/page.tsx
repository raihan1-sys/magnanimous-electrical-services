import Link from "next/link";
import { prisma } from "@/lib/db";
import { ghs } from "@/lib/format";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import {
  AdminBadge,
  orderStatusTone,
  paymentStatusTone,
} from "@/components/admin/AdminStatusBadge";
import {
  AlertTriangle,
  ArrowRight,
  Banknote,
  FilePlus,
  FileText,
  FolderPlus,
  Layers,
  Package,
  PackagePlus,
  ShoppingBag,
} from "lucide-react";

const dateFmt = new Intl.DateTimeFormat("en-GH", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

export default async function AdminOverview() {
  const stats = await Promise.all([
    prisma.order.count(),
    prisma.product.count(),
    prisma.post.count(),
    prisma.order.aggregate({
      where: { paymentStatus: "PAID" },
      _sum: { total: true },
    }),
  ]);

  const [recentOrders, lowStock, draftPosts, categories] =
    await Promise.all([
      prisma.order.findMany({
        include: { customer: true, items: true },
        orderBy: { createdAt: "desc" },
        take: 5,
      }),
      prisma.product.findMany({
        where: { stock: { lte: 5 } },
        orderBy: { stock: "asc" },
        take: 5,
        select: { name: true, stock: true },
      }),
      prisma.post.count({ where: { status: "DRAFT" } }),
      prisma.category.count(),
    ]);

  const [orders, products, posts, revenue] = stats;
  const revenueValue = revenue._sum.total || 0;
  const outOfStock = lowStock.filter((p) => p.stock === 0).length;
  const firstOrderDate = recentOrders[0]?.createdAt;

  return (
    <div className="space-y-8">
      <AdminPageHeader
        kicker="ADMIN OVERVIEW"
        title="Control room."
        description="Monitor orders, payment flow and catalogue health from one command console."
      />

      {/* Stat cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="admin-card admin-card-hover p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-white/45">
                Orders
              </p>
              <p className="mt-3 font-display text-4xl font-semibold leading-none text-off-white">
                {orders}
              </p>
              <p className="mt-3 text-xs leading-relaxed text-white/40">
                {firstOrderDate
                  ? `Latest order ${dateFmt.format(firstOrderDate)}`
                  : "No orders recorded yet"}
              </p>
            </div>
            <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-blue/30 bg-blue/10 text-blue-bright">
              <ShoppingBag size={18} strokeWidth={2} />
            </span>
          </div>
        </div>

        <div className="admin-card admin-card-hover p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-white/45">
                Products
              </p>
              <p className="mt-3 font-display text-4xl font-semibold leading-none text-off-white">
                {products}
              </p>
              <p className="mt-3 text-xs leading-relaxed text-white/40">
                Across {categories}{" "}
                {categories === 1 ? "category" : "categories"}
              </p>
            </div>
            <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-lime/25 bg-lime/10 text-lime">
              <Package size={18} strokeWidth={2} />
            </span>
          </div>
        </div>

        <div className="admin-card admin-card-hover p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-white/45">
                Blog posts
              </p>
              <p className="mt-3 font-display text-4xl font-semibold leading-none text-off-white">
                {posts}
              </p>
              <p className="mt-3 text-xs leading-relaxed text-white/40">
                {posts - draftPosts} published · {draftPosts} draft
                {draftPosts === 1 ? "" : "s"}
              </p>
            </div>
            <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-blue/30 bg-blue/10 text-blue-bright">
              <FileText size={18} strokeWidth={2} />
            </span>
          </div>
        </div>

        <div className="admin-card admin-card-hover p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-white/45">
                Paid revenue
              </p>
              <p className="mt-3 font-display text-3xl font-semibold leading-none text-off-white">
                {ghs(revenueValue)}
              </p>
              <p className="mt-3 text-xs leading-relaxed text-white/40">
                Collected from paid orders
              </p>
            </div>
            <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-lime/25 bg-lime/10 text-lime">
              <Banknote size={18} strokeWidth={2} />
            </span>
          </div>
        </div>
      </div>

      {/* Recent orders */}
      <section className="admin-card">
        <header className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.07] px-5 py-4 sm:px-6">
          <div>
            <p className="font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-white/40">
              Recent
            </p>
            <h2 className="mt-1 font-display text-xl font-semibold text-off-white">
              Latest orders
            </h2>
          </div>
          <Link href="/admin/orders" className="admin-link">
            View all <ArrowRight size={14} />
          </Link>
        </header>

        {recentOrders.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-2 py-16 text-center">
            <ShoppingBag size={22} className="text-white/20" />
            <p className="text-sm text-white/40">
              No orders yet — they will appear here after the first checkout.
            </p>
          </div>
        ) : (
          <ul className="divide-y divide-white/[0.06]">
            {recentOrders.map((order) => (
              <li
                key={order.id}
                className="flex flex-col gap-3 px-5 py-4 transition-colors hover:bg-white/[0.03] sm:flex-row sm:items-center sm:justify-between sm:px-6"
              >
                <div className="min-w-0">
                  <p className="font-mono text-sm font-medium text-off-white">
                    {order.orderNumber}
                  </p>
                  <p className="mt-1 truncate text-xs text-white/40">
                    {order.customer.name} · {order.items.length} item
                    {order.items.length === 1 ? "" : "s"} ·{" "}
                    {dateFmt.format(order.createdAt)}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-display text-base font-semibold text-off-white">
                    {ghs(order.total)}
                  </span>
                  <AdminBadge
                    tone={paymentStatusTone[order.paymentStatus] || "steel"}
                  >
                    {order.paymentStatus}
                  </AdminBadge>
                  <AdminBadge tone={orderStatusTone[order.orderStatus] || "steel"}>
                    {order.orderStatus}
                  </AdminBadge>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Quick actions + inventory/content */}
      <section className="grid gap-4 lg:grid-cols-2">
        <div className="admin-card p-6">
          <p className="font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-white/40">
            Command
          </p>
          <h2 className="mt-1 font-display text-xl font-semibold text-off-white">
            Quick actions
          </h2>

          <div className="mt-5 grid gap-2 sm:grid-cols-2">
            <Link
              href="/admin/products/new"
              className="group flex items-center gap-3 border border-white/[0.08] bg-white/[0.02] px-4 py-3.5 text-sm text-white/70 transition-all hover:border-blue/40 hover:bg-blue/10 hover:text-white"
            >
              <PackagePlus size={16} className="shrink-0 text-blue-bright" />
              New product
              <ArrowRight
                size={14}
                className="ml-auto shrink-0 text-white/20 transition-colors group-hover:text-lime"
              />
            </Link>
            <Link
              href="/admin/categories/new"
              className="group flex items-center gap-3 border border-white/[0.08] bg-white/[0.02] px-4 py-3.5 text-sm text-white/70 transition-all hover:border-blue/40 hover:bg-blue/10 hover:text-white"
            >
              <FolderPlus size={16} className="shrink-0 text-blue-bright" />
              New category
              <ArrowRight
                size={14}
                className="ml-auto shrink-0 text-white/20 transition-colors group-hover:text-lime"
              />
            </Link>
            <Link
              href="/admin/blog/new"
              className="group flex items-center gap-3 border border-white/[0.08] bg-white/[0.02] px-4 py-3.5 text-sm text-white/70 transition-all hover:border-blue/40 hover:bg-blue/10 hover:text-white"
            >
              <FilePlus size={16} className="shrink-0 text-blue-bright" />
              New post
              <ArrowRight
                size={14}
                className="ml-auto shrink-0 text-white/20 transition-colors group-hover:text-lime"
              />
            </Link>
            <Link
              href="/admin/orders"
              className="group flex items-center gap-3 border border-white/[0.08] bg-white/[0.02] px-4 py-3.5 text-sm text-white/70 transition-all hover:border-blue/40 hover:bg-blue/10 hover:text-white"
            >
              <ShoppingBag size={16} className="shrink-0 text-blue-bright" />
              Review orders
              <ArrowRight
                size={14}
                className="ml-auto shrink-0 text-white/20 transition-colors group-hover:text-lime"
              />
            </Link>
          </div>
        </div>

        <div className="admin-card p-6">
          <p className="font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-white/40">
            Overview
          </p>
          <h2 className="mt-1 font-display text-xl font-semibold text-off-white">
            Inventory &amp; content
          </h2>

          <div className="mt-5 space-y-6">
            <div>
              <div className="flex items-center justify-between">
                <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
                  <AlertTriangle size={12} className="text-amber-400" />
                  Stock watch
                </p>
                {outOfStock > 0 && (
                  <span className="font-mono text-[10px] uppercase tracking-widest text-red-400">
                    {outOfStock} out of stock
                  </span>
                )}
              </div>

              {lowStock.length === 0 ? (
                <p className="mt-3 text-sm text-white/40">
                  All products sufficiently stocked.
                </p>
              ) : (
                <ul className="mt-3 space-y-2">
                  {lowStock.map((p) => (
                    <li
                      key={p.name}
                      className="flex items-center justify-between gap-3 text-sm"
                    >
                      <span className="truncate text-white/65">{p.name}</span>
                      <AdminBadge tone={p.stock === 0 ? "red" : "amber"}>
                        {p.stock === 0 ? "Out" : `${p.stock} left`}
                      </AdminBadge>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div>
              <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
                <Layers size={12} className="text-blue-bright" />
                Content
              </p>
              <div className="mt-3 grid grid-cols-3 gap-2">
                <Link
                  href="/admin/blog"
                  className="block border border-white/[0.06] bg-white/[0.02] p-3 text-center transition-colors hover:border-blue/35"
                >
                  <p className="font-display text-2xl font-semibold text-off-white">
                    {posts - draftPosts}
                  </p>
                  <p className="mt-1 text-[11px] text-white/40">Published</p>
                </Link>
                <Link
                  href="/admin/blog"
                  className="block border border-white/[0.06] bg-white/[0.02] p-3 text-center transition-colors hover:border-blue/35"
                >
                  <p className="font-display text-2xl font-semibold text-off-white">
                    {draftPosts}
                  </p>
                  <p className="mt-1 text-[11px] text-white/40">Drafts</p>
                </Link>
                <Link
                  href="/admin/categories"
                  className="block border border-white/[0.06] bg-white/[0.02] p-3 text-center transition-colors hover:border-blue/35"
                >
                  <p className="font-display text-2xl font-semibold text-off-white">
                    {categories}
                  </p>
                  <p className="mt-1 text-[11px] text-white/40">Categories</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
