import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { savePostAction } from "@/app/admin/actions";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

export default async function EditPost({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [post, categories] = await Promise.all([
    prisma.post.findUnique({ where: { id } }),
    prisma.category.findMany({
      orderBy: { name: "asc" },
      select: { id: true, name: true },
    }),
  ]);

  if (!post) {
    return notFound();
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        kicker="CONTENT — BLOG"
        title="Edit post"
        description={`Editing "${post.title}".`}
        actions={
          <Link href="/admin/blog" className="admin-btn admin-btn-ghost">
            Back to blog
          </Link>
        }
      />

      <form action={savePostAction} className="max-w-3xl space-y-5">
        <input type="hidden" name="id" value={post.id} />

        <div className="admin-card space-y-5 p-6">
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-white/70">
              Title
            </span>
            <input
              name="title"
              defaultValue={post.title}
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
                defaultValue={post.slug}
                className="admin-input"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-white/70">
                Status
              </span>
              <select name="status" defaultValue={post.status} className="admin-input">
                <option value="DRAFT">DRAFT</option>
                <option value="PUBLISHED">PUBLISHED</option>
              </select>
            </label>
          </div>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-white/70">
              Excerpt
            </span>
            <textarea
              name="excerpt"
              defaultValue={post.excerpt}
              className="admin-input"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-white/70">
              Content (plain text/Markdown)
            </span>
            <textarea
              name="content"
              defaultValue={post.content}
              className="admin-input admin-input-lg"
            />
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-white/70">
                Featured image URL
              </span>
              <input
                name="featuredImage"
                defaultValue={post.featuredImage || ""}
                className="admin-input"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-white/70">
                Author
              </span>
              <input
                name="authorName"
                defaultValue={post.authorName}
                className="admin-input"
              />
            </label>
          </div>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-white/70">
              Category
            </span>
            <select
              name="categoryId"
              defaultValue={post.categoryId || ""}
              className="admin-input"
            >
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
            <input
              name="seoTitle"
              defaultValue={post.seoTitle || ""}
              className="admin-input"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-white/70">
              SEO description
            </span>
            <textarea
              name="seoDescription"
              defaultValue={post.seoDescription || ""}
              className="admin-input"
            />
          </label>
        </div>

        <div className="flex items-center gap-3">
          <button type="submit" className="admin-btn admin-btn-primary">
            Save changes
          </button>
          <Link href="/admin/blog" className="admin-btn admin-btn-ghost px-5">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
