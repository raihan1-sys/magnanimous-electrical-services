import Link from "next/link";
import { prisma } from "@/lib/db";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { deleteCategoryAction } from "@/app/admin/actions";
import {
  FileText,
  FolderTree,
  Package,
  Plus,
  Trash2,
} from "lucide-react";

export default async function CategoriesAdmin() {
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
    include: {
      _count: { select: { products: true, posts: true } },
    },
  });

  const totalProducts = categories.reduce((n, c) => n + c._count.products, 0);
  const totalPosts = categories.reduce((n, c) => n + c._count.posts, 0);

  return (
    <div className="space-y-8">
      <AdminPageHeader
        kicker="CONTENT — CATEGORIES"
        title="Categories"
        description={`Organise products and articles. ${totalProducts} products and ${totalPosts} posts grouped across ${categories.length} categories.`}
        actions={
          <Link
            href="/admin/categories/new"
            className="admin-btn admin-btn-primary"
          >
            <Plus size={16} strokeWidth={2.4} />
            New Category
          </Link>
        }
      />

      {categories.length === 0 ? (
        <div className="admin-card flex flex-col items-center gap-2 px-6 py-16 text-center">
          <FolderTree size={22} className="text-white/20" />
          <p className="text-sm text-white/40">No categories yet.</p>
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {categories.map((category) => (
            <div
              key={category.id}
              className="admin-card admin-card-hover flex flex-col p-5"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-blue/30 bg-blue/10 text-blue-bright">
                  <FolderTree size={18} strokeWidth={2} />
                </span>

                <div className="flex shrink-0 items-center gap-2">
                  <Link
                    href={`/admin/categories/${category.id}`}
                    className="admin-btn admin-btn-ghost px-3 py-1.5 text-xs"
                  >
                    Edit
                  </Link>

                  <form action={deleteCategoryAction}>
                    <input type="hidden" name="id" value={category.id} />
                    <button
                      type="submit"
                      className="admin-btn admin-btn-danger px-3 py-1.5 text-xs"
                    >
                      <Trash2 size={13} />
                      Delete
                    </button>
                  </form>
                </div>
              </div>

              <p className="mt-4 font-display text-lg font-semibold text-off-white">
                {category.name}
              </p>
              <p className="mt-1 font-mono text-xs text-white/35">
                /{category.slug}
              </p>
              {category.description && (
                <p className="mt-3 line-clamp-2 text-xs leading-relaxed text-white/45">
                  {category.description}
                </p>
              )}

              <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-white/[0.06] pt-4">
                <span className="inline-flex items-center gap-1.5 border border-white/[0.08] bg-white/[0.03] px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-white/55">
                  <Package size={11} className="text-blue-bright" />
                  {category._count.products} product
                  {category._count.products === 1 ? "" : "s"}
                </span>
                <span className="inline-flex items-center gap-1.5 border border-white/[0.08] bg-white/[0.03] px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-white/55">
                  <FileText size={11} className="text-lime" />
                  {category._count.posts} post
                  {category._count.posts === 1 ? "" : "s"}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}