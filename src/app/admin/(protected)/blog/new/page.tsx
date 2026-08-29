import Link from "next/link";
import { prisma } from "@/lib/db";
import { savePostAction } from "@/app/admin/actions";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

export default async function NewPost() {
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
    select: { id: true, name: true },
  });

  return (
    <div className="space-y-6">
      <AdminPageHeader
        kicker="CONTENT — BLOG"
        title="New post"
        description="Write and publish a new article on the Magnanimous blog."
        actions={
          <Link href="/admin/blog" className="admin-btn admin-btn-ghost">
            Back to blog
          </Link>
        }
      />

      <form action={savePostAction} className="max-w-3xl space-y-5">
        <div className="admin-card space-y-5 p-6">
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-white/70">
              Title
            </span>
            <input
              required
              name="title"
              placeholder="e.g. How we restore a dead blender"
              className="admin-input"
            />
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-white/70">
                Slug
              </span>
              <input
                name="slug"
                placeholder="auto-generated from title"
                className="admin-input"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-white/70">
                Status
              </span>
              <select name="status" className="admin-input">
                <option value="DRAFT">DRAFT</option>
                <option value="PUBLISHED">PUBLISHED</option>
              </select>
            </label>
          </div>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-white/70">
              Excerpt
            </span>
            <textarea required name="excerpt" className="admin-input" />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-white/70">
              Content (plain text/Markdown)
            </span>
            <textarea
              required
              name="content"
              className="admin-input admin-input-lg"
            />
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-white/70">
                Featured image URL
              </span>
              <input name="featuredImage" className="admin-input" />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-white/70">
                Author
              </span>
              <input
                name="authorName"
                defaultValue="Magnanimous Electrical Services"
                className="admin-input"
              />
            </label>
          </div>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-white/70">
              Category
            </span>
            <select name="categoryId" className="admin-input">
              <option value="">No category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="admin-card space-y-5 p-6">
          <p className="font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-white/40">
            Search optimisation
          </p>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-white/70">
              SEO title
            </span>
            <input name="seoTitle" className="admin-input" />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-white/70">
              SEO description
            </span>
            <textarea name="seoDescription" className="admin-input" />
          </label>
        </div>

        <div className="flex items-center gap-3">
          <button type="submit" className="admin-btn admin-btn-primary">
            Save post
          </button>
          <Link href="/admin/blog" className="admin-btn admin-btn-ghost px-5">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
