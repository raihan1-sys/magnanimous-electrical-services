import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHero } from "@/components/PageHero";
import { ShopClient } from "./ShopClient";
import { prisma } from "@/lib/db";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Laptops, appliances, power banks, audio and electrical accessories from Magnanimous Electrical Services in Accra.",
};

// Rendered at request time: the catalogue is backed live by Prisma, so the
// page must not be prerendered at build time (keeps Prisma as the source of
// truth while allowing `next build` to run without a database connection).
export const dynamic = "force-dynamic";

export default async function ShopPage() {
  const products = await prisma.product.findMany({
  where: {
    status: "ACTIVE",
  },
  include: {
    category: true,
  },
  orderBy: {
    createdAt: "desc",
  },
});

  return (
    <>
      <PageHero
        eyebrow="Magnanimous shop"
        index="04"
        title="Things that work well deserve a good place to buy them."
        description="A curated catalogue of the electronics and appliances we sell — with clear categories, real product photographs and current shop prices."
        image="/images/products/laptops/laptop-3.jpeg"
        action={{
          label: "Browse the catalogue",
          href: "#catalogue",
        }}
      />

      <section id="catalogue" className="scroll-mt-24">
        <Suspense fallback={null}>
          <ShopClient products={products} />
        </Suspense>
      </section>
    </>
  );
}