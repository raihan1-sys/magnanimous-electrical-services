import { prisma } from "@/lib/db";
import { ProductForm } from "@/components/admin/ProductForm";

export default async function NewProduct() {
  const categories = await prisma.category.findMany({
    orderBy: {
      name: "asc",
    },
    select: {
      id: true,
      name: true,
      slug: true,
    },
  });

  return (
    <ProductForm categories={categories} />
  );
}