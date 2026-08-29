import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { saveCategoryAction } from "@/app/admin/actions";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

export default async function EditCategory({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const category = await prisma.category.findUnique({
    where: { id },
  });

  if (!category) {
    return notFound();
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        kicker="CONTENT — CATEGORIES"
        title="Edit category"
        description={`Update "${category.name}".`}
        actions={
          <Link href="/admin/categories" className="admin-btn admin-btn-ghost">
            Back to categories
          </Link>
        }
      />

      <form action={saveCategoryAction} className="max-w-3xl space-y-5">
        <div className="admin-card space-y-5 p-6">
          <input type="hidden" name="id" value={category.id} />

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-white/70">
              Category name
            </span>
            <input
              required
              name="name"
              defaultValue={category.name}
              className="admin-input"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-white/70">
              Description
            </span>
            <textarea
              name="description"
              defaultValue={category.description || ""}
              className="admin-input"
            />
          </label>
        </div>

        <div className="flex items-center gap-3">
          <button type="submit" className="admin-btn admin-btn-primary">
            Save changes
          </button>
          <Link href="/admin/categories" className="admin-btn admin-btn-ghost px-5">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}