"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Search } from "lucide-react";

type BlogArticle = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  publishedAt: string;
};

export function BlogClient({
  articles,
}: {
  articles: BlogArticle[];
}) {
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("All");

  const categories = [
    "All",
    ...Array.from(new Set(articles.map((a) => a.category))),
  ];

  const filtered = useMemo(() => {
    return articles.filter(
      (a) =>
        (category === "All" || a.category === category) &&
        `${a.title} ${a.excerpt} ${a.category}`
          .toLowerCase()
          .includes(q.toLowerCase())
    );
  }, [articles, q, category]);

  return (
    <>
      <div className="mb-10 flex flex-col gap-4 border-y border-obsidian/10 py-5 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`border px-3 py-2 font-mono text-[10px] uppercase ${
                category === c
                  ? "border-blue bg-blue text-white"
                  : "border-obsidian/15"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <label className="relative block">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-obsidian/40"
          />

          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search articles"
            className="w-full border bg-white py-2 pl-9 pr-3 md:w-64"
          />
        </label>
      </div>

      <div className="grid gap-px bg-obsidian/10 md:grid-cols-3">
        {filtered.map((a, i) => (
          <Link
            key={a.id}
            href={`/blog/${a.slug}`}
            className={`group min-h-[360px] bg-white p-7 transition hover:bg-obsidian hover:text-white ${
              i === 0 ? "md:col-span-2 md:min-h-[470px]" : ""
            }`}
          >
            <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[.18em] text-blue">
              <span>{a.category}</span>
              <span>
                {new Date(a.publishedAt).toLocaleDateString("en-GH", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </div>

            <div className="flex h-[82%] flex-col justify-end">
              <h2
                className={`font-display font-semibold leading-[.98] tracking-tight ${
                  i === 0 ? "text-4xl md:text-6xl" : "text-3xl"
                }`}
              >
                {a.title}
              </h2>

              <p className="mt-5 max-w-xl text-sm leading-relaxed opacity-55">
                {a.excerpt}
              </p>

              <div className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-blue">
                Read article <ArrowUpRight size={16} />
              </div>
            </div>
          </Link>
        ))}

        {filtered.length === 0 && (
          <p className="col-span-full bg-white p-12 text-center text-obsidian/55">
            No articles match your search.
          </p>
        )}
      </div>
    </>
  );
}