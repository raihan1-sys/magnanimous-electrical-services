import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { BlogClient } from "@/components/blog/BlogClient";
import { prisma } from "@/lib/db";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Practical repair, maintenance and electronics buying knowledge from Magnanimous Electrical Services.",
  alternates: {
    canonical: "/blog",
  },
};

// Posts are backed live by Prisma; render at request time so the build does
// not require a database connection.
export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const posts = await prisma.post.findMany({
    where: {
      status: "PUBLISHED",
    },
    include: {
      category: true,
    },
    orderBy: {
      publishedAt: "desc",
    },
  });

  const articles = posts.map((post) => ({
    id: post.id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    category: post.category?.name ?? "General",
    publishedAt: post.publishedAt?.toISOString() ?? post.createdAt.toISOString(),
  }));

  return (
    <>
      <PageHero
  eyebrow="Workshop knowledge"
  index="07"
  title="Useful knowledge, not technical noise."
  description="Short, practical notes about repairs, maintenance and choosing the right electronics and appliances."
  image="/images/blog/alexandre-debieve-FO7JIlwjOtU-unsplash.jpg"
  imageAlt="Electronics and technology"
  action={{ label: "Read the latest", href: "#articles" }}
/>

      <section id="articles" className="bg-off-white scroll-mt-24">
        <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
          <BlogClient articles={articles} />
        </div>
      </section>
    </>
  );
}