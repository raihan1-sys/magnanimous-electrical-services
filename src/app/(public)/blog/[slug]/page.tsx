import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/db";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";

// Posts are backed live by Prisma; render at request time so the build does
// not require a database connection (and so generateStaticParams is not run
// against the database at build time).
export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const post = await prisma.post.findUnique({
    where: {
      slug,
    },
  });

  if (!post || post.status !== "PUBLISHED") {
    return {};
  }

  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      type: "article",
      publishedTime: post.publishedAt?.toISOString(),
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
      images: post.featuredImage
        ? [
            {
              url: post.featuredImage,
            },
          ]
        : undefined,
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const post = await prisma.post.findUnique({
    where: {
      slug,
    },
    include: {
      category: true,
    },
  });

  if (!post || post.status !== "PUBLISHED") {
    notFound();
  }

  const related = post.categoryId
    ? await prisma.post.findMany({
        where: {
          status: "PUBLISHED",
          categoryId: post.categoryId,
          id: {
            not: post.id,
          },
        },
        orderBy: {
          publishedAt: "desc",
        },
        take: 3,
      })
    : [];

  const contentParagraphs = post.content
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  return (
    <article className="bg-off-white">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.excerpt,
          datePublished: post.publishedAt?.toISOString(),
          author: {
            "@type": "Person",
            name: post.authorName,
          },
          publisher: {
            "@type": "Organization",
            name: "Magnanimous Electrical Services",
          },
        }}
      />

      <div className="mx-auto max-w-3xl px-5 py-16 md:py-24">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Blog", href: "/blog" },
            { label: post.title },
          ]}
        />

        <Link
          href="/blog"
          className="mt-8 inline-flex items-center gap-2 text-sm text-blue"
        >
          <ArrowLeft size={16} />
          Back to knowledge
        </Link>

        <div className="mt-12 font-mono text-[10px] uppercase tracking-[.2em] text-blue">
          {post.category?.name || "General"}
        </div>

        <h1 className="mt-5 font-display text-5xl font-semibold leading-[.98] tracking-tight md:text-7xl">
          {post.title}
        </h1>

        <p className="mt-8 text-lg leading-relaxed text-obsidian/60">
          {post.excerpt}
        </p>

        <p className="mt-4 text-sm text-obsidian/45">
          {post.authorName} ·{" "}
          {new Date(
            post.publishedAt ?? post.createdAt
          ).toLocaleDateString("en-GH", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>

        <div className="my-12 h-px bg-obsidian/10" />

        {contentParagraphs.map((paragraph, i) => (
          <p
            key={i}
            className="mb-6 text-lg leading-relaxed text-obsidian/75"
          >
            {paragraph}
          </p>
        ))}

        {related.length > 0 && (
          <section className="mt-16 border-t border-obsidian/10 pt-10">
            <h2 className="font-display text-3xl">Related articles</h2>

            {related.map((article) => (
              <Link
                className="mt-5 block text-blue"
                key={article.id}
                href={`/blog/${article.slug}`}
              >
                {article.title}
              </Link>
            ))}
          </section>
        )}
      </div>
    </article>
  );
}