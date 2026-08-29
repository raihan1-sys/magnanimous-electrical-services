import { prisma } from "@/lib/db";
import { ghs } from "@/lib/format";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import {
  AdminBadge,
  paymentStatusTone,
} from "@/components/admin/AdminStatusBadge";
import { ShoppingBag } from "lucide-react";
import { updateOrderAction } from "../../actions";

const ORDER_STATUSES = [
  "PENDING",
  "PROCESSING",
  "READY",
  "SHIPPED",
  "COMPLETED",
  "CANCELLED",
] as const;

const dateFmt = new Intl.DateTimeFormat("en-GH", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

function statusSelectClass(status: string) {
  switch (status) {
    case "PENDING":
      return "border-white/15 text-white/50";
    case "PROCESSING":
      return "border-blue/40 text-blue-bright";
    case "READY":
      return "border-amber-400/40 text-amber-300";
    case "SHIPPED":
      return "border-purple-400/40 text-purple-300";
    case "COMPLETED":
      return "border-green-400/40 text-green-300";
    case "CANCELLED":
      return "border-red-400/40 text-red-300";
    default:
      return "border-white/15 text-white/50";
  }
}

export default async function Orders() {
  const [orders, totalOrders] = await Promise.all([
    prisma.order.findMany({
      include: { customer: true, items: true },
      orderBy: { createdAt: "desc" },
      take: 100,
    }),
    prisma.order.count(),
  ]);

  return (
    <div className="space-y-8">
      <AdminPageHeader
        kicker="ORDERS"
        title="Orders"
        description={`Track the full order pipeline — from payment to delivery. Showing the ${orders.length} most recent of ${totalOrders} total.`}
      />

      <section className="admin-card overflow-hidden">
        {orders.length === 0 ? (
          <div className="flex flex-col items-center gap-2 px-6 py-16 text-center">
            <ShoppingBag size={22} className="text-white/20" />
            <p className="text-sm text-white/40">No orders yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[880px] text-left text-sm">
              <thead>
                <tr className="border-b border-white/[0.07]">
                  <th className="admin-th pl-6 pt-5">Order</th>
                  <th className="admin-th">Customer</th>
                  <th className="admin-th">Total</th>
                  <th className="admin-th">Payment</th>
                  <th className="admin-th pr-6">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => {
                  const initial = order.customer.name.charAt(0).toUpperCase();
                  return (
                    <tr
                      key={order.id}
                      className="border-b border-white/[0.05] transition-colors last:border-0 hover:bg-white/[0.03]"
                    >
                      <td className="px-6 py-4 align-top">
                        <p className="font-mono text-sm font-medium text-off-white">
                          {order.orderNumber}
                        </p>
                        <p className="mt-1 text-xs text-white/40">
                          {dateFmt.format(order.createdAt)}
                        </p>
                      </td>

                      <td className="py-4 pr-4 align-top">
                        <div className="flex items-center gap-3">
                          <span className="flex h-9 w-9 shrink-0 items-center justify-center border border-white/[0.1] bg-white/[0.04] font-display text-sm font-medium text-blue-bright">
                            {initial}
                          </span>
                          <div className="min-w-0">
                            <p className="truncate font-medium text-off-white">
                              {order.customer.name}
                            </p>
                            <p className="mt-0.5 truncate text-xs text-white/40">
                              {order.customer.phone}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="py-4 pr-4 align-top">
                        <p className="font-display text-base font-semibold text-off-white">
                          {ghs(order.total)}
                        </p>
                        <p className="mt-0.5 text-xs text-white/40">
                          {order.items.reduce((n, i) => n + i.quantity, 0)}{" "}
                          items
                        </p>
                      </td>

                      <td className="py-4 pr-4 align-top">
                        <AdminBadge
                          tone={paymentStatusTone[order.paymentStatus] || "steel"}
                        >
                          {order.paymentStatus}
                        </AdminBadge>
                      </td>

                      <td className="py-4 pr-6 align-top">
                        <form
                          action={updateOrderAction}
                          className="flex items-center gap-2"
                        >
                          <input type="hidden" name="id" value={order.id} />
                          <select
                            name="orderStatus"
                            defaultValue={order.orderStatus}
                            className={`border bg-[#0a0e14] px-2 py-2 font-mono text-[11px] font-medium uppercase tracking-wider outline-none transition-colors focus:border-blue-bright ${statusSelectClass(order.orderStatus)}`}
                          >
                            {ORDER_STATUSES.map((status) => (
                              <option
                                key={status}
                                value={status}
                                className="bg-[#0a0e14] text-white"
                              >
                                {status}
                              </option>
                            ))}
                          </select>
                          <button
                            type="submit"
                            className="border border-white/[0.12] px-3 py-2 font-mono text-[10px] uppercase tracking-[0.15em] text-white/55 transition-colors hover:border-lime/50 hover:text-lime"
                          >
                            Save
                          </button>
                        </form>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
