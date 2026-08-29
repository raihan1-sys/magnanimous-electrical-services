import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { products } from "@/data/products";
import { Reveal } from "@/components/PremiumMotion";

const featuredIds = [
  "laptop-3",
  "kettle-3",
  "speaker-2",
  "blender-1",
  "powerbank-1",
  "rice-cooker-3",
];

export function ShopPreview() {
  const featured = featuredIds
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean);

  return (
    <section id="shop" className="bg-off-white">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <Reveal><div className="mb-12 flex flex-col gap-4 md:mb-16 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="font-mono text-xs uppercase tracking-[0.2em] text-blue">
              The Shop
            </div>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-obsidian sm:text-4xl md:text-5xl">
              Electronics &amp; appliances.
            </h2>
          </div>
          <Link
            href="/shop"
            className="group inline-flex items-center gap-2 font-body text-sm font-medium text-obsidian"
          >
            View full catalogue
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div></Reveal>

        <Reveal delay={0.08}><div className="grid grid-cols-2 gap-px overflow-hidden border border-obsidian/10 bg-obsidian/10 md:grid-cols-3">
          {featured.map((product) => (
            <Link
              key={product!.id}
              href={`/shop?category=${product!.category}`}
              className="group flex flex-col bg-off-white p-5 transition-colors hover:bg-white md:p-7"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-white">
                <Image
                  src={product!.image}
                  alt={product!.name}
                  fill
                  sizes="(min-width: 768px) 33vw, 50vw"
                  className="object-contain p-3 transition-transform duration-500 image-luxury"
                />
              </div>
              <h3 className="mt-4 font-body text-sm font-medium leading-snug text-obsidian line-clamp-2">
                {product!.name}
              </h3>
              <div className="mt-2 flex items-center justify-between">
                <span className="font-mono text-sm text-blue">
                  {product!.price}
                </span>
                {product!.originalPrice && (
                  <span className="font-mono text-xs text-obsidian/35 line-through">
                    {product!.originalPrice}
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div></Reveal>
      </div>
    </section>
  );
}
