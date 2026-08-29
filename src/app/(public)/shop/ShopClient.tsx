"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { MessageCircle, Search } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { AddToCartButton } from "@/components/cart/AddToCartButton";

export type ShopProduct = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  image: string;
  stock: number;
  status: "ACTIVE" | "DRAFT" | "ARCHIVED";
  categoryId: string | null;
  category: {
    name: string;
    slug: string;
  } | null;
};

const categoryOrder = [
  "laptops",
  "kettles",
  "blenders",
  "rice-cookers",
  "irons",
  "fans",
  "power-banks",
  "bluetooth-speakers",
  "extensions",
];

function enquiryLink(product: ShopProduct) {
  const message = `Hi Magnanimous, I'd like to ask about the ${product.name} (GHS ${product.price.toLocaleString()}).`;

  return `${siteConfig.whatsappHref}?text=${encodeURIComponent(message)}`;
}

export function ShopClient({ products }: { products: ShopProduct[] }) {
  const searchParams = useSearchParams();

  const initialCategory = searchParams.get("category");

  const [category, setCategory] = useState(initialCategory || "all");
  const [query, setQuery] = useState("");

  const availableCategories = Array.from(
    new Map(
      products
        .filter((p) => p.category)
        .map((p) => [p.category!.slug, p.category!])
    ).values()
  );

  const categories = [
    ...categoryOrder
      .map((slug) =>
        availableCategories.find((category) => category.slug === slug)
      )
      .filter(Boolean),

    ...availableCategories.filter(
      (category) => !categoryOrder.includes(category.slug)
    ),
  ];

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory =
        category === "all" || p.category?.slug === category;

      const matchesQuery = p.name
        .toLowerCase()
        .includes(query.toLowerCase());

      return matchesCategory && matchesQuery;
    });
  }, [products, category, query]);

  return (
    <div>
      <div className="sticky top-[57px] z-30 border-b border-obsidian/10 bg-off-white/95 backdrop-blur md:top-[65px]">
        <div className="mx-auto max-w-7xl px-5 py-4 md:px-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setCategory("all")}
                className={`rounded-sm border px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-wide transition-colors ${
                  category === "all"
                    ? "border-obsidian bg-obsidian text-off-white"
                    : "border-obsidian/15 text-obsidian/60 hover:border-obsidian/40"
                }`}
              >
                All
              </button>

              {categories.map((c) => (
                <button
                  key={c!.slug}
                  onClick={() => setCategory(c!.slug)}
                  className={`rounded-sm border px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-wide transition-colors ${
                    category === c!.slug
                      ? "border-obsidian bg-obsidian text-off-white"
                      : "border-obsidian/15 text-obsidian/60 hover:border-obsidian/40"
                  }`}
                >
                  {c!.name}
                </button>
              ))}
            </div>

            <div className="relative w-full md:w-64">
              <Search
                size={15}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-obsidian/35"
              />

              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products"
                className="w-full rounded-sm border border-obsidian/15 bg-white py-2 pl-9 pr-3 text-sm text-obsidian placeholder:text-obsidian/35 focus:border-blue"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 py-10 md:px-8 md:py-14">
        {filtered.length === 0 ? (
          <div className="py-24 text-center text-sm text-obsidian/50">
            No products match that search. Try a different term, or{" "}
            <a
              href={siteConfig.whatsappHref}
              className="text-blue underline"
            >
              ask us on WhatsApp
            </a>
            .
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-px overflow-hidden border border-obsidian/10 bg-obsidian/10 sm:grid-cols-3 lg:grid-cols-4">
            {filtered.map((product) => (
              <div
                key={product.id}
                className="group flex flex-col bg-off-white p-4 transition hover:bg-white md:p-6"
              >
                {/* Product image and information */}
                <Link
                  href={`/product/${product.slug}`}
                  className="block"
                >
                  <div className="relative aspect-square overflow-hidden bg-white">
                    {product.image ? (
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                        className="object-contain p-3 transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center p-6 text-center font-mono text-[10px] uppercase tracking-wide text-obsidian/35">
                        No image
                      </div>
                    )}

                    {product.stock <= 0 && (
                      <span className="absolute left-2 top-2 rounded-sm bg-obsidian/80 px-2 py-1 font-mono text-[10px] uppercase tracking-wide text-off-white">
                        Out of Stock
                      </span>
                    )}
                  </div>

                  <h3 className="mt-4 line-clamp-2 min-h-[2.5em] font-body text-sm font-medium leading-snug text-obsidian">
                    {product.name}
                  </h3>

                  <div className="mt-2">
                    <span className="font-mono text-sm text-blue">
                      GHS {product.price.toLocaleString()}
                    </span>
                  </div>
                </Link>

                {/* Cart + enquiry actions */}
                <div className="mt-4 grid gap-2">
                  {product.stock > 0 ? (
                    <AddToCartButton
                      product={{
                        id: product.id,
                        name: product.name,
                        slug: product.slug,
                        price: product.price,
                        image: product.image,
                      }}
                    />
                  ) : (
                    <div className="py-2 text-center font-mono text-[11px] uppercase tracking-wide text-obsidian/40">
                      Currently unavailable
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() => {
                      window.open(
                        enquiryLink(product),
                        "_blank",
                        "noopener,noreferrer"
                      );
                    }}
                    className="inline-flex items-center justify-center gap-1.5 rounded-sm border border-obsidian/15 py-2 font-mono text-[11px] uppercase tracking-wide text-obsidian/70 transition-colors hover:border-blue hover:text-blue"
                  >
                    <MessageCircle size={13} />
                    Enquire
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}