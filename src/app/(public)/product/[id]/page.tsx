
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { AddToCartButton } from "@/components/cart/AddToCartButton";
import { slugify } from "@/lib/format";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  MessageCircle,
  ShieldCheck,
  PackageCheck,
} from "lucide-react";
import { products } from "@/data/products";
import { siteConfig } from "@/lib/site-config";

export function generateStaticParams() {
  return products.map((p) => ({
    id: slugify(p.name),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  const p = products.find(
    (x) => x.id === id || slugify(x.name) === id
  );

  if (!p) return {};

  return {
    title: p.name,
    description: p.description,
    alternates: {
      canonical: `/product/${slugify(p.name)}`,
    },
    openGraph: {
      images: [
        {
          url: p.image,
          alt: p.name,
        },
      ],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const p = products.find(
    (x) => x.id === id || slugify(x.name) === id
  );

  if (!p) return notFound();

  const price = Number(
    p.price.replace(/[^0-9]/g, "")
  );

  const isInStock = p.inStock;

  const msg = `Hello ${siteConfig.businessName},

I'd like to enquire about:

Product: ${p.name}
Price: ${p.price}

Thank you.`;

  return (
    <main className="bg-off-white">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: p.name,
          description: p.description,
          image: [p.image],
          offers: {
            "@type": "Offer",
            priceCurrency: "GHS",
            price: price,
            availability: isInStock
              ? "https://schema.org/InStock"
              : "https://schema.org/OutOfStock",
          },
        }}
      />

      <div className="mx-auto max-w-7xl px-5 py-10 md:px-8 md:py-16">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Shop", href: "/shop" },
            { label: p.name },
          ]}
        />

        <Link
          href="/shop"
          className="mt-6 inline-flex items-center gap-2 text-sm text-blue"
        >
          <ArrowLeft size={16} />
          Back to shop
        </Link>

        <div className="mt-10 grid gap-12 lg:grid-cols-[1.05fr_.95fr]">
          <div className="relative min-h-[420px] bg-white md:min-h-[620px]">
            <Image
              src={p.image}
              alt={p.name}
              fill
              priority
              sizes="(min-width:1024px) 55vw,100vw"
              className="object-contain p-8"
            />
          </div>

          <div className="flex flex-col justify-center">
            <div className="font-mono text-[10px] uppercase tracking-[.2em] text-blue">
              {p.category.replaceAll("-", " ")}
            </div>

            <h1 className="mt-4 font-display text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
              {p.name}
            </h1>

            <div className="mt-6 flex items-center gap-3">
              <span className="font-mono text-2xl text-blue">
                {p.price}
              </span>

              {p.originalPrice && (
                <span className="font-mono text-sm text-obsidian/35 line-through">
                  {p.originalPrice}
                </span>
              )}
            </div>

            <p className="mt-8 max-w-xl text-base leading-relaxed text-obsidian/60">
              {p.description}
            </p>

            <div className="mt-8 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[.14em]">
              <span
                className={`inline-flex items-center gap-2 ${
                  isInStock
                    ? "text-green-700"
                    : "text-red-600"
                }`}
              >
                <PackageCheck size={15} />

                {isInStock ? "In stock" : "Out of stock"}
              </span>

              <span className="text-obsidian/35">·</span>

              <span className="inline-flex items-center gap-2 text-obsidian/55">
                <ShieldCheck size={15} />

                Secure ordering
              </span>
            </div>

            {isInStock ? (
              <div className="mt-9 grid max-w-md gap-3">
                <AddToCartButton
                  product={{
                    id: p.id,
                    name: p.name,
                    slug: slugify(p.name),
                    price,
                    image: p.image,
                  }}
                />

                <a
                  href={`${siteConfig.whatsappHref}?text=${encodeURIComponent(
                    msg
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 border border-obsidian/15 px-6 py-4 text-sm font-semibold text-obsidian transition hover:border-blue hover:text-blue"
                >
                  <MessageCircle size={17} />
                  Enquire about this product
                </a>
              </div>
            ) : (
              <div className="mt-9 max-w-md border border-red-200 bg-red-50 px-6 py-4 text-center text-sm font-semibold text-red-700">
                This product is currently out of stock.
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

