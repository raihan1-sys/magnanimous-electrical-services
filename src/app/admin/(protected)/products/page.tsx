import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { ghs } from "@/lib/format";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import {
  AdminBadge,
  productStatusTone,
} from "@/components/admin/AdminStatusBadge";
import { DeleteProductButton } from "@/components/admin/DeleteProductButton";
import { Package, Plus } from "lucide-react";

function stockTone(stock: number) {
  if (stock === 0) return "red" as const;
  if (stock <= 5) return "amber" as const;
  return "green" as const;
}

function stockLabel(stock: number) {
  if (stock === 0) return "Out of stock";
  if (stock <= 5) return `Low · ${stock} left`;
  return `${stock} in stock`;
}

export default async function ProductsAdmin() {
  const [products, totalProducts] = await Promise.all([
    prisma.product.findMany({
      include: { category: true },
      orderBy: { updatedAt: "desc" },
      take: 100,
    }),
    prisma.product.count(),
  ]);

  return (
    <div className="space-y-8">
      <AdminPageHeader
        kicker="PRODUCT CATALOG"
        title="Products"
        description={`${totalProducts} products in the catalogue${
          products.length < totalProducts
            ? ` — showing the ${products.length} most recently updated`
            : ""
        }.`}
        actions={
          <Link
            href="/admin/products/new"
            className="admin-btn admin-btn-primary"
          >
            <Plus size={16} strokeWidth={2.4} />
            New Product
          </Link>
        }
      />

      {products.length === 0 ? (
        <div className="admin-card flex flex-col items-center gap-2 px-6 py-16 text-center">
          <Package size={22} className="text-white/20" />
          <p className="text-sm text-white/40">No products yet.</p>
        </div>
      ) : (
        <div className="grid gap-3">
          {products.map((product) => (
            <div
              key={product.id}
              className="admin-card admin-card-hover flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex min-w-0 items-center gap-4">
                {product.image ? (
                  <div className="relative hidden h-16 w-16 shrink-0 overflow-hidden border border-white/[0.08] bg-white/[0.03] sm:block">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      unoptimized
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="hidden h-16 w-16 shrink-0 items-center justify-center border border-white/[0.08] bg-white/[0.03] sm:flex">
                    <Package size={18} className="text-white/25" />
                  </div>
                )}

                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <p className="truncate font-medium text-off-white">
                      {product.name}
                    </p>
                    <AdminBadge
                      tone={productStatusTone[product.status] || "steel"}
                    >
                      {product.status}
                    </AdminBadge>
                  </div>
                  <p className="mt-1 truncate font-mono text-xs text-white/35">
                    /{product.slug}
                    {product.category ? ` · ${product.category.name}` : ""}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-5 sm:gap-7">
                <div className="sm:text-right">
                  <p className="font-display text-lg font-semibold text-off-white">
                    {ghs(product.price)}
                  </p>
                  <AdminBadge tone={stockTone(product.stock)}>
                    {stockLabel(product.stock)}
                  </AdminBadge>
                </div>

                <div className="flex items-center gap-5">
                  <Link href={`/admin/products/${product.id}`} className="admin-link">
                    Edit
                  </Link>
                  <DeleteProductButton id={product.id} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
