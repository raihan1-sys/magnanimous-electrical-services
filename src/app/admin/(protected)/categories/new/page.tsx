import Link from "next/link";
import { saveCategoryAction } from "@/app/admin/actions";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

export default function NewCategory() {
  return (
    <div className="space-y-6">
      <AdminPageHeader
        kicker="CONTENT — CATEGORIES"
        title="New category"
        description="Create a category for your products or blog posts."
        actions={
          <Link href="/admin/categories" className="admin-btn admin-btn-ghost">
            Back to categories
          </Link>
        }
      />

      <form action={saveCategoryAction} className="max-w-3xl space-y-5">
        <div className="admin-card space-y-5 p-6">
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-white/70">
              Category name
            </span>
            <input
              required
              name="name"
              placeholder="e.g. Kettles"
              className="admin-input"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-white/70">
              Description
            </span>
            <textarea
              name="description"
              placeholder="Brief description of this category"
              className="admin-input"
            />
          </label>
        </div>

        <div className="flex items-center gap-3">
          <button type="submit" className="admin-btn admin-btn-primary">
            Save category
          </button>
          <Link href="/admin/categories" className="admin-btn admin-btn-ghost px-5">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}