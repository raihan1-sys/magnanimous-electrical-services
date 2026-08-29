import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import {
  AdminBadge,
  postStatusTone,
} from "@/components/admin/AdminStatusBadge";
import { deletePostAction } from "../../actions";
import { FilePlus, FileText, Trash2 } from "lucide-react";

const dateFmt = new Intl.DateTimeFormat("en-GH", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

export default async function BlogAdmin() {
  const posts = await prisma.post.findMany({
    orderBy: { updatedAt: "desc" },
    include: { category: true },
  });

  const published = posts.filter((p) => p.status === "PUBLISHED").length;
  const drafts = posts.length - published;

  return (
    <div className="space-y-8">
      <AdminPageHeader
        kicker="CONTENT — BLOG"
        title="Blog"
        description={`${posts.length} posts total — ${published} published and ${drafts} in draft.${
          posts.length > 0
            ? ` Most recently edited ${dateFmt.format(posts[0].updatedAt)}.`
            : ""
        }`}
        actions={
          <Link href="/admin/blog/new" className="admin-btn admin-btn-primary">
            <FilePlus size={16} strokeWidth={2.4} />
            New Post
          </Link>
        }
      />

      {posts.length === 0 ? (
        <div className="admin-card flex flex-col items-center gap-2 px-6 py-16 text-center">
          <FileText size={22} className="text-white/20" />
          <p className="text-sm text-white/40">No posts yet.</p>
        </div>
      ) : (
        <div className="grid gap-3">
          {posts.map((post) => (
            <div
              key={post.id}
              className="admin-card admin-card-hover flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex min-w-0 items-center gap-4">
                {post.featuredImage ? (
                  <div className="relative hidden h-14 w-14 shrink-0 overflow-hidden border border-white/[0.08] bg-white/[0.03] sm:block">
                    <Image
                      src={post.featuredImage}
                      alt={post.title}
                      fill
                      unoptimized
                      sizes="56px"
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="hidden h-14 w-14 shrink-0 items-center justify-center border border-white/[0.08] bg-white/[0.03] sm:flex">
                    <FileText size={16} className="text-white/25" />
                  </div>
                )}

                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <p className="truncate font-medium text-off-white">
                      {post.title}
                    </p>
                    <AdminBadge tone={postStatusTone[post.status] || "steel"}>
                      {post.status}
                    </AdminBadge>
                  </div>
                  <p className="mt-1 truncate font-mono text-xs text-white/35">
                    /{post.slug}
                    {post.category ? ` · ${post.category.name}` : ""}
                  </p>
                  <p className="mt-1 text-xs text-white/40">
                    Updated {dateFmt.format(post.updatedAt)} ·{" "}
                    {post.authorName}
                  </p>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-2">
                <Link
                  href={`/admin/blog/${post.id}`}
                  className="admin-btn admin-btn-ghost px-3 py-1.5 text-xs"
                >
                  Edit
                </Link>

                <form action={deletePostAction}>
                  <input type="hidden" name="id" value={post.id} />
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
          ))}
        </div>
      )}
    </div>
  );
}
